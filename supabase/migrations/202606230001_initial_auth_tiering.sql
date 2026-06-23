begin;

create schema if not exists private;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null check (length(trim(full_name)) > 0),
  role text not null default 'member'
    check (role in ('admin', 'member')),
  tier text not null default 'bronze'
    check (tier in ('bronze', 'silver', 'gold', 'platinum')),
  points integer not null default 0
    check (points >= 0),
  updated_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(trim(name)) > 0),
  price numeric(14, 2) not null check (price >= 0),
  stock integer not null default 0 check (stock >= 0),
  created_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id),
  subtotal numeric(14, 2) not null check (subtotal >= 0),
  discount_rate numeric(5, 4) not null
    check (discount_rate in (0.05, 0.10, 0.15, 0.20)),
  final_price numeric(14, 2) not null check (final_price >= 0),
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

create index orders_customer_id_idx on public.orders(customer_id);
create index orders_created_at_idx on public.orders(created_at desc);

create or replace function private.has_role(requested_role text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = (select auth.uid())
      and role = requested_role
  );
$$;

revoke all on function private.has_role(text) from public;
grant usage on schema private to authenticated;
grant execute on function private.has_role(text) to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (
    id,
    full_name,
    role,
    tier,
    points
  )
  values (
    new.id,
    coalesce(
      nullif(trim(new.raw_user_meta_data ->> 'full_name'), ''),
      nullif(split_part(new.email, '@', 1), ''),
      'Member'
    ),
    'member',
    'bronze',
    0
  );

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function private.protect_profile_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not private.has_role('admin') then
    if (select auth.uid()) is null or old.id <> (select auth.uid()) then
      raise exception 'Unauthorized profile update';
    end if;

    if new.id is distinct from old.id
      or new.role is distinct from old.role
      or new.tier is distinct from old.tier
      or new.points is distinct from old.points then
      raise exception 'Members may only update their full name';
    end if;
  end if;

  new.updated_at := now();
  return new;
end;
$$;

revoke all on function private.protect_profile_update() from public;

create trigger protect_profile_update
  before update on public.profiles
  for each row execute function private.protect_profile_update();

create or replace function private.calculate_order_totals()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  customer_role text;
  customer_tier text;
begin
  select role, tier
  into customer_role, customer_tier
  from public.profiles
  where id = new.customer_id;

  if customer_role is distinct from 'member' then
    raise exception 'Only members may create orders';
  end if;

  if customer_tier not in ('bronze', 'silver', 'gold', 'platinum') then
    raise exception 'Invalid member tier: %', customer_tier;
  end if;

  new.discount_rate := case customer_tier
    when 'bronze' then 0.05
    when 'silver' then 0.10
    when 'gold' then 0.15
    when 'platinum' then 0.20
  end;

  new.final_price := round(
    new.subtotal * (1 - new.discount_rate),
    2
  );

  return new;
end;
$$;

revoke all on function private.calculate_order_totals() from public;

create trigger calculate_order_totals
  before insert on public.orders
  for each row execute function private.calculate_order_totals();

create or replace function private.protect_order_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.id is distinct from old.id
    or new.customer_id is distinct from old.customer_id
    or new.subtotal is distinct from old.subtotal
    or new.discount_rate is distinct from old.discount_rate
    or new.final_price is distinct from old.final_price
    or new.created_at is distinct from old.created_at then
    raise exception 'Only order status may be updated';
  end if;

  return new;
end;
$$;

revoke all on function private.protect_order_update() from public;

create trigger protect_order_update
  before update on public.orders
  for each row execute function private.protect_order_update();

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

revoke all on table public.profiles from anon, authenticated;
revoke all on table public.products from anon, authenticated;
revoke all on table public.orders from anon, authenticated;

grant select, update on table public.profiles to authenticated;
grant select on table public.products to anon, authenticated;
grant insert, update, delete on table public.products to authenticated;
grant select, insert, update on table public.orders to authenticated;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ((select auth.uid()) = id);

create policy "Admins can read all profiles"
on public.profiles
for select
to authenticated
using ((select private.has_role('admin')));

create policy "Users can update their own profile"
on public.profiles
for update
to authenticated
using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "Admins can update all profiles"
on public.profiles
for update
to authenticated
using ((select private.has_role('admin')))
with check ((select private.has_role('admin')));

create policy "Products are publicly readable"
on public.products
for select
to anon, authenticated
using (true);

create policy "Admins can insert products"
on public.products
for insert
to authenticated
with check ((select private.has_role('admin')));

create policy "Admins can update products"
on public.products
for update
to authenticated
using ((select private.has_role('admin')))
with check ((select private.has_role('admin')));

create policy "Admins can delete products"
on public.products
for delete
to authenticated
using ((select private.has_role('admin')));

create policy "Members can read their own orders"
on public.orders
for select
to authenticated
using (
  (select auth.uid()) = customer_id
  and (select private.has_role('member'))
);

create policy "Admins can read all orders"
on public.orders
for select
to authenticated
using ((select private.has_role('admin')));

create policy "Members can create their own orders"
on public.orders
for insert
to authenticated
with check (
  (select auth.uid()) = customer_id
  and (select private.has_role('member'))
);

create policy "Admins can update orders"
on public.orders
for update
to authenticated
using ((select private.has_role('admin')))
with check ((select private.has_role('admin')));

commit;

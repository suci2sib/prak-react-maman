begin;

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
      nullif(pg_catalog.btrim(new.raw_user_meta_data ->> 'full_name'), ''),
      nullif(pg_catalog.split_part(new.email, '@', 1), ''),
      'Member'
    ),
    'member',
    'bronze',
    0
  )
  on conflict (id) do update
    set full_name = excluded.full_name,
        updated_at = pg_catalog.now();

  return new;
end;
$$;

revoke all on function public.handle_new_user() from public;

do $$
begin
  if exists (select 1 from pg_catalog.pg_roles where rolname = 'supabase_auth_admin') then
    grant execute on function public.handle_new_user() to supabase_auth_admin;
    grant usage on schema public to supabase_auth_admin;
    grant select, insert, update on table public.profiles to supabase_auth_admin;
  end if;
end;
$$;

create or replace function private.protect_profile_update()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  request_uid uuid := auth.uid();
  jwt_role text := nullif(pg_catalog.current_setting('request.jwt.claim.role', true), '');
begin
  if jwt_role = 'service_role' or (request_uid is null and jwt_role is null) then
    new.updated_at := pg_catalog.now();
    return new;
  end if;

  if not private.has_role('admin') then
    if request_uid is null or old.id <> request_uid then
      raise exception 'Unauthorized profile update';
    end if;

    if new.id is distinct from old.id
      or new.role is distinct from old.role
      or new.tier is distinct from old.tier
      or new.points is distinct from old.points then
      raise exception 'Members may only update their full name';
    end if;
  end if;

  new.updated_at := pg_catalog.now();
  return new;
end;
$$;

commit;

begin;

create or replace function public.create_order(
  requested_product_id uuid,
  requested_quantity integer
)
returns public.orders
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_product public.products;
  created_order public.orders;
begin
  if (select auth.uid()) is null
    or not private.has_role('member') then
    raise exception 'Only authenticated members may create orders';
  end if;

  if requested_quantity is null or requested_quantity < 1 then
    raise exception 'Quantity must be at least 1';
  end if;

  select *
  into selected_product
  from public.products
  where id = requested_product_id
  for update;

  if not found then
    raise exception 'Product not found';
  end if;

  if selected_product.stock < requested_quantity then
    raise exception 'Insufficient product stock';
  end if;

  insert into public.orders (
    customer_id,
    subtotal,
    discount_rate,
    final_price
  )
  values (
    (select auth.uid()),
    selected_product.price * requested_quantity,
    0.05,
    selected_product.price * requested_quantity
  )
  returning * into created_order;

  update public.products
  set stock = stock - requested_quantity
  where id = requested_product_id;

  return created_order;
end;
$$;

revoke all on function public.create_order(uuid, integer) from public;
grant execute on function public.create_order(uuid, integer) to authenticated;

revoke insert on table public.orders from authenticated;

drop policy if exists "Members can create their own orders"
on public.orders;

commit;

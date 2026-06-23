begin;

grant delete on table public.profiles to authenticated;

create policy "Admins can delete profiles"
on public.profiles
for delete
to authenticated
using ((select private.has_role('admin')));

commit;

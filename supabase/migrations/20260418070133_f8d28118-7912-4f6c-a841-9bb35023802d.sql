alter table public.quote_requests replica identity full;
alter publication supabase_realtime add table public.quote_requests;
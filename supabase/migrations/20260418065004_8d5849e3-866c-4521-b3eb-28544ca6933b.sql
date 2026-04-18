-- Leads from contact form
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  budget text,
  message text not null,
  source text default 'contact_form',
  created_at timestamptz default now()
);

alter table public.leads enable row level security;

create policy "anyone can insert leads"
  on public.leads for insert
  to anon, authenticated
  with check (true);

-- AI quote requests (anonymized recent feed)
create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  project_type text not null,
  duration_minutes int not null,
  turnaround_days int not null,
  effects_level text not null,
  estimated_price_inr int not null,
  display_name text,
  created_at timestamptz default now()
);

alter table public.quote_requests enable row level security;

create policy "anyone can insert quote requests"
  on public.quote_requests for insert
  to anon, authenticated
  with check (true);

create policy "anyone can read recent quote requests"
  on public.quote_requests for select
  to anon, authenticated
  using (created_at > now() - interval '7 days');
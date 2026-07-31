-- Costs Registration tables for PriceRight
-- Run this script in Supabase SQL editor before using the new dashboard pages.

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.material_costs (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  unit text not null,
  value numeric(12, 2) not null check (value > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.labor_costs (
  id uuid primary key default gen_random_uuid(),
  hourly_rate numeric(12, 2) not null check (hourly_rate > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.target_profits (
  id uuid primary key default gen_random_uuid(),
  profit_percent numeric(5, 2) not null check (profit_percent >= 0 and profit_percent <= 100),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.material_costs drop column if exists user_id cascade;
alter table if exists public.labor_costs drop column if exists user_id cascade;
alter table if exists public.target_profits drop column if exists user_id cascade;

drop index if exists idx_material_costs_user_id;
drop index if exists idx_labor_costs_user_id;
drop index if exists idx_target_profits_user_id;

create index if not exists idx_material_costs_created_at on public.material_costs(created_at);
create index if not exists idx_labor_costs_created_at on public.labor_costs(created_at);
create index if not exists idx_target_profits_created_at on public.target_profits(created_at);

drop trigger if exists set_material_costs_updated_at on public.material_costs;
create trigger set_material_costs_updated_at
before update on public.material_costs
for each row
execute function public.set_updated_at();

drop trigger if exists set_labor_costs_updated_at on public.labor_costs;
create trigger set_labor_costs_updated_at
before update on public.labor_costs
for each row
execute function public.set_updated_at();

drop trigger if exists set_target_profits_updated_at on public.target_profits;
create trigger set_target_profits_updated_at
before update on public.target_profits
for each row
execute function public.set_updated_at();

alter table public.material_costs disable row level security;
alter table public.labor_costs disable row level security;
alter table public.target_profits disable row level security;

drop policy if exists "materials_select_own" on public.material_costs;
drop policy if exists "materials_insert_own" on public.material_costs;
drop policy if exists "materials_update_own" on public.material_costs;
drop policy if exists "materials_delete_own" on public.material_costs;

drop policy if exists "labor_costs_select_own" on public.labor_costs;
drop policy if exists "labor_costs_insert_own" on public.labor_costs;
drop policy if exists "labor_costs_update_own" on public.labor_costs;
drop policy if exists "labor_costs_delete_own" on public.labor_costs;

drop policy if exists "target_profits_select_own" on public.target_profits;
drop policy if exists "target_profits_insert_own" on public.target_profits;
drop policy if exists "target_profits_update_own" on public.target_profits;
drop policy if exists "target_profits_delete_own" on public.target_profits;

-- Ask PostgREST to refresh schema cache after migration.
notify pgrst, 'reload schema';

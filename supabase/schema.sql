-- ============================================================================
-- KFBS EVC — Supabase schema
-- Run this once in your Supabase project: Dashboard → SQL Editor → paste → Run.
-- Safe to re-run (uses IF NOT EXISTS / idempotent policy drops).
-- ============================================================================

-- ---------- VENTURES --------------------------------------------------------
create table if not exists public.ventures (
  id            uuid primary key default gen_random_uuid(),
  name          text not null,
  description   text,
  industries    text[] not null default '{}',
  founder       text,
  year          int,
  contact_email text,
  website       text,
  logo_url      text,
  status        text not null default 'pending'
                  check (status in ('pending', 'approved')),
  created_at    timestamptz not null default now()
);

-- ---------- PEOPLE (Network directory) -------------------------------------
create table if not exists public.people (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  relation    text not null default 'Current Student',
  title       text,
  company     text,
  grad_year   int,
  email       text,
  linkedin    text,
  bio         text,
  status      text not null default 'pending'
                check (status in ('pending', 'approved')),
  created_at  timestamptz not null default now()
);

-- ---------- Row Level Security ---------------------------------------------
alter table public.ventures enable row level security;
alter table public.people   enable row level security;

-- Public visitors can read only APPROVED rows.
drop policy if exists "ventures_public_read" on public.ventures;
create policy "ventures_public_read" on public.ventures
  for select to anon using (status = 'approved');

drop policy if exists "people_public_read" on public.people;
create policy "people_public_read" on public.people
  for select to anon using (status = 'approved');

-- Signed-in admins can read everything (including pending submissions).
drop policy if exists "ventures_admin_read" on public.ventures;
create policy "ventures_admin_read" on public.ventures
  for select to authenticated using (true);

drop policy if exists "people_admin_read" on public.people;
create policy "people_admin_read" on public.people
  for select to authenticated using (true);

-- Anyone can SUBMIT, but only as 'pending' (prevents self-approval / spam
-- appearing publicly until an admin reviews it).
drop policy if exists "ventures_public_insert" on public.ventures;
create policy "ventures_public_insert" on public.ventures
  for insert to anon with check (status = 'pending');

drop policy if exists "people_public_insert" on public.people;
create policy "people_public_insert" on public.people
  for insert to anon with check (status = 'pending');

-- Admins can insert/update/delete freely (approve, edit, remove).
drop policy if exists "ventures_admin_write" on public.ventures;
create policy "ventures_admin_write" on public.ventures
  for all to authenticated using (true) with check (true);

drop policy if exists "people_admin_write" on public.people;
create policy "people_admin_write" on public.people
  for all to authenticated using (true) with check (true);

-- ---------- Seed: the 4 current ventures (approved) ------------------------
insert into public.ventures
  (name, description, industries, founder, year, contact_email, website, status)
values
  ('Aim Point Media',
   'A golf industry revenue platform connecting courses with advertising opportunities.',
   array['Media','Consulting'], 'Seamus O''Connell', 2026,
   'general@aimpoint-media.com', 'https://aimpointmedia.io', 'approved'),
  ('All Square',
   'Golf outing planning platform with registration, payments, scoring, and management tools.',
   array['Event Management'], 'Ramya Meenakshisundaram', 2026,
   'ramya_meenakshisundaram@kenan-flagler.unc.edu', null, 'approved'),
  ('Smith Equine',
   'Equine sports medicine focused on diagnostics, treatment, and performance optimization.',
   array['Equine Health'], 'Justin Smith', 2026, null, null, 'approved'),
  ('UniFounders',
   'An AI-powered matchmaking tool for university innovators and their supporting network.',
   array['EdTech','Research Commercialization'], 'Will Butler', 2023,
   'unifounders@gmail.com', 'https://uni-founders.com', 'approved')
on conflict do nothing;

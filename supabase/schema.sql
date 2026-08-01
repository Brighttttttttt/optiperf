-- Schéma Phase 1b (1/2) — comptes réels coach/athlète.
-- À exécuter une fois dans l'éditeur SQL du projet Supabase (Project → SQL Editor).
-- Champs volontairement réduits par rapport à PLAN_MVP.md : la fiche athlète
-- complète (records, VMA, date de naissance...) arrive avec la PR qui la branche
-- vraiment dessus. Facile à étendre plus tard avec `alter table`.

create type user_role as enum ('coach', 'athlete');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  nom text not null,
  role user_role not null,
  created_at timestamptz not null default now()
);

create table public.athlete_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  coach_id uuid not null references public.users(id),
  fc_max integer,
  fc_repos integer,
  objectif text,
  echeance_objectif text,
  notes_coach text,
  created_at timestamptz not null default now()
);

alter table public.users enable row level security;
alter table public.athlete_profiles enable row level security;

-- users : chacun voit/modifie sa propre ligne
create policy "select own user" on public.users
  for select using (id = auth.uid());

create policy "insert own user" on public.users
  for insert with check (id = auth.uid());

create policy "update own user" on public.users
  for update using (id = auth.uid());

-- users : tout utilisateur connecté peut voir les coachs, pour le rattachement
-- automatique à l'inscription (un seul coach pour l'instant, voir décision PR)
create policy "select coaches" on public.users
  for select using (role = 'coach');

-- users : un coach voit les comptes de ses propres athlètes
create policy "coach selects own athletes" on public.users
  for select using (
    exists (
      select 1 from public.athlete_profiles ap
      where ap.user_id = users.id and ap.coach_id = auth.uid()
    )
  );

-- athlete_profiles : l'athlète gère son propre profil
create policy "athlete manages own profile" on public.athlete_profiles
  for all using (user_id = auth.uid());

-- athlete_profiles : le coach gère les profils de ses athlètes
create policy "coach manages own athletes profiles" on public.athlete_profiles
  for all using (coach_id = auth.uid());

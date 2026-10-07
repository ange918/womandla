-- WOMANDLA — candidatures, dons, contact, newsletter.
-- L’accès public direct est refusé. Les routes Next.js et les Edge Functions
-- utilisent la service role. Le suivi se fait par numéro de dossier + téléphone.

create extension if not exists pgcrypto;

do $$
begin
  if not exists (select 1 from pg_type where typname = 'candidature_statut') then
    create type public.candidature_statut as enum (
      'recue',
      'en_etude',
      'entretien',
      'retenue',
      'liste_attente',
      'non_retenue'
    );
  end if;
end $$;

create table if not exists public.candidatures (
  id uuid primary key default gen_random_uuid(),
  numero_dossier text not null unique,
  prenom text not null,
  nom text not null,
  date_naissance date,
  telephone text not null,
  whatsapp text,
  email text,
  langue text,
  canal_prefere text,
  commune text not null,
  quartier text,
  situation_familiale text,
  nb_enfants integer not null default 0,
  besoin_garde boolean not null default false,
  niveau text,
  filiere text,
  experience text,
  disponibilite text,
  motivation text,
  motivation_audio_path text,
  piece_path text,
  source text,
  statut public.candidature_statut not null default 'recue',
  entretien_at timestamptz,
  consentement_donnees_at timestamptz,
  consentement_whatsapp_at timestamptz,
  consentement_image_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists candidatures_telephone_idx on public.candidatures (telephone);

create table if not exists public.candidature_evenements (
  id uuid primary key default gen_random_uuid(),
  candidature_id uuid not null references public.candidatures (id) on delete cascade,
  type text not null,
  statut public.candidature_statut,
  message text,
  created_at timestamptz not null default now()
);

create index if not exists candidature_evenements_dossier_idx
  on public.candidature_evenements (candidature_id, created_at);

create table if not exists public.dons (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  type text not null,
  montant integer not null check (montant >= 1000),
  devise text not null default 'XOF',
  donateur_nom text,
  donateur_email text,
  donateur_telephone text,
  pays text,
  moyen text,
  statut text not null default 'paiement_desactive',
  provider_ref text,
  created_at timestamptz not null default now()
);

create table if not exists public.messages_contact (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  email text not null,
  profil text,
  message text not null,
  consentement_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_inscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.candidatures enable row level security;
alter table public.candidature_evenements enable row level security;
alter table public.dons enable row level security;
alter table public.messages_contact enable row level security;
alter table public.newsletter_inscriptions enable row level security;

-- Aucune policy pour anon ou authenticated :
-- lecture et écriture réservées à la service role (qui contourne la RLS).

insert into storage.buckets (id, name, public, file_size_limit)
values ('candidatures-pieces', 'candidatures-pieces', false, 8388608)
on conflict (id) do update set public = false, file_size_limit = 8388608;

-- Le bucket reste privé : pas de policy de lecture publique.
-- Les uploads passent par la service role.

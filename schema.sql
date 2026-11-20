-- UoG Public Health Academy schema
-- Run this in Supabase SQL Editor on a fresh project.
-- Do not put the service-role key in the browser or commit it to git.

create extension if not exists pgcrypto;

create type public.member_role as enum ('student','admin');
create type public.member_approval as enum ('pending','approved','rejected');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  academic_year smallint not null default 2 check (academic_year between 2 and 4),
  role public.member_role not null default 'student',
  approval_status public.member_approval not null default 'pending',
  avatar_url text,
  bio text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text not null default '',
  year smallint not null check (year between 2 and 4),
  semester smallint not null check (semester in (1,2)),
  module_name text not null default '',
  file_name text not null,
  storage_path text not null unique,
  mime_type text not null default 'application/octet-stream',
  size_bytes bigint not null default 0,
  created_by uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 3000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references public.profiles(id) on delete cascade,
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  created_at timestamptz not null default now(),
  read_at timestamptz,
  constraint no_self_message check (sender_id <> recipient_id)
);

create index resources_year_semester_idx on public.resources(year, semester, created_at desc);
create index posts_created_at_idx on public.posts(created_at desc);
create index messages_pair_idx on public.messages(sender_id, recipient_id, created_at);

-- Security helper: role must be stored in protected profiles, never accepted from signup metadata.
create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles p where p.id = auth.uid() and p.role = 'admin' and p.approval_status = 'approved') $$;

create or replace function public.is_approved_member()
returns boolean language sql stable security definer set search_path = public
as $$ select exists(select 1 from public.profiles p where p.id = auth.uid() and p.approval_status = 'approved') $$;

-- Create a profile on signup. Role/approval values are fixed server-side.
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, academic_year, role, approval_status)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name',''),
    case when (new.raw_user_meta_data->>'academic_year') in ('2','3','4')
      then (new.raw_user_meta_data->>'academic_year')::smallint else 2 end,
    'student',
    'pending'
  ) on conflict (id) do nothing;
  return new;
end;
$$;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.resources enable row level security;
alter table public.posts enable row level security;
alter table public.messages enable row level security;

-- Profiles: approved members can view other approved members; members can edit their own safe fields.
create policy "approved members can view approved profiles" on public.profiles
for select to authenticated using (
  public.is_admin() or (approval_status = 'approved' and public.is_approved_member()) or id = auth.uid()
);
create policy "member can update own profile" on public.profiles
for update to authenticated using (id = auth.uid() and approval_status = 'approved')
with check (
  id = auth.uid()
  and role = 'student'
  and approval_status = 'approved'
);
create policy "admins manage profiles" on public.profiles
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Resources are readable by approved members. Only admins create/change/delete.
create policy "approved members read resources" on public.resources
for select to authenticated using (public.is_approved_member());
create policy "admins manage resources" on public.resources
for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Community posts: approved members can read and create; author edits own post; admin moderates all.
create policy "approved members read posts" on public.posts
for select to authenticated using (public.is_approved_member());
create policy "approved members create own posts" on public.posts
for insert to authenticated with check (author_id = auth.uid() and public.is_approved_member());
create policy "authors edit own posts" on public.posts
for update to authenticated using (author_id = auth.uid() and public.is_approved_member())
with check (author_id = auth.uid() and public.is_approved_member());
create policy "author or admin delete posts" on public.posts
for delete to authenticated using (author_id = auth.uid() or public.is_admin());

-- Messages only visible to sender/recipient and only for approved members.
create policy "participants read messages" on public.messages
for select to authenticated using (
  public.is_approved_member() and (sender_id = auth.uid() or recipient_id = auth.uid())
);
create policy "approved members send messages" on public.messages
for insert to authenticated with check (
  sender_id = auth.uid() and recipient_id <> auth.uid() and public.is_approved_member()
  and exists(select 1 from public.profiles p where p.id = recipient_id and p.approval_status = 'approved')
);
create policy "recipient can mark message read" on public.messages
for update to authenticated using (recipient_id = auth.uid() and public.is_approved_member())
with check (recipient_id = auth.uid() and public.is_approved_member());

-- Private file bucket for course resources; object names are stored in resources.storage_path.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('learning-resources','learning-resources',false,52428800,null)
on conflict (id) do update set public = false, file_size_limit = 52428800;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('profile-photos','profile-photos',true,5242880,array['image/jpeg','image/png','image/webp','image/gif'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp','image/gif'];

create policy "approved members read learning files" on storage.objects
for select to authenticated using (bucket_id = 'learning-resources' and public.is_approved_member());
create policy "admins upload learning files" on storage.objects
for insert to authenticated with check (bucket_id = 'learning-resources' and public.is_admin());
create policy "admins update learning files" on storage.objects
for update to authenticated using (bucket_id = 'learning-resources' and public.is_admin())
with check (bucket_id = 'learning-resources' and public.is_admin());
create policy "admins delete learning files" on storage.objects
for delete to authenticated using (bucket_id = 'learning-resources' and public.is_admin());

create policy "approved members upload own profile photo" on storage.objects
for insert to authenticated with check (
  bucket_id = 'profile-photos' and public.is_approved_member()
  and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "members update own profile photo" on storage.objects
for update to authenticated using (
  bucket_id = 'profile-photos' and public.is_approved_member()
  and (storage.foldername(name))[1] = auth.uid()::text
) with check (
  bucket_id = 'profile-photos' and public.is_approved_member()
  and (storage.foldername(name))[1] = auth.uid()::text
);
create policy "members delete own profile photo" on storage.objects
for delete to authenticated using (
  bucket_id = 'profile-photos' and public.is_approved_member()
  and (storage.foldername(name))[1] = auth.uid()::text
);

-- Realtime: add messages table to publication if it isn't already present.
do $$ begin
  alter publication supabase_realtime add table public.messages;
exception when duplicate_object then null;
when undefined_object then null;
end $$;

-- IMPORTANT: after your own account registers, promote only that account to admin
-- by running a query using its exact email in SQL Editor, for example:
-- update public.profiles p set role='admin', approval_status='approved'
-- from auth.users u where p.id=u.id and u.email='YOUR_REAL_ADMIN_EMAIL';
-- Then sign out/in again. Never make public signup assign its own role.

# UoG Public Health Academy — Enhanced Full-Stack Starter

## Enhanced design update
The landing page now has a refined navy/blue/teal visual system, responsive navigation, a stronger hero section, study-year pathway cards, expanded bilingual English/Amharic descriptions, feature cards, student access steps, safety guidance, and developer/Telegram credits. The supplied University of Gondar logo remains in `public/uog-academy-logo.png`.

This update improves the UI and adds useful explanatory content; it does not magically configure Supabase or publish the website. Continue with the setup steps below.

**Project owner / developer credit:** Senay Addisu Belew · Telegram: @besilencewell

A bilingual-ready student portal scaffold for University of Gondar Health Officer students in Years 2, 3 and 4. It includes Next.js UI, Supabase Auth, profile management and photo upload, admin approval, protected resource upload/download, community posts, and realtime chat scaffolding.

> This is an independent project, not an official University of Gondar service. Curriculum content is not supplied or verified. Label any placeholder material as DEMO until checked against approved university materials.

## What's implemented

- Responsive home page using the supplied UoG Public Health Academy logo.
- Supabase email/password registration and login.
- New student accounts start as `pending`; database trigger hardcodes role `student`.
- Profile editor with photo upload.
- Admin page for approving/rejecting student accounts and uploading learning resources.
- Private learning-resource storage bucket with signed download URLs.
- Community posts and private one-to-one chat using Supabase tables; chat subscribes to Realtime inserts.
- Database schema and row-level security (RLS) policies in `supabase/schema.sql`.
- Hosting/deployment instructions below.

## Important setup notes

This starter is a practical foundation, not yet a fully audited production service. Before opening it to real students, test RLS policies with multiple accounts, configure backups, abuse reporting/moderation, password recovery, email confirmation, rate limits, and privacy notices. Admin content editing/deletion and full MCQ exam authoring are planned follow-up features; this starter's admin currently covers account approval and resource publishing.

## 1. Requirements

- Node.js 20.9+ (recommended for Next.js 15)
- A free Supabase account: https://supabase.com/
- A Cloudflare account for hosting: https://dash.cloudflare.com/
- GitHub account (recommended for deploys): https://github.com/

## 2. Create the Supabase backend

1. Create a new Supabase project and keep its database password private.
2. Open **SQL Editor** in Supabase.
3. Run the full contents of `supabase/schema.sql` on a fresh project.
4. Go to **Project Settings → API** and copy the project URL and publishable/anon key.
5. Go to **Authentication → URL Configuration** and add your local URL `http://localhost:3000` for development. Later add your Vercel production URL.
6. Go to **Authentication → Providers → Email** and configure email confirmation according to your preferred signup workflow.
7. Create the first admin using the safe bootstrap process below.

### Create the first admin safely

1. Start the app and register using your own real email.
2. In Supabase SQL Editor, inspect the matching profile. Then promote only that exact email:

```sql
update public.profiles p
set role = 'admin', approval_status = 'approved'
from auth.users u
where p.id = u.id
  and u.email = 'YOUR_REAL_ADMIN_EMAIL';
```

Replace the placeholder with your own exact email. Do not grant admin to a public signup or any account you have not verified. Sign out and back in after the update. Do not share the service-role key.

## 3. Run locally

```bash
npm install
cp .env.example .env.local
```

Edit `.env.local` with the Supabase project URL and anon/publishable key:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_PUBLISHABLE_OR_ANON_KEY
```

Then run:

```bash
npm run dev
```

Open http://localhost:3000.

## 4. Deploy to Cloudflare Workers

For the Cloudflare + Supabase setup, follow the Amharic step-by-step guide in `CLOUDFLARE_SUPABASE_SETUP_AM.md`. This project uses Next.js server features, so use Cloudflare Workers with the OpenNext adapter rather than uploading it as a static-only Pages site. The guide covers the required Supabase environment variables and SQL schema.

## 5. Storage and uploads

The SQL configures:
- `learning-resources`: private bucket, 50 MB per file limit, accessible only to approved members; admins upload.
- `profile-photos`: public image bucket, 5 MB limit, common image MIME types only.

Increase video/audio upload limits only after reviewing Supabase plan limits and server/client upload strategy. For larger files, use resumable uploads. Never allow executable files to be run from storage. Do not upload patient-identifiable information or copyrighted materials without permission.

## 6. Role and security model

- Public signup cannot choose `role=admin`; the database trigger always sets `student` and `pending`.
- RLS protects data even if someone bypasses the UI.
- Admin status is read from `profiles`, not user-editable signup metadata.
- Keep any Supabase service-role key server-side only; it bypasses RLS and must never use a `NEXT_PUBLIC_` prefix.
- Admin route UI is checked client-side too, but database RLS remains the actual authorization boundary.

## 7. Current limitations / next milestones

- No verified official curriculum, exam questions, or research documents included.
- Password recovery UI, notification center, comments/reactions, moderation queue, course editing/deletion, and MCQ authoring/score tracking need a follow-up build.
- Chat is one-to-one and text-only; group chats and attachment support are not included yet.
- The admin dashboard is a starter UI; production rollout should include audit logs, safer content moderation, accessibility review, and automated tests.
- Add a clear privacy notice and student consent before collecting student data.

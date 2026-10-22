# Arrise Canvas

Arrise Canvas is a Next.js App Router application built with TypeScript,
React, Tailwind CSS 4 and Supabase client libraries.

The public website is a single-page marketing experience with section-anchor
navigation. `/platform-preview` shows static product architecture. Preview
dashboards, roles, modules and permission boundaries are illustrative only;
they do not represent live institution data, enforce access or process
subscriptions.

## Run locally

```powershell
npm install
npm run dev -- --port 54545
```

Open <http://localhost:54545>.

## Environment configuration

Copy `.env.example` to `.env.local` and set values for the environment:

- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` enable
  Supabase authentication. The anon key is public; protect data with database
  policies, not by hiding this key.
- `NEXT_PUBLIC_CONTACT_EMAIL` publishes the contact address on `/contact`.

Never expose a Supabase service-role key through a `NEXT_PUBLIC_` variable.
Google sign-in also requires enabling the Google provider in Supabase and
registering the local and production redirect URLs.

## Current implementation status

- Public pages include the home page, features, solutions, pricing, about,
  how-it-works, FAQ, contact, privacy and terms.
- Email/password, Google OAuth and password-reset interfaces use Supabase when
  it is configured. They do not report successful authentication when it is
  unavailable.
- The login page also provides public static demo credentials for student,
  mentor, faculty, staff, HOD, coordinator, institution admin, CA/accounts and
  SaaS super admin previews. All use `CanvasDemo2026!`; these navigate to
  Canvas workspace previews and are not authenticated accounts or protected
  dashboards. The student preview has interactive sample course, assignment,
  material and calendar views; its sample data and submission toggles are
  temporary and are not saved to an account. Other roles remain illustrative
  workspace previews. Real Supabase sign-ins continue to `/dashboard`.
- Signup does not let a user assign their own institution role. An authorized
  institution workflow must provision the user's profile and access.
- The authenticated student dashboard uses the signed-in profile but does not
  show courses, progress, assignments or other sample learning records. It
  clearly reports that institution data is not connected. Demo users see
  separate static role-specific workspace mockups at `/dashboard`; they are
  not authenticated sessions and cannot access student records.
- Pricing is informational only. There is no billing provider, configurable
  plan store, subscription enforcement or usage-limit enforcement yet.
- There are no checked-in database migrations in this repository. The current
  server auth helper expects a `profiles` record for each user with `role`,
  `fullName` and `institutionId` fields; verify the deployed schema and RLS
  policies before connecting learning data.
- Tenant membership checks, server-side authorization for learning records,
  live courses and materials, submissions, calendar, notifications, search,
  settings, billing, and reviewed legal terms and privacy disclosures are not
  yet implemented. This build is not ready for production or real institutional
  data. Do not add data queries or migrations until the existing schema and
  access policies are reviewed.

## Quality checks

```powershell
npm run lint
npm run build
```

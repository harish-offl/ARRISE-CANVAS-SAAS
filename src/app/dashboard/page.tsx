import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Database, ExternalLink } from "lucide-react";
import { AppHeader } from "../../components/app-header";
import { WorkspacePreview } from "../../components/workspace-preview";
import { Badge } from "../../components/ui/badge";
import {
  DEMO_ACCOUNTS,
  ROLE_LABELS,
  type DemoRole,
} from "../../lib/demo-auth";
import { getAuthUser } from "../../lib/auth";

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ previewRole?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto max-w-6xl px-4 py-12 text-sm text-muted">
          Loading your workspace...
        </main>
      }
    >
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}

async function DashboardContent({
  searchParams,
}: {
  searchParams: Promise<{ previewRole?: string }>;
}) {
  const { previewRole } = await searchParams;

  if (isDemoRole(previewRole)) {
    const demoAccount = DEMO_ACCOUNTS.find(
      (account) => account.role === previewRole
    );
    return (
      <WorkspacePreview
        fullName={demoAccount?.fullName ?? `Demo ${ROLE_LABELS[previewRole]}`}
        email={demoAccount?.email ?? "preview@demo.arrisecanvas.com"}
        role={previewRole}
        institution="Static Preview Institution"
        isDemo
      />
    );
  }

  const user = await getAuthUser();
  if (!user) redirect("/login");

  if (!isDemoRole(user.role)) {
    return (
      <main className="container mx-auto max-w-6xl px-4 py-12">
        <div className="mx-auto max-w-xl rounded-lg border border-border bg-surface p-6 text-center">
          <h1 className="text-xl font-semibold">Workspace unavailable</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Your account is signed in, but no workspace is configured for the
            role assigned to your profile. Contact your institution
            administrator.
          </p>
          <Link
            href="/"
            className="mt-5 inline-flex text-sm font-medium text-orange hover:underline"
          >
            Return to the public website
          </Link>
        </div>
      </main>
    );
  }

  if (user.role !== "student") {
    return (
      <WorkspacePreview
        fullName={user.profile.fullName || user.email}
        email={user.email}
        role={user.role}
        institution="Institution workspace"
        isDemo={false}
      />
    );
  }

  const fullName = user.profile.fullName || user.email;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader
        fullName={fullName}
        role={user.role}
      />
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted">Student workspace</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome, {fullName.split(" ")[0]}
            </h1>
            <p className="mt-2 text-sm text-muted">{user.email}</p>
          </div>
          <Badge variant="orange">{ROLE_LABELS[user.role]}</Badge>
        </div>

        <section className="mt-8 rounded-xl border border-border bg-surface p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange">
              <Database className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-lg font-semibold">
                Student learning data is not connected yet
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
                You are authenticated, but this project has no verified
                institution membership, course enrolment, assignments,
                materials, calendar or notification schema connected to the
                student workspace. To protect your data, this page does not
                substitute sample records or invented progress.
              </p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                Once the existing database schema and row-level access policies
                are available, the dashboard can load only the records
                authorized for your account.
              </p>
              <Link
                href="/#features"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange hover:underline"
              >
                View the platform overview
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function isDemoRole(role: string | undefined): role is DemoRole {
  return role !== undefined && Object.hasOwn(ROLE_LABELS, role);
}

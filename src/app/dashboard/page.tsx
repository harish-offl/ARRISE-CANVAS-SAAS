import { Suspense } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  FileStack,
  ClipboardList,
  Target,
  Megaphone,
  ArrowUpRight,
  Clock,
  Flame,
  Trophy,
  CalendarClock,
  Download,
} from "lucide-react";
import { AppHeader } from "../../components/app-header";
import { WorkspacePreview } from "../../components/workspace-preview";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { getAuthUser } from "../../lib/auth";
import { SUBJECTS } from "../../lib/fixtures";
import {
  DEMO_ACCOUNTS,
  ROLE_LABELS,
  type DemoRole,
} from "../../lib/demo-auth";
import { formatDate, timeAgo } from "../../lib/utils";

const subjectProgress = [42, 68, 25];

const upcoming = [
  { title: "Problem Set 4", subject: "CS301", due: "2026-10-21T23:59:00Z" },
  { title: "Quiz: Trees & Graphs", subject: "CS301", due: "2026-10-24T17:00:00Z" },
  { title: "Lab Report", subject: "CS301", due: "2026-10-28T12:00:00Z" },
];

export default function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ previewRole?: string }>;
}) {
  return (
    <Suspense
      fallback={
        <main className="container mx-auto max-w-6xl px-4 py-12 text-sm text-muted">
          Loading your dashboard...
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
          <h1 className="text-xl font-semibold">Workspace not available yet</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted">
            Your account is signed in, but a {user.role} workspace has not been
            connected in this build. Contact your institution administrator
            for access.
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

  const fullName = user.profile.fullName || user.email;
  const role = user.role;
  const institution = user.profile.institutionId || "Your institution";
  const email = user.email;

  if (role !== "student") {
    return (
      <WorkspacePreview
        fullName={fullName}
        email={email}
        role={role}
        institution={institution}
        isDemo={false}
      />
    );
  }

  const totals = SUBJECTS.reduce(
    (acc, subject) => ({
      materials: acc.materials + subject.materialsCount,
      assignments: acc.assignments + subject.assignmentsCount,
      quizzes: acc.quizzes + subject.quizzesCount,
    }),
    { materials: 0, assignments: 0, quizzes: 0 }
  );

  const stats = [
    {
      label: "Subjects",
      value: String(SUBJECTS.length),
      icon: BookOpen,
      hint: "Enrolled this term",
    },
    {
      label: "Materials",
      value: String(totals.materials),
      icon: FileStack,
      hint: "Across all subjects",
    },
    {
      label: "Assignments",
      value: String(totals.assignments),
      icon: ClipboardList,
      hint: "2 due this week",
    },
    {
      label: "Quizzes",
      value: String(totals.quizzes),
      icon: Target,
      hint: "1 available now",
    },
  ];

  const announcements = SUBJECTS.flatMap((subject) =>
    subject.announcements.map((announcement) => ({
      ...announcement,
      subjectCode: subject.code,
    }))
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader fullName={fullName} role={role} institution={institution} />

      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome back, {fullName.split(" ")[0]}
            </h1>
            <p className="mt-1 text-sm text-muted">
              Here&apos;s what&apos;s happening in your learning today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="orange">
              {ROLE_LABELS[role as DemoRole] ?? role}
            </Badge>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-border bg-surface p-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted">{stat.label}</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-md bg-orange/10 text-orange">
                  <stat.icon className="h-4 w-4" />
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold">{stat.value}</p>
              <p className="mt-1 text-xs text-muted">{stat.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <section className="rounded-lg border border-border bg-surface p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Continue learning</h2>
              <Link
                href="/features"
                className="inline-flex items-center gap-1 text-sm text-orange hover:underline"
              >
                View all <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <div className="flex flex-col gap-4">
              {SUBJECTS.map((subject, index) => (
                <div
                  key={subject.id}
                  className="rounded-lg border border-border bg-elevated/40 p-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-foreground">
                          {subject.name}
                        </h3>
                        <Badge variant="muted" size="sm">
                          {subject.code}
                        </Badge>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {subject.instructor} · {subject.term}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-orange">
                      {subjectProgress[index % subjectProgress.length]}%
                    </span>
                  </div>
                  <Progress
                    value={subjectProgress[index % subjectProgress.length]}
                    className="mt-3"
                  />
                  <div className="mt-3 flex flex-wrap gap-4 text-xs text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <FileStack className="h-3.5 w-3.5" />
                      {subject.materialsCount} materials
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <ClipboardList className="h-3.5 w-3.5" />
                      {subject.assignmentsCount} assignments
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <Target className="h-3.5 w-3.5" />
                      {subject.quizzesCount} quizzes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="flex flex-col gap-6">
            <section className="rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <CalendarClock className="h-4 w-4 text-orange" />
                Upcoming
              </h2>
              <ul className="flex flex-col gap-3">
                {upcoming.map((item) => (
                  <li
                    key={item.title}
                    className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted">{item.subject}</p>
                    </div>
                    <span className="inline-flex items-center gap-1 whitespace-nowrap text-xs text-warning">
                      <Clock className="h-3.5 w-3.5" />
                      {formatDate(item.due)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-border bg-surface p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold">
                <Megaphone className="h-4 w-4 text-orange" />
                Announcements
              </h2>
              <ul className="flex flex-col gap-4">
                {announcements.map((announcement) => (
                  <li key={announcement.id}>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {announcement.title}
                      </p>
                      {announcement.pinned && (
                        <Badge variant="orange" size="sm">
                          Pinned
                        </Badge>
                      )}
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-muted">
                      {announcement.body}
                    </p>
                    <p className="mt-1 text-xs text-muted">
                      {announcement.author} · {timeAgo(announcement.createdAt)}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Flame,
              title: "5-day streak",
              text: "Keep studying to maintain your streak.",
            },
            {
              icon: Trophy,
              title: "Top 10%",
              text: "You're among the most active learners.",
            },
            {
              icon: Download,
              title: "12 downloads",
              text: "Materials saved for offline study.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-lg border border-border bg-surface p-5"
            >
              <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <p className="text-xs text-muted">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 rounded-md border border-border bg-surface px-4 py-3 text-center text-xs text-muted">
          Preview only: course and progress information is sample data, not
          live institution data. Signed in as {email}.
        </p>
      </main>
    </div>
  );
}

function isDemoRole(role: string | undefined): role is DemoRole {
  return role !== undefined && Object.hasOwn(ROLE_LABELS, role);
}

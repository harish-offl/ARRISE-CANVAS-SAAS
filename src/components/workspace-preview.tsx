import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Bell,
  BookOpen,
  CalendarDays,
  CheckSquare,
  CircleDollarSign,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Megaphone,
  Settings,
  Users,
} from "lucide-react";
import { AppHeader } from "./app-header";
import { Badge } from "./ui/badge";
import { ROLE_LABELS, type DemoRole } from "../lib/demo-auth";
import { DemoStudentWorkspace } from "./demo-student-workspace";

const roleWorkspaces: Record<
  DemoRole,
  { subtitle: string; navigation: string[]; panels: { title: string; items: string[] }[] }
> = {
  student: {
    subtitle: "Your courses, learning materials and upcoming work.",
    navigation: ["My courses", "Assignments", "Study materials", "Calendar"],
    panels: [
      { title: "My learning", items: ["Course overview", "Study materials", "Learning progress"] },
      { title: "Upcoming work", items: ["Assignments", "Quizzes", "Academic dates"] },
    ],
  },
  mentor: {
    subtitle: "Mentoring activity and assigned student follow-ups.",
    navigation: ["My mentees", "Follow-ups", "Notes", "Calendar"],
    panels: [
      { title: "Mentoring", items: ["Assigned students", "Scheduled check-ins", "Follow-up notes"] },
      { title: "Student support", items: ["Progress overview", "Recent activity", "Support resources"] },
    ],
  },
  faculty: {
    subtitle: "Teaching activity, courses and learning resources.",
    navigation: ["My courses", "Course materials", "Assessments", "Calendar"],
    panels: [
      { title: "Teaching workspace", items: ["Assigned courses", "Course materials", "Class activities"] },
      { title: "Assessment tools", items: ["Assignments", "Submissions", "Feedback"] },
    ],
  },
  staff: {
    subtitle: "Assigned responsibilities and academic support activity.",
    navigation: ["My tasks", "Attendance", "Academic calendar", "Announcements"],
    panels: [
      { title: "Staff workspace", items: ["Assigned tasks", "Attendance workflow", "Team updates"] },
      { title: "Academic operations", items: ["Upcoming dates", "Department notices", "Support requests"] },
    ],
  },
  hod: {
    subtitle: "Department coordination and academic operations.",
    navigation: ["Department overview", "Courses", "Staff", "Reports"],
    panels: [
      { title: "Department", items: ["Course coordination", "Staff overview", "Academic calendar"] },
      { title: "Department reporting", items: ["Learning overview", "Attendance summary", "Operational updates"] },
    ],
  },
  coordinator: {
    subtitle: "Academic scheduling and coordination activity.",
    navigation: ["Academic calendar", "Course coordination", "Tasks", "Announcements"],
    panels: [
      { title: "Coordination", items: ["Academic terms", "Course schedules", "Team follow-ups"] },
      { title: "Updates", items: ["Announcements", "Important dates", "Workflow overview"] },
    ],
  },
  institution_admin: {
    subtitle: "Institution workspace setup and administration concepts.",
    navigation: ["Institution overview", "Users", "Departments", "Reports"],
    panels: [
      { title: "Institution administration", items: ["Workspace settings", "User administration", "Department setup"] },
      { title: "Institution overview", items: ["Academic activity", "Announcements", "Reports"] },
    ],
  },
  ca_accounts: {
    subtitle: "Finance workspace concepts for authorized accounts teams.",
    navigation: ["Finance overview", "Fees", "Invoices", "Reports"],
    panels: [
      { title: "Accounts workspace", items: ["Fee workflows", "Invoice records", "Finance notices"] },
      { title: "Finance reports", items: ["Account summaries", "Payment schedules", "Export concepts"] },
    ],
  },
  saas_super_admin: {
    subtitle: "Platform operations and tenant-management concepts.",
    navigation: ["Platform overview", "Institutions", "Plans", "Audit log"],
    panels: [
      { title: "Platform operations", items: ["Institution tenants", "Plan configuration", "Service status"] },
      { title: "Platform governance", items: ["Administrative actions", "Audit history", "Platform settings"] },
    ],
  },
};

const navigationIcons = [LayoutDashboard, BookOpen, CheckSquare, CalendarDays];

export function WorkspacePreview({
  fullName,
  email,
  role,
  institution,
  isDemo,
}: {
  fullName: string;
  email: string;
  role: DemoRole;
  institution: string;
  isDemo: boolean;
}) {
  const workspace = roleWorkspaces[role];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AppHeader
        fullName={fullName}
        role={role}
        isDemo={isDemo}
      />
      {isDemo && role === "student" ? (
        <DemoStudentWorkspace fullName={fullName} institution={institution} />
      ) : (
      <main className="container mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <p className="text-sm text-muted">{institution} · Canvas workspace</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Welcome, {fullName.split(" ")[0]}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted">{workspace.subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="orange">{ROLE_LABELS[role]}</Badge>
            <Badge variant="muted">{isDemo ? "Static demo" : "Workspace preview"}</Badge>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {workspace.navigation.map((item, index) => {
            const Icon = navigationIcons[index % navigationIcons.length];
            return (
              <div
                key={item}
                className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm"
              >
                <Icon className="h-4 w-4 text-orange" aria-hidden="true" />
                {item}
              </div>
            );
          })}
        </div>

        <section
          aria-label="Workspace preview areas"
          className="mt-6 grid gap-5 lg:grid-cols-2"
        >
          {workspace.panels.map((panel, index) => {
            const Icon = index === 0 ? Activity : FileText;
            return (
              <article
                key={panel.title}
                className="rounded-xl border border-border bg-surface p-5 sm:p-6"
              >
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h2 className="font-semibold">{panel.title}</h2>
                    <p className="text-xs text-muted">Static preview section</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {panel.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-3 text-sm"
                    >
                      <span className="flex items-center gap-2">
                        {role === "ca_accounts" ? (
                          <CircleDollarSign className="h-4 w-4 text-orange" aria-hidden="true" />
                        ) : role === "institution_admin" || role === "saas_super_admin" ? (
                          <Users className="h-4 w-4 text-orange" aria-hidden="true" />
                        ) : role === "coordinator" ? (
                          <Megaphone className="h-4 w-4 text-orange" aria-hidden="true" />
                        ) : (
                          <ClipboardList className="h-4 w-4 text-orange" aria-hidden="true" />
                        )}
                        {item}
                      </span>
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-muted" aria-hidden="true" />
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        <div className="mt-6 rounded-lg border border-orange/30 bg-orange/5 p-4">
          <div className="flex items-start gap-3">
            <Bell className="mt-0.5 h-4 w-4 shrink-0 text-orange" aria-hidden="true" />
            <div>
              <p className="text-sm font-semibold">
                {isDemo ? "You are viewing a public demo workspace" : "Workspace modules are preview-only"}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {isDemo
                  ? "This demo does not create an account, load institution records, save changes or enforce permissions. Sign in with a configured institution account for authenticated access."
                  : `Signed in as ${email}. This build uses preview content in this workspace and does not connect these panels to live institution records.`}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/#features"
            className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-elevated"
          >
            Product overview
          </Link>
          <Link
            href="/platform-preview"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-border px-4 text-sm font-medium transition-colors hover:bg-elevated"
          >
            <Settings className="h-4 w-4" aria-hidden="true" />
            Platform architecture
          </Link>
        </div>
      </main>
      )}
    </div>
  );
}

import Link from "next/link";
import {
  ArrowDown,
  BookOpen,
  Building2,
  ChartNoAxesCombined,
  Check,
  CircleDollarSign,
  ClipboardList,
  CalendarDays,
  GraduationCap,
  Landmark,
  Shield,
  Users,
} from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import { PageContainer, Section } from "../../components/marketing";

const roles = [
  {
    slug: "student",
    name: "Student",
    summary: "Courses, notes and assignments",
    icon: GraduationCap,
    preview: ["My courses", "Learning materials", "Upcoming assignments"],
  },
  {
    slug: "mentor",
    name: "Mentor",
    summary: "Assigned students and follow-ups",
    icon: Users,
    preview: ["Assigned students", "Mentoring follow-ups", "Progress notes"],
  },
  {
    slug: "faculty",
    name: "Faculty",
    summary: "Classes, materials and learning activities",
    icon: BookOpen,
    preview: ["Teaching schedule", "Course materials", "Class activities"],
  },
  {
    slug: "staff",
    name: "Staff",
    summary: "Attendance and assigned tasks",
    icon: ClipboardList,
    preview: ["Assigned tasks", "Attendance workflow", "Team updates"],
  },
  {
    slug: "hod",
    name: "HOD",
    summary: "Department operations",
    icon: Building2,
    preview: ["Department overview", "Staff and course coordination", "Reports"],
  },
  {
    slug: "coordinator",
    name: "Coordinator",
    summary: "Academic coordination",
    icon: CalendarDays,
    preview: ["Academic calendar", "Course coordination", "Team follow-ups"],
  },
  {
    slug: "institution_admin",
    name: "Institution Admin",
    summary: "Users, settings and reports",
    icon: Shield,
    preview: ["Institution settings", "User administration", "Institution reports"],
  },
  {
    slug: "ca_accounts",
    name: "CA / Accounts",
    summary: "Fees, invoices and finance",
    icon: CircleDollarSign,
    preview: ["Authorized finance workflows", "Fees and invoices", "Account reports"],
  },
  {
    slug: "saas_super_admin",
    name: "SaaS Super Admin",
    summary: "Tenants, plans and platform operations",
    icon: Landmark,
    preview: ["Tenant administration", "Plan configuration", "Platform operations"],
  },
];

const permissions = [
  ["Student", "Own enrolled courses", "No", "No"],
  ["Mentor", "Assigned students only", "No", "No"],
  ["Faculty", "Assigned classes and courses", "No", "No"],
  ["Staff", "Assigned tasks and records", "No", "No"],
  ["HOD", "Authorized department", "Department scope only", "No"],
  ["Coordinator", "Assigned academic workflows", "No", "No"],
  ["Institution Admin", "Authorized institution", "Institution scope only", "No"],
  ["CA / Accounts", "Authorized finance records", "Finance scope only", "No"],
  ["SaaS Super Admin", "Platform scope, subject to controls", "Audited platform actions", "Platform scope"],
];

const modules = [
  "Courses and subjects",
  "Study materials and notes",
  "Assignments and assessments",
  "Attendance and academic calendar",
  "Mentoring and follow-ups",
  "Announcements and notifications",
  "Department and staff operations",
  "Reports and analytics",
];

export default function PlatformPreviewPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="border-b border-border">
          <PageContainer className="py-14 text-center md:py-20">
            <p className="text-sm font-semibold uppercase tracking-wider text-orange">
              Static product preview
            </p>
            <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Arrise Canvas platform architecture
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted">
              An illustrative view of the public website, authentication,
              institution workspaces, role concepts and shared services. These
              screens are static and do not connect to accounts or live data.
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-orange/30 bg-orange/10 px-4 py-2 text-sm font-medium text-orange">
              <ClipboardList className="h-4 w-4" />
              UI concept · Not a live application
            </div>
          </PageContainer>
        </section>

        <Section>
          <PageContainer className="max-w-5xl">
            <div className="rounded-xl border border-border bg-surface p-5 text-center sm:p-7">
              <p className="text-lg font-bold text-orange">ARRISE CANVAS</p>
              <p className="mt-1 text-sm text-muted">Educational SaaS platform</p>
            </div>
            <div className="flex justify-center py-3 text-orange">
              <ArrowDown aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <ArchitectureCard
                icon={Building2}
                title="Public website"
                items="Home · Features · Solutions · Pricing"
              />
              <ArchitectureCard
                icon={Shield}
                title="Authentication"
                items="Google OAuth · Email · Password"
              />
            </div>
            <div className="flex justify-center py-3 text-orange">
              <ArrowDown aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="rounded-xl border border-orange/50 bg-orange/5 p-6 text-center">
              <h2 className="font-semibold">Tenant + Permission Engine</h2>
              <p className="mt-2 text-sm text-muted">
                Institution membership · Role-based access · Plan entitlements
              </p>
              <p className="mt-3 text-xs font-medium text-orange">
                Architecture concept only — server-side enforcement is not
                implemented in this static preview.
              </p>
            </div>
            <div className="flex justify-center py-3 text-orange">
              <ArrowDown aria-hidden="true" className="h-5 w-5" />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map(({ name, summary, icon: Icon }) => (
                <article
                  key={name}
                  className="rounded-lg border border-border bg-surface p-5"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="h-5 w-5 text-orange" aria-hidden="true" />
                    <h3 className="font-semibold">{name}</h3>
                  </div>
                  <p className="mt-2 text-sm text-muted">{summary}</p>
                </article>
              ))}
            </div>

            <div className="flex justify-center py-3 text-orange">
              <ArrowDown aria-hidden="true" className="h-5 w-5" />
            </div>
            <div className="rounded-xl border border-orange/50 bg-surface p-6 text-center">
              <h2 className="font-semibold">Shared data and services</h2>
              <p className="mt-2 text-sm text-muted">
                Database · File storage · Notifications · Analytics · Audit logs
              </p>
              <p className="mt-3 text-xs text-muted">
                Planned shared-service areas. This website does not store or
                process institutional data.
              </p>
            </div>
          </PageContainer>
        </Section>

        <Section className="border-y border-border bg-surface/50">
          <PageContainer>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                Role workspace concepts
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                A focused starting point for each role
              </h2>
              <p className="mt-4 text-sm text-muted">
                The cards below illustrate possible navigation and content.
                They are not connected to role assignments, institution data or
                authorization checks.
              </p>
            </div>
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map(({ slug, name, summary, icon: Icon, preview }) => (
                <article
                  key={name}
                  id={`role-${slug}`}
                  className="scroll-mt-24 overflow-hidden rounded-xl border border-border bg-background"
                >
                  <div className="flex items-center gap-3 border-b border-border p-4">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange/10 text-orange">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-sm font-semibold">{name}</h3>
                      <p className="text-xs text-muted">{summary}</p>
                    </div>
                  </div>
                  <div className="space-y-2 p-4">
                    {preview.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-xs"
                      >
                        <Check className="h-3.5 w-3.5 text-orange" aria-hidden="true" />
                        {item}
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <div className="mx-auto max-w-3xl text-center">
              <ChartNoAxesCombined className="mx-auto h-8 w-8 text-orange" aria-hidden="true" />
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Permission boundaries
              </h2>
              <p className="mt-4 text-sm text-muted">
                Example access boundaries for planning. This table describes
                intended scope; it does not enforce access.
              </p>
            </div>
            <div className="mt-8 overflow-x-auto rounded-xl border border-border">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead className="bg-elevated text-xs uppercase tracking-wide text-muted">
                  <tr>
                    {["Role", "Data scope", "Finance", "Platform controls"].map(
                      (heading) => (
                        <th key={heading} className="px-4 py-3 font-semibold">
                          {heading}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((row) => (
                    <tr key={row[0]} className="border-t border-border">
                      {row.map((cell, index) => (
                        <td
                          key={`${row[0]}-${index}`}
                          className={`px-4 py-3 ${
                            index === 0 ? "font-medium" : "text-muted"
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted">
              Production access controls require authenticated server-side
              checks and database policies. A visual mockup cannot protect
              another tenant&apos;s data.
            </p>
          </PageContainer>
        </Section>

        <Section className="border-y border-border bg-surface/50">
          <PageContainer>
            <div className="mx-auto max-w-3xl text-center">
              <BookOpen className="mx-auto h-8 w-8 text-orange" aria-hidden="true" />
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Learning and operations modules
              </h2>
              <p className="mt-4 text-sm text-muted">
                The following modules are presented as product-scope concepts
                for this static site.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {modules.map((module) => (
                <div
                  key={module}
                  className="rounded-lg border border-border bg-background p-4 text-sm font-medium"
                >
                  {module}
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-surface p-7 text-center sm:p-10">
              <h2 className="text-2xl font-bold tracking-tight">
                Want to discuss the product?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Contact us to discuss your institution&apos;s needs. Pricing,
                authentication, permissions, database services and integrations
                must be configured before they can be used.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
                >
                  Contact us
                  <ArrowDown className="h-4 w-4 rotate-[-90deg]" />
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-medium transition-colors hover:bg-elevated"
                >
                  View pricing
                </Link>
              </div>
            </div>
          </PageContainer>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

function ArchitectureCard({
  icon: Icon,
  title,
  items,
}: {
  icon: typeof Building2;
  title: string;
  items: string;
}) {
  return (
    <article className="rounded-lg border border-border bg-surface p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-orange" aria-hidden="true" />
        <h2 className="text-sm font-semibold">{title}</h2>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">{items}</p>
    </article>
  );
}

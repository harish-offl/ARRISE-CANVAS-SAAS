import Link from "next/link";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ClipboardCheck,
  FileText,
  GraduationCap,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Navbar, Footer } from "../components/layout/public-layout";
import { PageContainer, Section } from "../components/marketing";

const features = [
  {
    icon: BookOpen,
    title: "Learning management",
    description: "Courses, subjects and structured learning materials.",
  },
  {
    icon: ClipboardCheck,
    title: "Assignments & assessments",
    description: "Assignment and quiz workflows for learners and educators.",
  },
  {
    icon: CalendarDays,
    title: "Attendance & calendar",
    description: "Academic schedules, attendance and important dates.",
  },
  {
    icon: Users,
    title: "Mentoring & communication",
    description: "Mentor relationships, announcements and notifications.",
  },
  {
    icon: Layers3,
    title: "Department operations",
    description: "Department, staff and faculty workflows in one workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Administration & reporting",
    description: "Institutional settings, role views and reporting concepts.",
  },
];

const roles = [
  ["Student", "Courses, notes and assignments"],
  ["Mentor", "Assigned students and follow-ups"],
  ["Faculty / Staff", "Classes, attendance and tasks"],
  ["HOD", "Department operations"],
  ["Institution Admin", "Users, settings and reports"],
  ["CA / Accounts", "Fees, invoices and finance"],
  ["SaaS Super Admin", "Tenants, plans and platform operations"],
];

const steps = [
  "Create an institution workspace",
  "Configure departments, courses and academic terms",
  "Invite students and employees",
  "Assign authorized roles and permissions",
  "Coordinate teaching, learning and operations",
  "Review reports and progress",
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,107,0,0.12),transparent)]" />
          <PageContainer className="relative grid items-center gap-12 py-16 md:grid-cols-[1fr_0.95fr] md:py-24">
            <div>
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-orange">
                Educational SaaS platform
              </p>
              <h1 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                One Intelligent Workspace for Every Institution.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
                Bring learning, academic management, mentoring, attendance,
                communication and institutional workflows together in one
                connected platform.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
                >
                  Talk to our team
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/platform-preview"
                  className="inline-flex h-11 items-center justify-center rounded-md border border-border px-6 text-sm font-medium transition-colors hover:bg-elevated"
                >
                  Explore the platform
                </Link>
              </div>
              <p className="mt-4 text-xs text-muted">
                Static product preview · No live account or institution data
              </p>
            </div>

            <div
              aria-label="Static preview of the Arrise Canvas workspace"
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xl"
            >
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange text-black">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Learning workspace</p>
                    <p className="text-xs text-muted">Product preview</p>
                  </div>
                </div>
                <span className="rounded-full bg-orange/10 px-3 py-1 text-xs font-medium text-orange">
                  Preview
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr]">
                <aside className="hidden border-r border-border bg-elevated/50 p-4 sm:block">
                  <p className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-muted">
                    Workspace
                  </p>
                  {["Overview", "My courses", "Assignments", "Calendar"].map(
                    (item, index) => (
                      <div
                        key={item}
                        className={`mb-1 rounded-md px-3 py-2 text-xs ${
                          index === 0
                            ? "bg-orange/10 font-medium text-orange"
                            : "text-muted"
                        }`}
                      >
                        {item}
                      </div>
                    )
                  )}
                </aside>
                <div className="min-w-0 p-5 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs text-muted">Student workspace</p>
                      <h2 className="mt-1 text-lg font-semibold">Your learning overview</h2>
                    </div>
                    <Bell className="h-4 w-4 text-muted" aria-hidden="true" />
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {[
                      ["Courses", "My learning"],
                      ["Assignments", "Due dates"],
                    ].map(([label, value]) => (
                      <div
                        key={label}
                        className="rounded-lg border border-border p-3"
                      >
                        <p className="text-xs text-muted">{label}</p>
                        <p className="mt-1 text-sm font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-lg border border-border p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <FileText className="h-4 w-4 text-orange" />
                      Course materials
                    </div>
                    <div className="mt-4 space-y-3">
                      {["Course overview", "Lecture notes", "Next assignment"].map(
                        (item, index) => (
                          <div
                            key={item}
                            className="flex items-center gap-3 text-xs"
                          >
                            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-orange/10 text-orange">
                              {index + 1}
                            </span>
                            <span className="flex-1">{item}</span>
                            <Check className="h-4 w-4 text-muted" />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        <Section>
          <PageContainer id="features" className="scroll-mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                One connected platform
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Designed for the work behind better learning
              </h2>
              <p className="mt-4 text-muted">
                A product concept for colleges, universities, schools, training
                centres and professional education providers.
              </p>
            </div>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {features.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-lg border border-border bg-surface p-6"
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange/10 text-orange">
                    <Icon aria-hidden="true" className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section className="border-y border-border bg-surface/50">
          <PageContainer id="solutions" className="scroll-mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                Role-aware workspaces
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                The right view for every team
              </h2>
              <p className="mt-4 text-muted">
                These are static role concepts, not active accounts or enforced
                permissions. Real access requires institution configuration.
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {roles.map(([title, description]) => (
                <div
                  key={title}
                  className="rounded-lg border border-border bg-background p-5"
                >
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm text-muted">{description}</p>
                </div>
              ))}
            </div>
            <div className="mt-7 text-center">
              <Link
                href="/platform-preview"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange hover:underline"
              >
                View all workspace previews
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer id="how-it-works" className="scroll-mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                How it works
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                From institution setup to shared progress
              </h2>
            </div>
            <ol className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <li
                  key={step}
                  className="flex items-start gap-4 rounded-lg border border-border bg-surface p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange text-sm font-bold text-black">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-sm font-medium">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 text-center text-xs text-muted">
              Illustrative workflow. Setup, permissions, integrations and
              available features depend on the deployed product configuration.
            </p>
          </PageContainer>
        </Section>

        <Section id="pricing" className="scroll-mt-24 border-t border-border bg-surface/50">
          <PageContainer>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                Pricing
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Plans designed around your institution
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Prices, usage limits and plan entitlements are not configured
                in this static preview. Contact us to discuss your requirements.
              </p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {[
                ["Learner access", "Access provided through a participating institution."],
                ["Institution", "Discuss users, departments and learning workflows."],
                ["Enterprise", "Discuss multi-campus needs and integrations."],
              ].map(([title, description]) => (
                <article
                  key={title}
                  className="rounded-xl border border-border bg-background p-6"
                >
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-3 min-h-12 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange hover:underline"
                  >
                    Discuss pricing
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section id="about" className="scroll-mt-24">
          <PageContainer>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                About Arrise Canvas
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                A calmer, more connected way to learn
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Arrise Canvas is a product concept for bringing learning and
                academic operations into one clear workspace. We believe
                education technology should support the people teaching and
                learning—not add more clutter to their day.
              </p>
              <Link
                href="/about"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-orange hover:underline"
              >
                More about us
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </PageContainer>
        </Section>

        <Section id="faq" className="scroll-mt-24 border-t border-border bg-surface/50">
          <PageContainer className="max-w-3xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                FAQ
              </p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                Common questions
              </h2>
            </div>
            <div className="mt-8 space-y-3">
              {[
                [
                  "Is this a live Canvas service?",
                  "No. This website is a static product preview. Authentication, data storage and institution access require separate configuration.",
                ],
                [
                  "Who is the product designed for?",
                  "The product concept covers students, mentors, faculty and staff, academic leaders, institution administrators and finance teams.",
                ],
                [
                  "Are pricing and plan limits active?",
                  "No. Plan prices, entitlements and usage limits are not configured in this preview.",
                ],
              ].map(([question, answer]) => (
                <details
                  key={question}
                  className="group rounded-lg border border-border bg-background p-5"
                >
                  <summary className="cursor-pointer list-none font-medium marker:hidden">
                    {question}
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {answer}
                  </p>
                </details>
              ))}
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/faq"
                className="inline-flex items-center gap-2 text-sm font-medium text-orange hover:underline"
              >
                Browse all FAQs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </PageContainer>
        </Section>

        <Section className="border-t border-border">
          <PageContainer>
            <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-border bg-surface p-8 md:flex-row md:items-center md:p-10">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-wider text-orange">
                  Explore the concept
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  Preview the roles and shared platform architecture
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Browse static workspace mockups and a role-boundary overview.
                  Nothing on the preview page saves data or grants access.
                </p>
              </div>
              <Link
                href="/platform-preview"
                className="inline-flex h-11 shrink-0 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
              >
                Open platform preview
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </PageContainer>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

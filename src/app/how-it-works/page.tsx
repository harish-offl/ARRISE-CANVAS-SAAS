import Link from "next/link";
import {
  Building,
  UserCog,
  Search,
  BarChart3,
  ArrowRight,
  Check,
  ClipboardList,
  BookOpen,
  Bell,
  Users,
} from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import {
  PageHero,
  Section,
  SectionHeading,
  CtaSection,
  PageContainer,
} from "../../components/marketing";

const steps = [
  {
    icon: Building,
    title: "Create an institution workspace",
    description:
      "Start with an institution workspace that reflects the organization using the platform.",
    points: [
      "Define institution details",
      "Plan the workspace structure",
    ],
  },
  {
    icon: Building,
    title: "Configure departments and courses",
    description:
      "Set up academic departments, courses, subjects and terms.",
    points: [
      "Organize departments and subjects",
      "Set academic terms and course structure",
    ],
  },
  {
    icon: Users,
    title: "Invite students and employees",
    description:
      "Plan account onboarding for the people who belong in the workspace.",
    points: [
      "Invite students and faculty",
      "Organize staff and institutional teams",
    ],
  },
  {
    icon: UserCog,
    title: "Assign roles and permissions",
    description:
      "Define which workspace areas are appropriate for each institutional role.",
    points: [
      "Set role responsibilities",
      "Review access before onboarding",
    ],
  },
  {
    icon: Search,
    title: "Manage teaching and learning",
    description:
      "Coordinate teaching, learning activities and academic operations.",
    points: [
      "Organize learning content and assessments",
      "Coordinate attendance and communication",
    ],
  },
  {
    icon: BarChart3,
    title: "Review reports and progress",
    description:
      "Give authorized teams a way to review learning and institutional progress.",
    points: [
      "Review course and learning progress",
      "Review department and institution reports",
    ],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="How it works"
          title="A six-step institutional workflow"
          description="Explore how an institution could organize people, courses and academic operations in one connected workspace."
        >
          <Link
            href="/platform-preview"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
          >
            Preview the platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </PageHero>

        <div className="border-y border-border bg-orange/5">
          <PageContainer className="py-3 text-center text-xs text-muted">
            Static overview only. It does not create an institution, invite
            users or save records.
          </PageContainer>
        </div>

        <Section>
          <PageContainer>
            <div className="flex flex-col gap-8">
              {steps.map((step, index) => (
                <div
                  key={step.title}
                  className="grid items-start gap-6 rounded-2xl border border-border bg-surface p-6 md:grid-cols-[auto_1fr_1fr] md:p-8"
                >
                  <div className="flex items-center gap-4 md:flex-col md:items-start">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange text-lg font-bold text-black">
                      {index + 1}
                    </div>
                    <step.icon className="h-6 w-6 text-orange md:mt-2" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">{step.title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-3">
                    {step.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-orange/15 text-orange">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span className="text-foreground">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section className="border-y border-border bg-surface/40">
          <PageContainer>
            <SectionHeading
              eyebrow="What you get"
              title="A complete learning toolkit"
              description="Illustrative product areas. Availability depends on a future configured product."
            />
            <div className="grid gap-5 sm:grid-cols-3">
              {[
                {
                  icon: BookOpen,
                  title: "Structured content",
                  text: "Units, topics and materials that mirror your curriculum.",
                },
                {
                  icon: ClipboardList,
                  title: "Assessments",
                  text: "Assignments and quizzes with automatic scoring.",
                },
                {
                  icon: Bell,
                  title: "Communication",
                  text: "Announcements and notifications that keep everyone aligned.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-border bg-surface p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted">{item.text}</p>
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

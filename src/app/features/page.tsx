import Link from "next/link";
import {
  BookOpen,
  ClipboardList,
  Bell,
  BarChart3,
  ShieldCheck,
  Search,
  FolderTree,
  Layers,
  MessagesSquare,
  CircleCheck,
  ArrowRight,
  ChartLine,
  Target,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import {
  PageHero,
  Section,
  SectionHeading,
  FeatureCard,
  CtaSection,
  PageContainer,
} from "../../components/marketing";

const primaryFeatures = [
  {
    icon: BookOpen,
    title: "Course & Material Library",
    description:
      "Organize every subject into units and topics. Upload PDFs, documents, slides, images and videos into a structured, searchable library.",
  },
  {
    icon: ClipboardList,
    title: "Assignments",
    description:
      "Publish assignments with instructions, attachments, due dates and allowed submission formats. Grade and return feedback in seconds.",
  },
  {
    icon: Target,
    title: "Quizzes",
    description:
      "Build auto-scored quizzes with multiple-choice questions, time limits and attempt controls — results are ready instantly.",
  },
  {
    icon: Bell,
    title: "Announcements & Notifications",
    description:
      "Keep everyone aligned with pinned announcements and a notification inbox for materials, assignments, quizzes and grades.",
  },
  {
    icon: BarChart3,
    title: "Progress & Analytics",
    description:
      "Role-focused reporting concepts for learning progress and institutional operations.",
  },
  {
    icon: Search,
    title: "Powerful Search",
    description:
      "A product concept for finding learning content across courses and topics.",
  },
];

const supportingFeatures = [
  {
    icon: FolderTree,
    title: "Units & Topics",
    description: "A clean hierarchy that mirrors how courses are actually taught.",
  },
  {
    icon: Layers,
    title: "Bookmarks",
    description: "Save materials for later and build a personal study set.",
  },
  {
    icon: Calendar,
    title: "Study Sessions",
    description: "Log study time per subject and topic to build strong habits.",
  },
  {
    icon: MessagesSquare,
    title: "Feedback Loop",
    description: "Give and receive meaningful feedback on graded work.",
  },
  {
    icon: ShieldCheck,
    title: "Audit Logs",
    description: "An institutional audit-history concept for important actions.",
  },
  {
    icon: TrendingUp,
    title: "Role Dashboards",
    description: "Workspace concepts for students, mentors, faculty and administrators.",
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Features"
          title="A connected canvas for learning and academic operations"
          description="Explore a static preview of the product scope: learning materials, assessments, communication and institution workflows."
        >
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
          >
            Discuss the platform
            <ArrowRight className="h-4 w-4" />
          </Link>
        </PageHero>

        <div className="border-b border-border bg-orange/5">
          <PageContainer className="py-3 text-center text-xs text-muted">
            Static product overview. Items on this page are product concepts
            and are not a claim that live services are configured.
            {" "}
            <Link href="/platform-preview" className="font-medium text-orange hover:underline">
              View workspace previews
            </Link>
          </PageContainer>
        </div>

        <Section>
          <PageContainer>
            <SectionHeading
              align="left"
              eyebrow="Core platform"
              title="Powerful tools, thoughtfully connected"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {primaryFeatures.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section className="border-y border-border bg-surface/40">
          <PageContainer>
            <SectionHeading
              align="left"
              eyebrow="And more"
              title="The details that make it a joy to use"
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {supportingFeatures.map((feature) => (
                <FeatureCard key={feature.title} {...feature} />
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Why institutions choose Arrise Canvas
                </h2>
                <p className="mt-4 text-muted">
                  Designed to reduce tool sprawl and give every role a single,
                  dependable home for learning.
                </p>
                <ul className="mt-6 flex flex-col gap-3">
                  {[
                    "File types for every lesson: PDF, DOCX, PPTX, images & video",
                    "Assignments, quizzes and grades in one place",
                    "Role and permission concepts for institution planning",
                    "A product vision for single- and multi-department institutions",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <CircleCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-3 border-b border-border pb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
                    <ChartLine className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">Engagement snapshot</p>
                    <p className="text-xs text-muted">Static product preview</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "Learning", label: "Course workspace" },
                    { value: "Operations", label: "Institution tools" },
                    { value: "Roles", label: "Workspace concepts" },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div className="text-2xl font-bold text-orange">
                        {stat.value}
                      </div>
                      <div className="mt-1 text-xs text-muted">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PageContainer>
        </Section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

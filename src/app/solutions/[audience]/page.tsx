import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Navbar, Footer } from "../../../components/layout/public-layout";
import {
  CtaSection,
  PageContainer,
  PageHero,
  Section,
} from "../../../components/marketing";

const solutions = {
  students: {
    title: "A clearer canvas for students",
    description:
      "Keep course information, learning materials and academic updates in one place, so it is easier to focus on what comes next.",
    benefits: [
      "Find course materials and announcements in a shared space.",
      "Keep track of assignments and important academic dates.",
      "Stay connected with the learning activities your institution provides.",
    ],
  },
  faculty: {
    title: "A connected workspace for faculty",
    description:
      "Organize course information and share learning resources with students through an institution-managed workspace.",
    benefits: [
      "Structure course content for students to follow.",
      "Share materials and updates with the relevant class.",
      "Coordinate teaching activities through institution-configured tools.",
    ],
  },
  administration: {
    title: "Academic operations with more clarity",
    description:
      "Give authorized institutional teams a shared starting point for managing academic workflows and supporting their community.",
    benefits: [
      "Coordinate academic operations within approved permissions.",
      "Keep relevant institutional teams connected to updates.",
      "Use institution-configured reports and administrative tools.",
    ],
  },
  institutions: {
    title: "A learning platform shaped around your institution",
    description:
      "Bring learning and academic workflows together in a tenant-aware workspace configured for your institution.",
    benefits: [
      "Organize users and academic teams around your institution.",
      "Configure access based on approved roles and responsibilities.",
      "Explore plans and workflows suited to your institution's needs.",
    ],
  },
} as const;

type Audience = keyof typeof solutions;

export function generateStaticParams() {
  return Object.keys(solutions).map((audience) => ({ audience }));
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ audience: string }>;
}) {
  const { audience } = await params;
  if (!Object.hasOwn(solutions, audience)) notFound();

  const solution = solutions[audience as Audience];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Solutions"
          title={solution.title}
          description={solution.description}
        >
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
          >
            Talk to us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </PageHero>
        <Section>
          <PageContainer>
            <div className="mx-auto grid max-w-3xl gap-4">
              {solution.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="rounded-lg border border-border bg-surface p-5"
                >
                  <p className="leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>
        <CtaSection
          title="See what works for your institution"
          description="Plan availability and access are configured by each institution."
          primary={{ label: "View pricing", href: "/pricing" }}
          secondary={{ label: "Contact us", href: "/contact" }}
        />
      </main>
      <Footer />
    </div>
  );
}

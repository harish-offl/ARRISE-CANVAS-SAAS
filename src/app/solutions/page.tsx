import Link from "next/link";
import { ArrowRight, BookOpen, Building2, GraduationCap, Users } from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import {
  PageContainer,
  PageHero,
  Section,
  SectionHeading,
} from "../../components/marketing";

const audiences = [
  {
    href: "/solutions/students",
    title: "Students",
    description:
      "A clear place to find course materials, assignments and learning updates.",
    icon: GraduationCap,
  },
  {
    href: "/solutions/faculty",
    title: "Faculty",
    description:
      "Tools to organize courses, share learning resources and support students.",
    icon: BookOpen,
  },
  {
    href: "/solutions/administration",
    title: "Administration",
    description:
      "A connected workspace for coordinating people and academic operations.",
    icon: Users,
  },
  {
    href: "/solutions/institutions",
    title: "Institutions",
    description:
      "A shared platform shaped around each institution's teams and workflows.",
    icon: Building2,
  },
];

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Solutions"
          title="One workspace for every part of learning"
          description="Arrise Canvas brings students, educators and institutional teams into a connected learning environment."
        />
        <Section>
          <PageContainer>
            <SectionHeading
              title="Designed around the people who make learning happen"
              description="Explore how a shared canvas can support different teams. Availability depends on each institution's configuration and plan."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {audiences.map(({ href, title, description, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-orange/50"
                >
                  <Icon className="mb-4 h-6 w-6 text-orange" aria-hidden="true" />
                  <h2 className="text-lg font-semibold">{title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-orange">
                    Explore solution
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </PageContainer>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

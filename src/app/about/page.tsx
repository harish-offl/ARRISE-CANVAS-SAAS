import Link from "next/link";
import {
  Rocket,
  Target,
  Heart,
  Users,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
} from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import {
  PageHero,
  Section,
  SectionHeading,
  StatGrid,
  CtaSection,
  PageContainer,
} from "../../components/marketing";

const values = [
  {
    icon: Target,
    title: "Learning first",
    description:
      "Every feature we build starts with a simple question: does this help someone learn better?",
  },
  {
    icon: Heart,
    title: "Craft & care",
    description:
      "We sweat the details so that using Arrise Canvas feels calm, clear and dependable.",
  },
  {
    icon: ShieldCheck,
    title: "Trust & privacy",
    description:
      "Institutions trust us with their data, and we treat that responsibility with the utmost respect.",
  },
  {
    icon: Lightbulb,
    title: "Continuous improvement",
    description:
      "We ship often, listen closely and improve relentlessly based on real feedback.",
  },
];

const team = [
  { name: "A. Rivera", role: "Founder & CEO" },
  { name: "M. Chen", role: "Head of Product" },
  { name: "S. Okafor", role: "Lead Engineer" },
  { name: "L. Novak", role: "Head of Customer Success" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="About"
          title="We're building a calmer way to learn"
          description="Arrise Canvas started with a frustration shared by students and faculty everywhere: learning tools that get in the way of learning."
        >
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
          >
            Work with us
            <ArrowRight className="h-4 w-4" />
          </Link>
        </PageHero>

        <Section>
          <PageContainer>
            <StatGrid
              stats={[
                { value: "2026", label: "Founded" },
                { value: "85+", label: "Institutions" },
                { value: "1,200+", label: "Learners" },
                { value: "99.9%", label: "Uptime" },
              ]}
            />
          </PageContainer>
        </Section>

        <Section className="border-y border-border bg-surface/40">
          <PageContainer>
            <div className="grid items-center gap-12 md:grid-cols-2">
              <div>
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange/10 text-orange">
                  <Rocket className="h-6 w-6" />
                </div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Our mission
                </h2>
                <p className="mt-4 leading-relaxed text-muted">
                  To give every institution a single, dependable canvas for
                  teaching and learning — one that respects the time of
                  students and educators alike.
                </p>
                <p className="mt-4 leading-relaxed text-muted">
                  We believe great learning tools should be invisible.
                  Structure, not clutter. Clarity, not chaos. That principle
                  guides everything from our information architecture to the
                  smallest interaction.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value) => (
                  <div
                    key={value.title}
                    className="rounded-lg border border-border bg-surface p-5"
                  >
                    <value.icon className="mb-3 h-6 w-6 text-orange" />
                    <h3 className="text-sm font-semibold">{value.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                      {value.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </PageContainer>
        </Section>

        <Section>
          <PageContainer>
            <SectionHeading
              eyebrow="Our team"
              title="Small team, big ambitions"
              description="A group of educators, designers and engineers who care deeply about learning."
            />
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              {team.map((member) => (
                <div
                  key={member.name}
                  className="rounded-lg border border-border bg-surface p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange/10 text-orange">
                    <Users className="h-7 w-7" />
                  </div>
                  <p className="text-sm font-semibold">{member.name}</p>
                  <p className="mt-1 text-xs text-muted">{member.role}</p>
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

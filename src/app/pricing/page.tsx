import Link from "next/link";
import {
  Check,
  ArrowRight,
  Sparkles,
  Building,
  Landmark,
  GraduationCap,
} from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import {
  PageHero,
  Section,
  SectionHeading,
  CtaSection,
  PageContainer,
} from "../../components/marketing";
import { cn } from "../../lib/utils";

const plans = [
  {
    name: "Student",
    icon: GraduationCap,
    price: "Institution access",
    period: "",
    description: "For learners whose institution uses Arrise Canvas.",
    features: [
      "Access provided by your institution",
      "Role and course access set by authorized staff",
      "Features depend on the institution's plan",
    ],
    cta: { label: "Ask about access", href: "/contact" },
    highlighted: false,
  },
  {
    name: "Institution",
    icon: Building,
    price: "Talk to us",
    period: "",
    description: "For institutions evaluating a connected learning workspace.",
    features: [
      "Discuss institution-specific requirements",
      "Review tenant and role configuration",
      "Agree on plan limits and included features",
    ],
    cta: { label: "Discuss a plan", href: "/contact" },
    highlighted: true,
  },
  {
    name: "Enterprise",
    icon: Landmark,
    price: "Talk to us",
    period: "",
    description: "For larger or multi-campus organizations.",
    features: [
      "Discuss deployment and integration requirements",
      "Review security and operational requirements",
      "Agree on service scope before onboarding",
    ],
    cta: { label: "Contact sales", href: "/contact" },
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Pricing"
          title="Plans shaped around your institution"
          description="Pricing, feature entitlements and usage limits are not configured in this development build. Contact us to discuss institutional requirements."
        />

        <Section>
          <PageContainer>
            <div className="grid gap-6 lg:grid-cols-3">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={cn(
                    "relative flex flex-col rounded-2xl border bg-surface p-6 md:p-8",
                    plan.highlighted
                      ? "border-orange shadow-lg shadow-orange/5"
                      : "border-border"
                  )}
                >
                  {plan.highlighted && (
                    <span                     className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold text-orange">
                      <Sparkles className="h-3 w-3" />
                      Institutional
                    </span>
                  )}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange/10 text-orange">
                      <plan.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-lg font-semibold">{plan.name}</h2>
                  </div>
                  <div className="mb-2 flex items-end gap-1">
                    <span className="text-4xl font-bold tracking-tight">
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span className="pb-1 text-sm text-muted">
                        {plan.period}
                      </span>
                    )}
                  </div>
                  <p className="mb-6 text-sm text-muted">{plan.description}</p>
                  <ul className="mb-8 flex flex-col gap-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={plan.cta.href}
                    className={cn(
                      "mt-auto inline-flex h-11 items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors",
                      plan.highlighted
                        ? "bg-orange text-black hover:bg-orange-hover"
                        : "border border-border text-foreground hover:bg-elevated"
                    )}
                  >
                    {plan.cta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </PageContainer>
        </Section>

        <Section className="border-t border-border">
          <PageContainer>
            <SectionHeading
              eyebrow="Questions"
              title="Not sure which plan fits?"
              description="We'll help you find the right fit for your institution — no pressure."
            />
            <div className="flex justify-center">
              <Link
                href="/contact"
                className="inline-flex h-11 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
              >
                Talk to our team
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </PageContainer>
        </Section>

        <CtaSection />
      </main>
      <Footer />
    </div>
  );
}

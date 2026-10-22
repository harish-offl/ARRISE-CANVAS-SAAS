import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

export function PageContainer({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("container mx-auto max-w-6xl px-4", className)}
      {...props}
    />
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(255,107,0,0.12),transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--hero-gradient-start),var(--hero-gradient-end))] opacity-10" />
      <PageContainer className="relative py-16 md:py-24 text-center">
        <div className="mx-auto max-w-3xl">
          {eyebrow && (
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-orange">
              {eyebrow}
            </p>
          )}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          {description && (
            <p className="mx-auto mt-5 max-w-2xl text-lg text-muted">
              {description}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </div>
      </PageContainer>
    </section>
  );
}

export function Section({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return <section className={cn("py-16 md:py-20", className)} {...props} />;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-2xl",
        align === "center" && "mx-auto text-center"
      )}
    >
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-orange">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-muted">{description}</p>
      )}
    </div>
  );
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-lg border border-border bg-surface p-6 transition-colors hover:border-orange/50">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-orange/10 text-orange">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}

export function CtaSection({
  title = "Explore Arrise Canvas for your institution",
  description = "Talk with our team about the platform concept and your institution's needs.",
  primary = { label: "Contact us", href: "/contact" },
  secondary = { label: "View pricing", href: "/pricing" },
}: {
  title?: string;
  description?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <Section>
      <PageContainer>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-14 text-center md:px-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_0%,rgba(255,107,0,0.14),transparent)]" />
          <div className="relative">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted">{description}</p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={primary.href}
                className="inline-flex h-11 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
              >
                {primary.label}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={secondary.href}
                className="inline-flex h-11 items-center rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-elevated"
              >
                {secondary.label}
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </Section>
  );
}

export function StatGrid({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.label} className="text-center">
          <div className="text-3xl font-bold text-orange md:text-4xl">
            {stat.value}
          </div>
          <div className="mt-1 text-sm text-muted">{stat.label}</div>
        </div>
      ))}
    </div>
  );
}

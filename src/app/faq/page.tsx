"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowRight } from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import {
  PageHero,
  Section,
  CtaSection,
  PageContainer,
} from "../../components/marketing";

const faqs = [
  {
    question: "What is Arrise Canvas?",
    answer:
      "Arrise Canvas is presented here as an educational SaaS product concept for learning, academic management and institutional workflows. This website is a static preview, not a live institutional service.",
  },
  {
    question: "Who is it for?",
    answer:
      "The product concept is intended for students, mentors, faculty and staff, department heads, institution administrators and finance teams at educational institutions.",
  },
  {
    question: "Can I upload materials on this website?",
    answer:
      "No. This site is a static marketing and product preview. It does not upload or store files.",
  },
  {
    question: "How are quizzes graded?",
    answer:
      "Assessment and grading workflows are part of the product concept. Quiz submission and grading are not available on this static site.",
  },
  {
    question: "Can we manage roles and permissions?",
    answer:
      "The preview describes proposed role boundaries. This website does not authenticate users or enforce role, institution or subscription permissions.",
  },
  {
    question: "How does pricing work?",
    answer:
      "Plans, pricing and feature entitlements have not been configured. Contact the team to discuss institution requirements.",
  },
  {
    question: "Do you offer support and onboarding?",
    answer:
      "Support and onboarding arrangements are not configured. Use the contact page to discuss requirements.",
  },
  {
    question: "Does this preview save data or create an account?",
    answer:
      "The public product preview does not save form data, create institution workspaces or provision roles. Authentication and database integrations need to be configured separately.",
  },
];

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-lg border border-border bg-surface">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={open}
      >
        <span className="text-base font-medium text-foreground">
          {question}
        </span>
        <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-orange/10 text-orange">
          {open ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
      </button>
      {open && (
        <div className="border-t border-border px-5 py-4 text-sm leading-relaxed text-muted">
          {answer}
        </div>
      )}
    </div>
  );
}

export default function FaqPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="FAQ"
          title="Frequently asked questions"
          description="Learn what this static Arrise Canvas product preview shows, and what still requires configuration."
        >
          <Link
            href="/contact"
            className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-6 text-sm font-medium text-foreground transition-colors hover:bg-elevated"
          >
            Contact support
            <ArrowRight className="h-4 w-4" />
          </Link>
        </PageHero>

        <Section>
          <PageContainer className="max-w-3xl">
            <div className="flex flex-col gap-3">
              {faqs.map((faq) => (
                <FaqItem key={faq.question} {...faq} />
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

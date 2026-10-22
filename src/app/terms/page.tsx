import { Navbar, Footer } from "../../components/layout/public-layout";
import { PageContainer, PageHero, Section } from "../../components/marketing";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Terms"
          title="Terms of service"
          description="The terms for this service must be finalized before production use."
        />
        <Section>
          <PageContainer>
            <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6">
              <p className="leading-relaxed text-muted">
                This page is a placeholder, not a binding terms of service. The
                service owner must publish reviewed terms covering accounts,
                acceptable use, institutional responsibilities, subscriptions,
                service availability, termination and applicable law.
              </p>
            </div>
          </PageContainer>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

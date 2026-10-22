import { Navbar, Footer } from "../../components/layout/public-layout";
import { PageContainer, PageHero, Section } from "../../components/marketing";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Privacy"
          title="Privacy notice"
          description="Our formal privacy notice must be completed and reviewed before production use."
        />
        <Section>
          <PageContainer>
            <div className="mx-auto max-w-3xl rounded-lg border border-border bg-surface p-6">
              <p className="leading-relaxed text-muted">
                This page is a placeholder, not a complete privacy policy. The
                service owner must publish accurate information about data
                collection, use, retention, subprocessors, user rights and
                contact details for the jurisdictions in which the service
                operates.
              </p>
            </div>
          </PageContainer>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

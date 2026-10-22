import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { Navbar, Footer } from "../../components/layout/public-layout";
import { PageContainer, PageHero, Section } from "../../components/marketing";

export default function ContactPage() {
  const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <PageHero
          eyebrow="Contact"
          title="Let's talk about your institution"
          description="Tell us what your teams need from a connected learning workspace."
        />
        <Section>
          <PageContainer>
            <div className="mx-auto max-w-xl rounded-lg border border-border bg-surface p-8 text-center">
              <Mail className="mx-auto mb-4 h-8 w-8 text-orange" aria-hidden="true" />
              {contactEmail ? (
                <>
                  <h2 className="text-xl font-semibold">Get in touch</h2>
                  <p className="mt-2 text-sm text-muted">
                    Email our team to discuss your institution&apos;s needs.
                  </p>
                  <a
                    href={`mailto:${contactEmail}`}
                    className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-orange px-6 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
                  >
                    Email us
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </>
              ) : (
                <>
                  <h2 className="text-xl font-semibold">Contact is being set up</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    The team contact address has not been configured yet. Set
                    NEXT_PUBLIC_CONTACT_EMAIL to publish the correct address.
                  </p>
                </>
              )}
              <Link
                href="/pricing"
                className="mt-5 inline-block text-sm font-medium text-orange hover:underline"
              >
                Explore pricing
              </Link>
            </div>
          </PageContainer>
        </Section>
      </main>
      <Footer />
    </div>
  );
}

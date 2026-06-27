import { createFileRoute } from "@tanstack/react-router";
import { CREAM, PageHeader, Footer } from "@/components/landing";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — BidPilot AI" },
      { name: "description", content: "The terms that govern your use of BidPilot AI." },
      { property: "og:title", content: "Terms of Service — BidPilot AI" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

const sections: { h: string; body: string }[] = [
  {
    h: "1. Acceptance of terms",
    body:
      "By accessing or using BidPilot AI, you agree to be bound by these Terms of Service. If you do not agree, you may not use the service.",
  },
  {
    h: "2. Account",
    body:
      "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. You must provide accurate information when registering.",
  },
  {
    h: "3. Acceptable use",
    body:
      "You agree not to misuse BidPilot AI: no unlawful activity, no spamming, no attempts to disrupt the service, and no use that violates a third party's rights.",
  },
  {
    h: "4. AI-generated content",
    body:
      "BidPilot AI uses machine learning to generate proposal drafts. You are responsible for reviewing all generated content before sending it to clients. We do not guarantee accuracy or fitness for any specific use.",
  },
  {
    h: "5. Subscriptions and billing",
    body:
      "Paid plans renew automatically until cancelled. You can cancel at any time from your account settings; access continues until the end of the current billing period.",
  },
  {
    h: "6. Intellectual property",
    body:
      "You retain ownership of content you create and proposals you send. BidPilot AI retains all rights to the platform, brand, and underlying technology.",
  },
  {
    h: "7. Termination",
    body:
      "We may suspend or terminate accounts that violate these terms. You may stop using the service at any time.",
  },
  {
    h: "8. Disclaimers",
    body:
      "The service is provided 'as is' without warranties of any kind. To the maximum extent permitted by law, BidPilot AI disclaims all implied warranties.",
  },
  {
    h: "9. Limitation of liability",
    body:
      "BidPilot AI will not be liable for indirect, incidental, or consequential damages arising out of your use of the service.",
  },
  {
    h: "10. Changes",
    body:
      "We may modify these terms from time to time. Continued use of the service after changes take effect constitutes acceptance.",
  },
  {
    h: "11. Contact",
    body: "Questions about these terms? Email support@bidpilotai.com.",
  },
];

function TermsPage() {
  return (
    <div className="bg-black" style={{ color: CREAM }}>
      <PageHeader eyebrow="Legal" title="Terms of Service" />
      <section className="bg-black px-4 pb-24 md:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="text-xs uppercase tracking-[0.2em] text-cream/50">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.h}>
                <h2 className="text-xl font-medium text-cream md:text-2xl">{s.h}</h2>
                <p className="mt-3 text-sm leading-relaxed text-cream/70 md:text-base">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

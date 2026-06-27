import { createFileRoute } from "@tanstack/react-router";
import { CREAM, PageHeader, Footer } from "@/components/landing";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BidPilot AI" },
      { name: "description", content: "How BidPilot AI collects, uses, and protects your data." },
      { property: "og:title", content: "Privacy Policy — BidPilot AI" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

const sections: { h: string; body: string }[] = [
  {
    h: "1. Introduction",
    body:
      "This Privacy Policy describes how BidPilot AI ('we', 'us', 'our') collects, uses, and shares information when you use our website and services. By using BidPilot AI, you agree to the practices described here.",
  },
  {
    h: "2. Information we collect",
    body:
      "We collect information you provide directly (account details, leads, proposals, billing) and information collected automatically (device, log, and usage data). We also use cookies and similar technologies to operate and improve the product.",
  },
  {
    h: "3. How we use information",
    body:
      "We use information to operate the service, generate AI proposals on your behalf, personalize your experience, send transactional emails, respond to support requests, and improve product quality.",
  },
  {
    h: "4. Sharing information",
    body:
      "We do not sell your personal information. We share data with trusted processors (hosting, analytics, AI providers) under contractual safeguards, and when required by law.",
  },
  {
    h: "5. Data retention",
    body:
      "We retain your information for as long as your account is active and as needed to provide the service. You can request deletion of your account and associated data at any time.",
  },
  {
    h: "6. Security",
    body:
      "We use industry-standard encryption in transit and at rest, role-based access controls, and continuous monitoring to safeguard your data.",
  },
  {
    h: "7. Your rights",
    body:
      "Depending on your location, you may have rights to access, correct, export, or delete your personal information. Contact us at support@bidpilotai.com to exercise these rights.",
  },
  {
    h: "8. Changes to this policy",
    body:
      "We may update this policy from time to time. We will notify you of material changes by email or in-product notice.",
  },
  {
    h: "9. Contact us",
    body:
      "Questions about this Privacy Policy? Email support@bidpilotai.com and we'll get back to you promptly.",
  },
];

function PrivacyPage() {
  return (
    <div className="bg-black" style={{ color: CREAM }}>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
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

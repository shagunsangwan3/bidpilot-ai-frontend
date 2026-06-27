import { createFileRoute } from "@tanstack/react-router";
import { CREAM, PageHeader, Pricing, Waitlist, CTA, Footer } from "@/components/landing";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — BidPilot AI" },
      { name: "description", content: "Simple plans that scale with your freelance business." },
      { property: "og:title", content: "Pricing — BidPilot AI" },
      { property: "og:url", content: "/pricing" },
    ],
    links: [{ rel: "canonical", href: "/pricing" }],
  }),
  component: PricingPage,
});

function PricingPage() {
  return (
    <div className="bg-black" style={{ color: CREAM }}>
      <PageHeader eyebrow="Pricing" title="Simple plans that scale with you." />
      <Pricing showHeader={false} />
      <Waitlist />
      <CTA />
      <Footer />
    </div>
  );
}

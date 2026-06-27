import { createFileRoute } from "@tanstack/react-router";
import { Hero, Features, HowItWorks, Waitlist, Pricing, CTA, Footer } from "@/components/landing";

export const Route = createFileRoute("/")(  {
  head: () => ({
    meta: [
      { title: "BidPilot AI — AI Proposal Generator for Freelancers" },
      {
        name: "description",
        content:
          "Generate winning freelance proposals, manage leads, and grow your business with AI-powered automation.",
      },
      { property: "og:title", content: "BidPilot AI — AI Proposal Generator for Freelancers" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <div className="bg-black">
      <Hero />
      <Features />
      <HowItWorks />
      <Waitlist />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}

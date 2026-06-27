import { createFileRoute } from "@tanstack/react-router";
import { CREAM, PageHeader, Features, HowItWorks, CTA, Footer } from "@/components/landing";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — BidPilot AI" },
      {
        name: "description",
        content: "Everything BidPilot AI gives freelancers to manage leads and generate winning proposals.",
      },
    ],
  }),
  component: FeaturesPage,
});

function FeaturesPage() {
  return (
    <div className="bg-black" style={{ color: CREAM }}>
      <PageHeader eyebrow="Features" title="Everything you need to win." />
      <Features showHeader={false} />
      <HowItWorks />
      <CTA />
      <Footer />
    </div>
  );
}

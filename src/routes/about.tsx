import { createFileRoute } from "@tanstack/react-router";
import { CREAM, PageHeader, FadeIn, Footer, CTA } from "@/components/landing";
import { Target, Rocket, Heart, Map } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — BidPilot AI" },
      {
        name: "description",
        content:
          "BidPilot AI helps freelancers save time, manage leads, and generate high-converting proposals using artificial intelligence.",
      },
      { property: "og:title", content: "About — BidPilot AI" },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

const blocks = [
  {
    icon: Heart,
    title: "Vision",
    body:
      "A world where every freelancer has the tools of a full sales team — without the overhead. We believe great work should win, and writing about that work shouldn't get in the way.",
  },
  {
    icon: Target,
    title: "Mission",
    body:
      "Help freelancers spend less time writing proposals and more time delivering great work — by automating the busywork around lead capture, follow-up, and proposal generation.",
  },
  {
    icon: Rocket,
    title: "Why we built BidPilot",
    body:
      "We were freelancers ourselves. Every job board search ended in the same dread: another cold proposal, another blank page. BidPilot exists so the next 'I'll get to it tonight' becomes 'already sent.'",
  },
  {
    icon: Map,
    title: "Roadmap",
    body:
      "Next up: Chrome extension for one-click lead capture, multi-language proposals, team workspaces for small agencies, and a public API. Built in the open with our early-access community.",
  },
];

function AboutPage() {
  return (
    <div className="bg-black" style={{ color: CREAM }}>
      <PageHeader eyebrow="About" title="Built by freelancers, for freelancers." />

      <section className="bg-black px-4 pb-16 md:px-6">
        <div className="mx-auto max-w-3xl">
          <FadeIn>
            <p className="text-base leading-relaxed text-cream/75 md:text-lg">
              BidPilot AI helps freelancers save time, manage leads, and generate high-converting
              proposals using artificial intelligence. One workspace replaces a spreadsheet, three
              tabs, and a half-written proposal you never finished.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#0a0a0a] px-4 py-20 md:px-6 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">
          {blocks.map((b, i) => {
            const Icon = b.icon;
            return (
              <FadeIn key={b.title} delay={i * 0.08}>
                <div className="h-full rounded-2xl border border-cream/10 bg-[#141414] p-8">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-cream/10 text-cream">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h2 className="mt-6 text-2xl font-medium text-cream">{b.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-cream/65">{b.body}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <CTA />
      <Footer />
    </div>
  );
}

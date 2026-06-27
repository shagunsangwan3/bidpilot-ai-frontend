import { Link } from "@tanstack/react-router";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  ArrowRight,
  Check,
  Users,
  Sparkles,
  BarChart3,
  PlusCircle,
  Wand2,
  Trophy,
  Github,
  Linkedin,
  PlayCircle,
  Mail,
} from "lucide-react";

export const CREAM = "#E1E0CC";
const EASE = [0.16, 1, 0.3, 1] as const;

/* -------------------- shared primitives -------------------- */

export function WordsPullUp({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((w, i) => (
        <span key={i} className="overflow-hidden inline-flex">
          <motion.span
            initial={{ y: 24, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: delay + i * 0.08, ease: EASE }}
            className="inline-block"
          >
            {w}
            {i < words.length - 1 && "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ y: 24, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* -------------------- Top Nav (shared across marketing pages) -------------------- */

export function SiteNav() {
  const items = [
    { label: "Features", to: "/features" as const },
    { label: "Pricing", to: "/pricing" as const },
    { label: "About", to: "/about" as const },
    { label: "Contact", to: "/contact" as const },
    { label: "Sign in", to: "/login" as const },
  ];
  return (
    <nav className="absolute left-1/2 top-0 z-20 -translate-x-1/2 rounded-b-2xl bg-black px-4 py-2 md:rounded-b-3xl md:px-8">
      <ul className="flex items-center gap-3 sm:gap-5 md:gap-10">
        <li>
          <Link to="/" className="text-cream text-xs font-medium tracking-wide sm:text-sm">
            BidPilot
          </Link>
        </li>
        {items.map((item) => (
          <li key={item.label}>
            <Link
              to={item.to}
              className="text-[10px] text-cream/70 transition-colors hover:text-cream sm:text-xs md:text-sm"
              activeProps={{ className: "text-cream" }}
            >
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            to="/register"
            className="rounded-full bg-cream px-3 py-1 text-[10px] font-medium text-black transition-opacity hover:opacity-90 sm:text-xs md:text-sm"
          >
            Start Free
          </Link>
        </li>
      </ul>
    </nav>
  );
}

/* -------------------- Hero -------------------- */

export function Hero() {
  return (
    <section className="h-screen w-full p-4 md:p-6">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/70" />

        <SiteNav />

        <div className="absolute inset-0 flex flex-col justify-end px-5 pb-10 md:px-12 md:pb-16">
          <FadeIn delay={0.1}>
            <span className="inline-block rounded-full border border-cream/25 bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-cream/80 backdrop-blur sm:text-xs">
              AI for freelancers
            </span>
          </FadeIn>

          <h1
            className="mt-5 max-w-[18ch] font-medium leading-[0.92] tracking-[-0.04em] text-[10vw] sm:text-[8vw] md:text-[6.2vw] lg:text-[5.4vw]"
            style={{ color: CREAM }}
          >
            <WordsPullUp text="Win More Freelance" />
            <br />
            <WordsPullUp text="Clients With AI" delay={0.25} />
          </h1>

          <FadeIn delay={0.6} className="mt-6 max-w-2xl">
            <p className="text-sm leading-relaxed text-cream/75 md:text-base">
              Generate personalized proposals, manage leads, track opportunities, and grow your
              freelance business from one intelligent workspace.
            </p>
          </FadeIn>

          <FadeIn delay={0.75} className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/register"
              className="group inline-flex items-center gap-2 rounded-full bg-cream py-1.5 pl-5 pr-1.5 text-sm font-medium text-black transition-all hover:gap-3 sm:text-base"
            >
              Start Free
              <span className="grid h-9 w-9 place-items-center rounded-full bg-black transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight className="h-4 w-4" style={{ color: CREAM }} />
              </span>
            </Link>
            <Link
              to="/features"
              className="group inline-flex items-center gap-2 rounded-full border border-cream/30 px-5 py-2.5 text-sm font-medium text-cream backdrop-blur transition-colors hover:bg-cream/10 sm:text-base"
            >
              <PlayCircle className="h-4 w-4" />
              See Features
            </Link>
          </FadeIn>

          <FadeIn delay={0.95} className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-[11px] text-cream/60 sm:text-xs">
            <span>No credit card required</span>
            <span>·</span>
            <span>Free forever plan</span>
            <span>·</span>
            <span>Built for freelancers worldwide</span>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* -------------------- Marketing page header (non-hero pages) -------------------- */

export function PageHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <section className="relative bg-black px-4 pt-32 pb-16 md:px-6 md:pt-40 md:pb-24">
      <SiteNav />
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70 sm:text-xs">{eyebrow}</p>
        <h1
          className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          style={{ color: CREAM }}
        >
          <WordsPullUp text={title} />
        </h1>
      </div>
    </section>
  );
}

/* -------------------- Features -------------------- */

type Feature = { title: string; desc: string; items: string[]; icon: typeof Users };

const features: Feature[] = [
  {
    title: "Lead Management",
    desc: "Track prospects from Upwork, Freelancer, LinkedIn, email, and direct referrals in one organized pipeline.",
    items: [
      "Track Upwork, Freelancer, LinkedIn & direct clients",
      "Status management",
      "Follow-up reminders",
      "Opportunity forecasting",
    ],
    icon: Users,
  },
  {
    title: "AI Proposal Generator",
    desc: "Generate personalized proposals tailored to each client and project in seconds.",
    items: [
      "Personalized proposal generation",
      "Tone customization",
      "Proposal templates",
      "Instant regeneration",
    ],
    icon: Sparkles,
  },
  {
    title: "Freelancer Analytics",
    desc: "Measure performance and identify opportunities to grow revenue.",
    items: [
      "Win-rate tracking",
      "Revenue forecasting",
      "Proposal performance",
      "Client insights",
    ],
    icon: BarChart3,
  },
];

function FeatureCard({ f, i }: { f: Feature; i: number }) {
  const Icon = f.icon;
  return (
    <FadeIn delay={i * 0.1}>
      <div className="group flex h-full flex-col rounded-2xl border border-cream/10 bg-[#161616] p-6 transition-colors hover:border-cream/25 md:p-8">
        <span className="grid h-11 w-11 place-items-center rounded-lg bg-cream/10 text-cream">
          <Icon className="h-5 w-5" />
        </span>
        <h3 className="mt-6 text-xl font-medium text-cream md:text-2xl">{f.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-cream/60">{f.desc}</p>
        <ul className="mt-6 space-y-2.5 border-t border-cream/10 pt-5">
          {f.items.map((it) => (
            <li key={it} className="flex items-start gap-2 text-sm text-cream/70">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-cream" />
              <span>{it}</span>
            </li>
          ))}
        </ul>
      </div>
    </FadeIn>
  );
}

export function Features({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="relative bg-black px-4 py-24 md:px-6 md:py-32">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.12]" />
      <div className="relative mx-auto max-w-7xl">
        {showHeader && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70 sm:text-xs">
              Everything you need
            </p>
            <h2
              className="mt-4 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
              style={{ color: CREAM }}
            >
              <WordsPullUp text="One workspace to win more work." />
            </h2>
          </div>
        )}

        <div className={`${showHeader ? "mt-16" : ""} grid gap-5 md:grid-cols-3`}>
          {features.map((f, i) => (
            <FeatureCard key={f.title} f={f} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- How it works -------------------- */

const steps = [
  { n: "01", icon: PlusCircle, title: "Add Leads", desc: "Capture opportunities from freelance marketplaces and direct clients." },
  { n: "02", icon: Wand2, title: "Generate Proposals", desc: "Use AI to create personalized proposals in seconds." },
  { n: "03", icon: Trophy, title: "Win More Clients", desc: "Track progress, follow up, and close more deals." },
];

export function HowItWorks() {
  return (
    <section className="bg-[#0a0a0a] px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70 sm:text-xs">How it works</p>
          <h2 className="mt-4 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl" style={{ color: CREAM }}>
            <WordsPullUp text="Three steps to your next deal." />
          </h2>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <FadeIn key={s.n} delay={i * 0.1}>
                <div className="relative h-full rounded-2xl border border-cream/10 bg-[#141414] p-8">
                  <span className="font-serif text-5xl italic text-cream/30">{s.n}</span>
                  <Icon className="mt-6 h-6 w-6 text-cream" />
                  <h3 className="mt-4 text-xl font-medium text-cream md:text-2xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-cream/60">{s.desc}</p>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------- Waitlist (replaces fake testimonials) -------------------- */

export function Waitlist() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) return;
    // Wire to FastAPI: POST /waitlist
    setSubmitted(true);
  }

  return (
    <section className="bg-black px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70 sm:text-xs">
          Early access
        </p>
        <h2
          className="mt-4 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl"
          style={{ color: CREAM }}
        >
          <WordsPullUp text="Early access is now open." />
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/70 md:text-base">
          Join the first group of freelancers using BidPilot AI. Get early invites, lifetime pricing,
          and a direct line to the team.
        </p>

        <FadeIn delay={0.2}>
          {submitted ? (
            <div className="mx-auto mt-10 max-w-md rounded-full border border-cream/20 bg-cream/5 px-6 py-3 text-sm text-cream">
              You're on the list. We'll be in touch shortly.
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="mx-auto mt-10 flex w-full max-w-md flex-col gap-2 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cream/50" />
                <input
                  type="email"
                  required
                  placeholder="you@studio.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 w-full rounded-full border border-cream/20 bg-[#141414] pl-11 pr-5 text-sm text-cream placeholder:text-cream/40 outline-none focus:border-cream/50"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center rounded-full bg-cream px-6 text-sm font-medium text-black transition-opacity hover:opacity-90"
              >
                Join waitlist
              </button>
            </form>
          )}
          <p className="mt-3 text-[11px] text-cream/50">No spam. Unsubscribe any time.</p>
        </FadeIn>
      </div>
    </section>
  );
}

/* -------------------- Pricing -------------------- */

const plans = [
  {
    name: "Starter",
    price: "₹0",
    cadence: "forever",
    cta: "Get Started",
    features: ["20 AI proposals / month", "50 leads", "Basic analytics"],
    highlighted: false,
  },
  {
    name: "Pro",
    price: "₹499",
    cadence: "/month",
    cta: "Start Pro",
    features: [
      "Unlimited proposals",
      "Unlimited leads",
      "Advanced analytics",
      "Proposal templates",
    ],
    highlighted: true,
  },
  {
    name: "Agency",
    price: "₹1,499",
    cadence: "/month",
    cta: "Contact Sales",
    features: ["Team collaboration", "API access", "Advanced reporting", "Priority support"],
    highlighted: false,
  },
];

export function Pricing({ showHeader = true }: { showHeader?: boolean }) {
  return (
    <section className="bg-[#0a0a0a] px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        {showHeader && (
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70 sm:text-xs">Pricing</p>
            <h2 className="mt-4 text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl md:text-5xl" style={{ color: CREAM }}>
              <WordsPullUp text="Simple plans that scale with you." />
            </h2>
          </div>
        )}

        <div className={`${showHeader ? "mt-16" : ""} grid gap-5 md:grid-cols-3`}>
          {plans.map((p, i) => (
            <FadeIn key={p.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                  p.highlighted ? "border-cream bg-cream text-black" : "border-cream/10 bg-[#141414] text-cream"
                }`}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-black px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-cream">
                    Most Popular
                  </span>
                )}
                <p className="text-sm font-medium">{p.name}</p>
                <p className="mt-4 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-medium tracking-tight">{p.price}</span>
                  <span className={`text-sm ${p.highlighted ? "text-black/60" : "text-cream/60"}`}>{p.cadence}</span>
                </p>
                <ul className={`mt-8 space-y-3 border-t pt-6 ${p.highlighted ? "border-black/15" : "border-cream/10"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/register"
                  className={`mt-10 inline-flex h-11 items-center justify-center rounded-full text-sm font-medium transition-opacity hover:opacity-90 ${
                    p.highlighted ? "bg-black text-cream" : "bg-cream text-black"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------- CTA + Footer -------------------- */

export function CTA() {
  return (
    <section className="bg-black px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[10px] uppercase tracking-[0.25em] text-cream/70 sm:text-xs">Ready when you are</p>
        <h3 className="mt-4 text-3xl font-medium leading-[1.05] sm:text-4xl md:text-5xl" style={{ color: CREAM }}>
          <WordsPullUp text="Your next client is one proposal away." />
        </h3>
        <div className="mt-10 flex justify-center">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-cream py-1.5 pl-5 pr-1.5 text-base font-medium text-black transition-all hover:gap-3"
          >
            Start Free
            <span className="grid h-10 w-10 place-items-center rounded-full bg-black transition-transform group-hover:scale-110">
              <ArrowRight className="h-4 w-4" style={{ color: CREAM }} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

type FooterLink =
  | { label: string; to: "/" | "/features" | "/pricing" | "/login" | "/register" | "/about" | "/contact" | "/privacy" | "/terms" }
  | { label: string; href: string };

export function Footer() {
  const cols: { title: string; links: FooterLink[] }[] = [
    {
      title: "Product",
      links: [
        { label: "Features", to: "/features" },
        { label: "Pricing", to: "/pricing" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", to: "/about" },
        { label: "Contact", to: "/contact" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", to: "/privacy" },
        { label: "Terms of Service", to: "/terms" },
      ],
    },
  ];

  return (
    <footer className="border-t border-cream/10 bg-black px-4 py-14 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-5">
        <div className="md:col-span-2">
          <Link to="/" className="font-display text-xl font-medium text-cream">BidPilot AI</Link>
          <p className="mt-3 max-w-xs text-sm text-cream/60">
            The intelligent workspace for freelancers who want to win more clients.
          </p>
          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="grid h-9 w-9 place-items-center rounded-full border border-cream/15 text-cream/70 transition-colors hover:border-cream/40 hover:text-cream"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-cream/50">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.label}>
                  {"to" in l ? (
                    <Link to={l.to} className="text-sm text-cream/75 hover:text-cream">
                      {l.label}
                    </Link>
                  ) : (
                    <a href={l.href} className="text-sm text-cream/75 hover:text-cream">
                      {l.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto mt-12 flex max-w-7xl items-center justify-between border-t border-cream/10 pt-6">
        <p className="text-xs text-cream/50">© {new Date().getFullYear()} BidPilot AI. All rights reserved.</p>
        <p className="text-xs text-cream/50">Built for freelancers, everywhere.</p>
      </div>
    </footer>
  );
}

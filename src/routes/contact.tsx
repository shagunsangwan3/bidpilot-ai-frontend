import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CREAM, PageHeader, FadeIn, Footer } from "@/components/landing";
import { Mail, MapPin, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — BidPilot AI" },
      {
        name: "description",
        content: "Get in touch with the BidPilot AI team. We'd love to hear from you.",
      },
      { property: "og:title", content: "Contact — BidPilot AI" },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

const inputCls =
  "h-11 w-full rounded-lg border border-cream/15 bg-[#141414] px-4 text-sm text-cream placeholder:text-cream/40 outline-none transition-colors focus:border-cream/50";

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Wire to FastAPI: POST /contact
    setSent(true);
  }

  return (
    <div className="bg-black" style={{ color: CREAM }}>
      <PageHeader eyebrow="Contact" title="Let's talk." />

      <section className="bg-black px-4 pb-24 md:px-6">
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.4fr]">
          <FadeIn>
            <div className="rounded-2xl border border-cream/10 bg-[#0f0f0f] p-8">
              <h2 className="text-xl font-medium text-cream">Reach the team</h2>
              <p className="mt-3 text-sm leading-relaxed text-cream/65">
                Questions about features, billing, or partnerships? Send us a note — we read every
                message.
              </p>

              <ul className="mt-8 space-y-5 text-sm">
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 text-cream/70" />
                  <a href="mailto:support@bidpilotai.com" className="text-cream/85 hover:text-cream">
                    support@bidpilotai.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MessageSquare className="mt-0.5 h-4 w-4 text-cream/70" />
                  <span className="text-cream/85">Typical reply within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 text-cream/70" />
                  <span className="text-cream/85">Remote-first · Worldwide</span>
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <form
              onSubmit={onSubmit}
              className="rounded-2xl border border-cream/10 bg-[#0f0f0f] p-8"
            >
              {sent ? (
                <div className="grid min-h-[300px] place-items-center text-center">
                  <div>
                    <p className="font-display text-2xl text-cream">Message sent.</p>
                    <p className="mt-2 text-sm text-cream/65">We'll get back to you shortly.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="block">
                      <span className="mb-1.5 block text-xs uppercase tracking-wider text-cream/60">
                        Name
                      </span>
                      <input
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputCls}
                        placeholder="Jane Doe"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1.5 block text-xs uppercase tracking-wider text-cream/60">
                        Email
                      </span>
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputCls}
                        placeholder="you@studio.com"
                      />
                    </label>
                  </div>
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-xs uppercase tracking-wider text-cream/60">
                      Subject
                    </span>
                    <input
                      required
                      value={form.subject}
                      onChange={(e) => setForm({ ...form, subject: e.target.value })}
                      className={inputCls}
                      placeholder="How can we help?"
                    />
                  </label>
                  <label className="mt-4 block">
                    <span className="mb-1.5 block text-xs uppercase tracking-wider text-cream/60">
                      Message
                    </span>
                    <textarea
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputCls} h-auto resize-none py-3`}
                      placeholder="Tell us a bit about what you're working on…"
                    />
                  </label>
                  <button
                    type="submit"
                    className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-full bg-cream px-6 text-sm font-medium text-black transition-opacity hover:opacity-90"
                  >
                    Send message
                  </button>
                </>
              )}
            </form>
          </FadeIn>
        </div>
      </section>

      <Footer />
    </div>
  );
}

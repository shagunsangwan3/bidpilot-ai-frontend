import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, inputCls } from "@/components/AuthLayout";
import { Sparkles, Copy, RefreshCw, Check, Save } from "lucide-react";

export const Route = createFileRoute("/proposals")({
  head: () => ({ meta: [{ title: "Proposal Generator · BidPilot AI" }] }),
  component: Proposals,
});

type Tone = "Professional" | "Friendly" | "Premium" | "Technical";
const tones: Tone[] = ["Professional", "Friendly", "Premium", "Technical"];

function localGenerate(title: string, desc: string, budget: string, tone: Tone) {
  const role = title || "the role";
  const b = budget || "your budget";
  const opener: Record<Tone, string> = {
    Professional: `Hello,\n\nThank you for sharing the brief for "${role}". I've reviewed the details carefully and I'm confident I can deliver on this project.`,
    Friendly: `Hey there!\n\nLove what you're building. I read through the "${role}" brief and I'd genuinely enjoy working on this with you.`,
    Premium: `Greetings,\n\nAfter a careful read of the "${role}" brief, I see a clear opportunity to deliver an exceptional outcome — crafted with the care your project deserves.`,
    Technical: `Hi,\n\nI've parsed the requirements for "${role}". Below is a concrete plan with milestones, deliverables, and acceptance criteria.`,
  };
  return `${opener[tone]}

${desc ? `Context I picked up: ${desc.slice(0, 160)}…` : "Based on the brief, here's how I'd approach the work:"}

How I'd approach it:
1. Discovery (Day 1–2) — kickoff call + audit; lock scope, surface risks.
2. Build (Day 3–10) — iterative delivery with progress notes every 48h.
3. Handoff (Day 11) — documentation, 30-day support, written playbook.

Investment: ${b}. Timeline: 2 weeks from kickoff.

A few quick questions for our first call: target launch date, final approver, and brand assets to work from.

Happy to share three recent case studies that mirror this project. Open for a 20-minute call Tue or Wed?

Best,
Alex`;
}

function Proposals() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [budget, setBudget] = useState("");
  const [tone, setTone] = useState<Tone>("Professional");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleGenerate() {
    setLoading(true);
    setOutput("");
    setSaved(false);
    try {
      // TODO: wire to FastAPI
      // const res = await api.proposal.generate({ job_title: title, job_description: desc, budget, tone });
      // setOutput(res.proposal);
      await new Promise((r) => setTimeout(r, 900));
      setOutput(localGenerate(title, desc, budget, tone));
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  async function save() {
    // TODO: await api.proposal.save({ title, content: output });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  return (
    <AppShell title="Proposal Generator">
      <div className="grid gap-6 lg:grid-cols-5">
        <div className="card-elevated rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-brand" />
            <p className="text-sm font-medium">Brief</p>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Paste the job details. BidPilot crafts a proposal in your voice.
          </p>

          <div className="mt-6 space-y-4">
            <Field label="Job title">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Senior React developer for fintech dashboard"
                className={inputCls}
              />
            </Field>
            <Field label="Job description">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={8}
                placeholder="We're a 12-person fintech team rebuilding our internal dashboard…"
                className={`${inputCls} h-auto resize-y py-3 leading-relaxed`}
              />
            </Field>
            <Field label="Budget">
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="$8,000 — $12,000"
                className={inputCls}
              />
            </Field>
            <div>
              <span className="mb-1.5 block text-xs font-medium text-muted-foreground">
                Proposal tone
              </span>
              <div className="flex flex-wrap gap-2">
                {tones.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTone(t)}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      tone === t
                        ? "border-brand bg-brand/10 text-brand"
                        : "border-border bg-card text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md bg-brand text-sm font-medium text-brand-foreground shadow-[0_8px_24px_-8px_var(--brand)] hover:opacity-95 disabled:opacity-60"
            >
              {loading ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" /> Generating…
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" /> Generate Proposal
                </>
              )}
            </button>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="card-elevated relative min-h-[500px] rounded-xl">
            <div className="flex items-center justify-between border-b border-border px-6 py-4">
              <div>
                <p className="text-sm font-medium">Generated proposal</p>
                <p className="text-xs text-muted-foreground">
                  {output ? `Tone: ${tone} · Ready to send` : "Fill the brief and hit generate"}
                </p>
              </div>
              {output && (
                <div className="flex gap-2">
                  <button
                    onClick={handleGenerate}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs hover:bg-accent"
                  >
                    <RefreshCw className="h-3.5 w-3.5" /> Regenerate
                  </button>
                  <button
                    onClick={save}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs hover:bg-accent"
                  >
                    {saved ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                    {saved ? "Saved" : "Save"}
                  </button>
                  <button
                    onClick={copy}
                    className="inline-flex h-8 items-center gap-1.5 rounded-md bg-foreground px-3 text-xs font-medium text-background hover:opacity-90"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
              )}
            </div>

            <div className="p-6">
              {loading && (
                <div className="space-y-3">
                  {[100, 92, 88, 95, 70, 84, 60].map((w, i) => (
                    <div
                      key={i}
                      className="h-3.5 animate-pulse rounded bg-muted"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              )}
              {!loading && output && (
                <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-foreground/90">
                  {output}
                </pre>
              )}
              {!loading && !output && (
                <div className="grid place-items-center py-20 text-center">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/60">
                    <Sparkles className="h-5 w-5 text-brand" />
                  </div>
                  <p className="mt-4 text-sm font-medium">No proposal yet</p>
                  <p className="mt-1 max-w-sm text-xs text-muted-foreground">
                    Drop in the job title, paste the description, set a budget and tone — we'll
                    handle the rest.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

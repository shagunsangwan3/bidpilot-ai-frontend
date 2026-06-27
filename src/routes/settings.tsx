import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Field, inputCls } from "@/components/AuthLayout";
import { useState } from "react";
import { User, Bell, CreditCard, KeyRound } from "lucide-react";

export const Route = createFileRoute("/settings")({
  head: () => ({ meta: [{ title: "Settings · BidPilot AI" }] }),
  component: Settings,
});

type Tab = "profile" | "notifications" | "subscription" | "api";

const tabs: { id: Tab; label: string; icon: typeof User }[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "subscription", label: "Subscription", icon: CreditCard },
  { id: "api", label: "API Keys", icon: KeyRound },
];

function Toggle({ on, onChange }: { on: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!on)}
      className={`relative h-5 w-9 rounded-full transition-colors ${on ? "bg-brand" : "bg-muted"}`}
    >
      <span
        className={`absolute top-0.5 h-4 w-4 rounded-full bg-background transition-transform ${
          on ? "translate-x-4" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

function Card({ title, desc, children }: { title: string; desc: string; children: React.ReactNode }) {
  return (
    <div className="card-elevated rounded-xl p-6">
      <div className="mb-5">
        <p className="font-display text-base font-semibold">{title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{desc}</p>
      </div>
      {children}
    </div>
  );
}

function Settings() {
  const [tab, setTab] = useState<Tab>("profile");
  const [emailNotif, setEmailNotif] = useState(true);
  const [weekly, setWeekly] = useState(true);
  const [marketing, setMarketing] = useState(false);

  return (
    <AppShell title="Settings">
      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        {/* Tab nav */}
        <nav className="card-elevated h-fit rounded-xl p-2">
          {tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-brand" : ""}`} />
                {t.label}
              </button>
            );
          })}
        </nav>

        <div className="space-y-6">
          {tab === "profile" && (
            <Card title="Profile" desc="How you appear across BidPilot AI.">
              <div className="mb-5 flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-brand to-primary text-base font-semibold text-brand-foreground">
                  AK
                </div>
                <button className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-medium hover:bg-accent">
                  Upload avatar
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  <input defaultValue="Alex Kim" className={inputCls} />
                </Field>
                <Field label="Email">
                  <input defaultValue="alex@studio.com" className={inputCls} />
                </Field>
                <Field label="Headline">
                  <input defaultValue="Senior product designer" className={inputCls} />
                </Field>
                <Field label="Time zone">
                  <input defaultValue="Europe/Lisbon" className={inputCls} />
                </Field>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <button className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium hover:bg-accent">
                  Cancel
                </button>
                <button className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90">
                  Save changes
                </button>
              </div>
            </Card>
          )}

          {tab === "notifications" && (
            <Card title="Notifications" desc="Choose what hits your inbox.">
              <div className="divide-y divide-border">
                {[
                  { label: "Lead replies", desc: "Email me when a prospect responds.", v: emailNotif, set: setEmailNotif },
                  { label: "Weekly digest", desc: "A Monday summary of pipeline movement.", v: weekly, set: setWeekly },
                  { label: "Product updates", desc: "Occasional updates about new features.", v: marketing, set: setMarketing },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between py-3.5">
                    <div>
                      <p className="text-sm font-medium">{r.label}</p>
                      <p className="text-xs text-muted-foreground">{r.desc}</p>
                    </div>
                    <Toggle on={r.v} onChange={r.set} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {tab === "subscription" && (
            <Card title="Subscription" desc="Manage your plan and billing.">
              <div className="rounded-lg border border-brand/30 bg-gradient-to-br from-accent/50 to-card p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-2xl font-semibold">Pro</p>
                    <p className="text-xs text-muted-foreground">$19 / month · renews Mar 14</p>
                  </div>
                  <span className="rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success">
                    Active
                  </span>
                </div>
                <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
                  <li>· Unlimited AI proposals</li>
                  <li>· Unlimited leads</li>
                  <li>· Advanced analytics</li>
                </ul>
                <div className="mt-5 flex gap-2">
                  <button className="inline-flex h-9 items-center rounded-md bg-brand px-3 text-xs font-medium text-brand-foreground hover:opacity-90">
                    Manage billing
                  </button>
                  <button className="inline-flex h-9 items-center rounded-md border border-border px-3 text-xs font-medium hover:bg-accent">
                    Change plan
                  </button>
                </div>
              </div>
            </Card>
          )}

          {tab === "api" && (
            <Card title="API Keys" desc="For your FastAPI backend integration.">
              <Field label="API key">
                <div className="flex gap-2">
                  <input
                    readOnly
                    value="bp_live_••••••••3f9a"
                    className={`${inputCls} font-mono text-xs`}
                  />
                  <button className="inline-flex h-10 shrink-0 items-center rounded-md border border-border px-3 text-xs font-medium hover:bg-accent">
                    Copy
                  </button>
                  <button className="inline-flex h-10 shrink-0 items-center rounded-md border border-border px-3 text-xs font-medium hover:bg-accent">
                    Rotate
                  </button>
                </div>
              </Field>
              <p className="mt-3 text-xs text-muted-foreground">
                Rotate keys anytime. Old keys keep working for 24h.
              </p>
              <div className="mt-6 rounded-lg border border-border bg-card/40 p-4 font-mono text-xs text-muted-foreground">
                <p className="text-foreground">API base URL</p>
                <p className="mt-1">https://api.bidpilot.ai/v1</p>
              </div>
            </Card>
          )}
        </div>
      </div>
    </AppShell>
  );
}

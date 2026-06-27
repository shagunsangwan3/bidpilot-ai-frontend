import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import {
  ArrowUpRight,
  Users,
  Target,
  FileText,
  Trophy,
  DollarSign,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard · BidPilot AI" }] }),
  component: Dashboard,
});

const metrics = [
  { label: "Total Leads", value: "184", delta: "+12", icon: Users },
  { label: "Active Opportunities", value: "42", delta: "+8", icon: Target },
  { label: "Proposals Generated", value: "127", delta: "+24", icon: FileText },
  { label: "Deals Won", value: "31", delta: "+5", icon: Trophy },
  { label: "Pipeline Value", value: "$48.2k", delta: "+$12k", icon: DollarSign },
];

const statusDist = [
  { label: "New", value: 42, color: "bg-muted-foreground/60" },
  { label: "Contacted", value: 28, color: "bg-warning" },
  { label: "Proposal sent", value: 64, color: "bg-brand" },
  { label: "Won", value: 31, color: "bg-success" },
  { label: "Lost", value: 19, color: "bg-destructive/70" },
];
const distTotal = statusDist.reduce((s, x) => s + x.value, 0);

const monthly = [
  { m: "Jul", v: 28 },
  { m: "Aug", v: 36 },
  { m: "Sep", v: 44 },
  { m: "Oct", v: 52 },
  { m: "Nov", v: 68 },
  { m: "Dec", v: 74 },
  { m: "Jan", v: 86 },
  { m: "Feb", v: 92 },
];
const monthlyMax = Math.max(...monthly.map((m) => m.v));

const forecast = [
  { label: "Closing this week", value: "$12,400", pct: 78 },
  { label: "This month", value: "$28,900", pct: 56 },
  { label: "Next month", value: "$41,200", pct: 34 },
];

const recent = [
  { c: "Acme Corp", p: "Marketing site redesign", v: "$8,500", s: "Hot", t: "bg-destructive/15 text-destructive" },
  { c: "Northwind", p: "Mobile app MVP", v: "$22,000", s: "Proposal sent", t: "bg-brand/15 text-brand" },
  { c: "Lumen Labs", p: "Technical SEO audit", v: "$3,200", s: "Won", t: "bg-success/15 text-success" },
  { c: "Voyager", p: "Brand identity refresh", v: "$6,400", s: "Negotiating", t: "bg-warning/15 text-warning" },
];

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      {/* Metric cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {metrics.map((m) => (
          <div key={m.label} className="card-elevated rounded-xl p-5">
            <div className="flex items-center justify-between">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-accent/60 text-brand">
                <m.icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-medium text-success">{m.delta}</span>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">{m.label}</p>
            <p className="mt-1 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {m.value}
            </p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Status distribution */}
        <div className="card-elevated rounded-xl p-6">
          <p className="text-sm font-medium">Lead status distribution</p>
          <p className="text-xs text-muted-foreground">Across active pipeline</p>
          <div className="mt-6 flex h-3 w-full overflow-hidden rounded-full">
            {statusDist.map((s) => (
              <div key={s.label} className={s.color} style={{ width: `${(s.value / distTotal) * 100}%` }} />
            ))}
          </div>
          <ul className="mt-5 space-y-2.5">
            {statusDist.map((s) => (
              <li key={s.label} className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span className={`h-2 w-2 rounded-sm ${s.color}`} />
                  {s.label}
                </span>
                <span className="font-mono">{s.value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Monthly proposals */}
        <div className="card-elevated rounded-xl p-6 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Monthly proposal generation</p>
              <p className="text-xs text-muted-foreground">Last 8 months</p>
            </div>
            <span className="text-xs text-success">+18% MoM</span>
          </div>
          <div className="mt-8 flex h-44 items-end gap-3">
            {monthly.map((m) => (
              <div key={m.m} className="flex flex-1 flex-col items-center gap-2">
                <div
                  className="w-full rounded-t bg-gradient-to-t from-brand/30 to-brand"
                  style={{ height: `${(m.v / monthlyMax) * 100}%` }}
                />
                <span className="text-[10px] text-muted-foreground">{m.m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Forecast + AI engine */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="card-elevated rounded-xl p-6 lg:col-span-2">
          <p className="text-sm font-medium">Revenue pipeline forecast</p>
          <p className="text-xs text-muted-foreground">Weighted by win probability</p>
          <div className="mt-6 space-y-5">
            {forecast.map((f) => (
              <div key={f.label}>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{f.label}</span>
                  <span className="font-mono font-medium">{f.value}</span>
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand to-primary"
                    style={{ width: `${f.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-elevated relative overflow-hidden rounded-xl p-6">
          <div className="bg-glow absolute inset-0 opacity-60" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-brand" />
              <p className="text-sm font-medium">AI Proposal Engine</p>
            </div>
            <p className="mt-4 font-display text-2xl font-semibold tracking-tight">23 / 50</p>
            <p className="mt-1 text-xs text-muted-foreground">AI proposals used this month</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[46%] rounded-full bg-gradient-to-r from-brand to-primary" />
            </div>
            <Link
              to="/proposals"
              className="mt-6 inline-flex h-9 w-full items-center justify-center gap-2 rounded-md bg-brand text-sm font-medium text-brand-foreground hover:opacity-90"
            >
              Generate new proposal <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent leads */}
      <div className="card-elevated mt-6 overflow-hidden rounded-xl">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div>
            <p className="text-sm font-medium">Recent leads</p>
            <p className="text-xs text-muted-foreground">Updated 2 min ago</p>
          </div>
          <Link to="/leads" className="text-xs text-brand hover:underline">
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {recent.map((l) => (
            <div key={l.c} className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-md bg-accent/60 text-xs font-semibold">
                  {l.c.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium">{l.c}</p>
                  <p className="text-xs text-muted-foreground">{l.p}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden font-mono text-sm text-muted-foreground sm:inline">{l.v}</span>
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${l.t}`}>{l.s}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}

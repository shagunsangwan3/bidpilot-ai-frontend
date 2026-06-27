import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppShell } from "@/components/AppShell";
import { Field, inputCls } from "@/components/AuthLayout";
import { Plus, Search, MoreHorizontal, X, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";

export const Route = createFileRoute("/leads")({
  head: () => ({ meta: [{ title: "Leads · BidPilot AI" }] }),
  component: Leads,
});

type Status = "New" | "Contacted" | "Proposal sent" | "Won" | "Lost";
type Source = "Upwork" | "Freelancer" | "LinkedIn" | "Email" | "Referral" | "Other";

type Lead = {
  id: number;
  client: string;
  project: string;
  budget: number;
  source: Source;
  status: Status;
  notes?: string;
  date: string;
};

const statusStyles: Record<Status, string> = {
  New: "bg-muted text-muted-foreground",
  Contacted: "bg-warning/15 text-warning",
  "Proposal sent": "bg-brand/15 text-brand",
  Won: "bg-success/15 text-success",
  Lost: "bg-destructive/15 text-destructive",
};

const seed: Lead[] = [
  { id: 1, client: "Acme Corp", project: "Marketing site redesign", budget: 8500, source: "Upwork", status: "Contacted", date: "Today" },
  { id: 2, client: "Northwind", project: "Mobile app MVP", budget: 22000, source: "LinkedIn", status: "Proposal sent", date: "Yesterday" },
  { id: 3, client: "Lumen Labs", project: "Technical SEO audit", budget: 3200, source: "Referral", status: "Won", date: "2d ago" },
  { id: 4, client: "Voyager", project: "Brand identity refresh", budget: 6400, source: "Email", status: "Proposal sent", date: "3d ago" },
  { id: 5, client: "Helios", project: "Webflow migration", budget: 4900, source: "Freelancer", status: "New", date: "4d ago" },
  { id: 6, client: "Pioneer & Co", project: "Newsletter automation", budget: 1800, source: "Upwork", status: "Lost", date: "1w ago" },
  { id: 7, client: "Orbit Studios", project: "Design system audit", budget: 12000, source: "LinkedIn", status: "Contacted", date: "1w ago" },
  { id: 8, client: "Nimbus", project: "Landing page A/B", budget: 2400, source: "Email", status: "New", date: "2w ago" },
];

const PAGE_SIZE = 5;

function Leads() {
  const [leads, setLeads] = useState<Lead[]>(seed);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<Status | "All">("All");
  const [sortBy, setSortBy] = useState<"date" | "budget" | "client">("date");
  const [page, setPage] = useState(1);
  const [form, setForm] = useState({
    client: "",
    project: "",
    budget: "",
    source: "Upwork" as Source,
    status: "New" as Status,
    notes: "",
  });

  const filtered = useMemo(() => {
    let r = leads;
    if (statusFilter !== "All") r = r.filter((l) => l.status === statusFilter);
    if (query.trim()) {
      const q = query.toLowerCase();
      r = r.filter((l) => l.client.toLowerCase().includes(q) || l.project.toLowerCase().includes(q));
    }
    r = [...r].sort((a, b) => {
      if (sortBy === "budget") return b.budget - a.budget;
      if (sortBy === "client") return a.client.localeCompare(b.client);
      return b.id - a.id;
    });
    return r;
  }, [leads, statusFilter, query, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function addLead(e: React.FormEvent) {
    e.preventDefault();
    const budget = Number(form.budget.replace(/[^\d.]/g, "")) || 0;
    // TODO: await api.leads.create({ ...form, budget })
    setLeads((l) => [
      {
        id: Date.now(),
        client: form.client,
        project: form.project,
        budget,
        source: form.source,
        status: form.status,
        notes: form.notes,
        date: "Just now",
      },
      ...l,
    ]);
    setForm({ client: "", project: "", budget: "", source: "Upwork", status: "New", notes: "" });
    setOpen(false);
    setPage(1);
  }

  return (
    <AppShell title="Leads">
      {/* Toolbar */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
            placeholder="Search by client or project…"
            className={`${inputCls} pl-9`}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value as Status | "All");
            setPage(1);
          }}
          className={`${inputCls} max-w-[170px]`}
        >
          <option value="All">All statuses</option>
          {(["New", "Contacted", "Proposal sent", "Won", "Lost"] as Status[]).map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as "date" | "budget" | "client")}
          className={`${inputCls} max-w-[170px]`}
        >
          <option value="date">Newest first</option>
          <option value="budget">Highest budget</option>
          <option value="client">Client A–Z</option>
        </select>
        <button
          onClick={() => setOpen(true)}
          className="inline-flex h-10 items-center gap-1.5 rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90"
        >
          <Plus className="h-4 w-4" /> Add lead
        </button>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden rounded-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-card/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-3 font-medium">Client</th>
                <th className="px-6 py-3 font-medium">Project</th>
                <th className="px-6 py-3 font-medium">
                  <button
                    onClick={() => setSortBy("budget")}
                    className="inline-flex items-center gap-1 hover:text-foreground"
                  >
                    Budget <ArrowUpDown className="h-3 w-3" />
                  </button>
                </th>
                <th className="px-6 py-3 font-medium">Source</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Added</th>
                <th className="px-6 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {pageRows.map((l) => (
                <tr key={l.id} className="hover:bg-accent/30">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="grid h-8 w-8 place-items-center rounded-md bg-accent/60 text-xs font-semibold">
                        {l.client.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium">{l.client}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{l.project}</td>
                  <td className="px-6 py-4 font-mono">${l.budget.toLocaleString()}</td>
                  <td className="px-6 py-4 text-muted-foreground">{l.source}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${statusStyles[l.status]}`}
                    >
                      {l.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{l.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {pageRows.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-muted-foreground">
                    No leads match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-border px-6 py-3 text-xs text-muted-foreground">
          <span>
            Showing {pageRows.length} of {filtered.length}
          </span>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="grid h-7 w-7 place-items-center rounded-md border border-border hover:bg-accent disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 font-mono">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="grid h-7 w-7 place-items-center rounded-md border border-border hover:bg-accent disabled:opacity-40"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Add lead modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <form
            onSubmit={addLead}
            className="card-elevated relative w-full max-w-2xl rounded-xl p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <p className="font-display text-lg font-semibold">Add new lead</p>
                <p className="text-xs text-muted-foreground">
                  Capture an opportunity to track and convert.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Client name">
                <input
                  required
                  value={form.client}
                  onChange={(e) => setForm({ ...form, client: e.target.value })}
                  placeholder="Acme Corp"
                  className={inputCls}
                />
              </Field>
              <Field label="Project title">
                <input
                  required
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  placeholder="Marketing site redesign"
                  className={inputCls}
                />
              </Field>
              <Field label="Budget (USD)">
                <input
                  value={form.budget}
                  onChange={(e) => setForm({ ...form, budget: e.target.value })}
                  placeholder="5000"
                  className={inputCls}
                />
              </Field>
              <Field label="Source">
                <select
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value as Source })}
                  className={inputCls}
                >
                  {(["Upwork", "Freelancer", "LinkedIn", "Email", "Referral", "Other"] as Source[]).map(
                    (s) => (
                      <option key={s}>{s}</option>
                    ),
                  )}
                </select>
              </Field>
              <Field label="Status">
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Status })}
                  className={inputCls}
                >
                  {(["New", "Contacted", "Proposal sent", "Won", "Lost"] as Status[]).map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </Field>
              <div className="sm:col-span-2">
                <Field label="Notes">
                  <textarea
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="Context, scope, timing…"
                    className={`${inputCls} h-auto py-3`}
                  />
                </Field>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 items-center rounded-md border border-border px-4 text-sm font-medium hover:bg-accent"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-md bg-brand px-4 text-sm font-medium text-brand-foreground hover:opacity-90"
              >
                Save lead
              </button>
            </div>
          </form>
        </div>
      )}
    </AppShell>
  );
}

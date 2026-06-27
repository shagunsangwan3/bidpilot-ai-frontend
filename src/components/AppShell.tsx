import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Users, Sparkles, Settings, LogOut, Bell, Search } from "lucide-react";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/leads", label: "Leads", icon: Users },
  { to: "/proposals", label: "Proposals", icon: Sparkles },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-card/40 px-3 py-5 md:flex">
        <div className="px-2 pb-6">
          <Logo />
        </div>
        <nav className="flex flex-1 flex-col gap-0.5">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:bg-accent/60 hover:text-foreground"
                }`}
              >
                <Icon className={`h-4 w-4 ${active ? "text-brand" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto rounded-lg border border-border bg-gradient-to-br from-accent/60 to-card p-4">
          <p className="text-sm font-medium">Upgrade to Pro</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Unlimited AI proposals and pipeline analytics.
          </p>
          <Link
            to="/"
            className="mt-3 inline-flex h-8 items-center justify-center rounded-md bg-brand px-3 text-xs font-medium text-brand-foreground hover:opacity-90"
          >
            Upgrade
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur md:px-8">
          <div className="md:hidden">
            <Logo />
          </div>
          <h1 className="hidden text-sm font-medium text-muted-foreground md:block">{title}</h1>
          <div className="relative ml-auto hidden w-72 md:block">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Search leads, proposals…"
              className="h-9 w-full rounded-md border border-input bg-card/60 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand/60 focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <button className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground">
            <Bell className="h-4 w-4" />
          </button>
          <Link
            to="/login"
            className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-foreground"
            aria-label="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </Link>
          <div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand to-primary text-xs font-semibold text-brand-foreground">
            AK
          </div>
        </header>

        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          <div className="mx-auto w-full max-w-7xl">
            <h2 className="mb-6 font-display text-2xl font-semibold tracking-tight md:text-3xl">
              {title}
            </h2>
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="sticky bottom-0 z-20 grid grid-cols-4 border-t border-border bg-card/80 backdrop-blur md:hidden">
          {nav.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center justify-center gap-1 py-2 text-[10px] ${
                  active ? "text-brand" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

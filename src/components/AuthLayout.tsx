import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./Logo";

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="bg-glow pointer-events-none absolute inset-0" />
      <div className="relative flex flex-col px-6 py-8 md:px-12">
        <Logo />
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center">
          <h1 className="font-display text-3xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <p className="mt-6 text-center text-sm text-muted-foreground">{footer}</p>
        </div>
        <p className="text-xs text-muted-foreground">
          <Link to="/" className="hover:text-foreground">← Back to site</Link>
        </p>
      </div>
      <div className="relative hidden overflow-hidden border-l border-border bg-card/40 lg:block">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="relative flex h-full flex-col justify-end p-12">
          <blockquote className="max-w-md font-display text-2xl font-medium leading-snug tracking-tight">
            "BidPilot turned my proposal writing from a 40-minute slog into a 30-second flow. My
            win rate doubled."
          </blockquote>
          <div className="mt-6 flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-brand to-primary text-sm font-semibold text-brand-foreground">
              MC
            </div>
            <div>
              <p className="text-sm font-medium">Maya Chen</p>
              <p className="text-xs text-muted-foreground">Brand designer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export const inputCls =
  "h-10 w-full rounded-md border border-input bg-card/60 px-3 text-sm outline-none placeholder:text-muted-foreground focus:border-brand/60 focus:ring-2 focus:ring-brand/20";

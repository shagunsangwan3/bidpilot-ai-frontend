import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display font-semibold ${className}`}>
      <span className="relative grid h-7 w-7 place-items-center rounded-md bg-gradient-to-br from-brand to-primary text-brand-foreground shadow-[0_0_24px_-4px_var(--brand)]">
        <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
          <path d="M4 14L11 4v7h9L13 21v-7H4z" fill="currentColor" />
        </svg>
      </span>
      <span className="text-base tracking-tight">BidPilot<span className="text-brand">.</span>AI</span>
    </Link>
  );
}

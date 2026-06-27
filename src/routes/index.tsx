import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AuthLayout, Field, inputCls } from "@/components/AuthLayout";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [{ title: "Reset password · BidPilot AI" }],
  }),
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // Wire to FastAPI: POST /auth/forgot-password
    setTimeout(() => {
      setSent(true);
      setLoading(false);
    }, 400);
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email associated with your account and we'll send you a reset link."
      footer={
        <>
          Remembered it?{" "}
          <Link to="/login" className="font-medium text-foreground hover:text-brand">
            Back to sign in
          </Link>
        </>
      }
    >
      {sent ? (
        <div className="rounded-md border border-border bg-card/60 p-4 text-sm text-muted-foreground">
          If an account exists for <span className="text-foreground">{email}</span>, a reset link is
          on its way.
        </div>
      ) : (
        <form className="space-y-4" onSubmit={onSubmit}>
          <Field label="Email">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@studio.com"
              className={inputCls}
            />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex h-10 w-full items-center justify-center rounded-md bg-brand text-sm font-medium text-brand-foreground shadow-[0_8px_24px_-8px_var(--brand)] hover:opacity-95 disabled:opacity-60"
          >
            {loading ? "Sending…" : "Send reset link"}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}

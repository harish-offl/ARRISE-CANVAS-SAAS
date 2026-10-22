"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail,
  LoaderCircle,
  CircleAlert,
  CircleCheck,
  ArrowLeft,
} from "lucide-react";
import { AuthShell } from "../../components/auth-layout";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { getSupabaseBrowserClient } from "../../lib/supabase-browser";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    const client = getSupabaseBrowserClient();
    if (!client) {
      setError("Password reset is unavailable until Supabase is configured.");
      return;
    }

    setLoading(true);
    const { error: resetError } = await client.auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/login` }
    );
    setLoading(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle="If an account exists for that email, we've sent a password reset link."
      >
        <div className="flex flex-col items-center rounded-lg border border-border bg-surface p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange">
            <CircleCheck className="h-7 w-7" />
          </div>
          <p className="text-sm text-muted">
            Follow the link in the email to choose a new password.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-10 items-center gap-2 rounded-md border border-border px-5 text-sm font-medium transition-colors hover:bg-elevated"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to sign in
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Reset your password"
      subtitle="Enter your email and we'll send you a reset link."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-2 font-medium text-orange hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="flex items-start gap-2 rounded-md border border-error/40 bg-error/10 px-3 py-2 text-sm text-error">
            <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-[38px] h-4 w-4 text-muted" />
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@university.edu"
            className="pl-9"
            required
          />
        </div>

        <Button type="submit" size="lg" disabled={loading} className="mt-2">
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {loading ? "Sending..." : "Send reset link"}
        </Button>
      </form>
    </AuthShell>
  );
}

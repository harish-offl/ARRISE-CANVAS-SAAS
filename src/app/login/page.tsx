"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CircleAlert, LoaderCircle } from "lucide-react";
import { AuthShell } from "../../components/auth-layout";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import type { DemoAccount } from "../../lib/demo-auth";
import {
  authenticateDemo,
  DEMO_ACCOUNTS,
  DEMO_PASSWORD,
} from "../../lib/demo-auth";
import {
  getSupabaseBrowserClient,
  isSupabaseConfigured,
} from "../../lib/supabase-browser";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const configured = isSupabaseConfigured();

  function handleDemoLogin(account: DemoAccount) {
    const demoUser = authenticateDemo(account.email, DEMO_PASSWORD);
    if (!demoUser) {
      setError("This static demo account is unavailable.");
      return;
    }
    router.replace(`/dashboard?previewRole=${demoUser.role}`);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const demoUser = authenticateDemo(email, password);

    if (demoUser) {
      router.replace(`/dashboard?previewRole=${demoUser.role}`);
      return;
    }

    const client = getSupabaseBrowserClient();

    if (!client) {
      setError("Those details do not match a static demo. Use a listed demo email and password below.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await client.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  }

  async function handleGoogleSignIn() {
    setError(null);
    const client = getSupabaseBrowserClient();
    if (!client) {
      setError("Authentication is not configured. Contact your administrator.");
      return;
    }

    setLoading(true);
    const { error: signInError } = await client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);

    if (signInError) setError(signInError.message);
  }

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in with your institution account."
      footer={
        <span className="text-muted">
          New to Arrise Canvas?{" "}
          <Link href="/signup" className="font-medium text-orange hover:underline">
            Create an account
          </Link>
        </span>
      }
    >
      <div className="flex flex-col gap-4">
        {!configured && (
          <p className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-muted">
            Institution sign-in is not configured. Use a static demo below to
            preview a role workspace.
          </p>
        )}
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-error/40 bg-error/10 px-3 py-2 text-sm text-error"
          >
            <CircleAlert className="mt-0.5 h-4 w-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@institution.edu"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
          />
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm font-medium text-orange hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <Button type="submit" size="lg" disabled={loading}>
            {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <section className="rounded-lg border border-border bg-surface p-4">
          <h2 className="text-sm font-semibold">Static demo logins</h2>
          <p className="mt-1 text-xs leading-relaxed text-muted">
            Shared password:{" "}
            <code className="rounded bg-elevated px-1.5 py-0.5 text-foreground">
              {DEMO_PASSWORD}
            </code>
          </p>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {DEMO_ACCOUNTS.map((account) => (
              <li
                key={account.id}
                className="flex items-center justify-between gap-3 rounded-md border border-border bg-background px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-xs font-medium">{account.label}</p>
                  <code className="mt-1 block break-all text-[11px] text-muted">
                    {account.email}
                  </code>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  onClick={() => handleDemoLogin(account)}
                >
                  Demo login
                </Button>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-muted">
            These public credentials only open static role previews. They do
            not create a session, access protected dashboards, or save data.
          </p>
        </section>

        <div className="flex items-center gap-3 text-xs text-muted">
          <span className="h-px flex-1 bg-border" />
          or
          <span className="h-px flex-1 bg-border" />
        </div>

        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled={loading}
          onClick={handleGoogleSignIn}
        >
          Continue with Google
        </Button>
      </div>
    </AuthShell>
  );
}

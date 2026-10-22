"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  LoaderCircle,
  CircleAlert,
  CircleCheck,
} from "lucide-react";
import { AuthShell } from "../../components/auth-layout";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { getSupabaseBrowserClient, isSupabaseConfigured } from "../../lib/supabase-browser";

export default function SignupPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    const form = new FormData(event.currentTarget);
    const fullName = String(form.get("fullName") || "").trim();
    const email = String(form.get("email") || "").trim();
    const password = String(form.get("password") || "");
    const confirmPassword = String(form.get("confirmPassword") || "");

    if (!fullName || !email || !password) {
      setError("Please complete all required fields.");
      return;
    }
    if (password.length < 8) {
      setError("Your password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!isSupabaseConfigured()) {
      setError("Account creation is unavailable until Supabase is configured.");
      return;
    }

    const client = getSupabaseBrowserClient();
    if (!client) {
      setError("Authentication is unavailable right now.");
      return;
    }

    setLoading(true);
    const { error: signUpError } = await client.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    });
    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }
    setSuccess(true);
    router.refresh();
  }

  if (success) {
    return (
      <AuthShell
        title="Check your inbox"
        subtitle="We've sent you a confirmation link to finish creating your account."
      >
        <div className="flex flex-col items-center rounded-lg border border-border bg-surface p-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange/10 text-orange">
            <CircleCheck className="h-7 w-7" />
          </div>
          <p className="text-sm text-muted">
            Once confirmed, you can sign in and start using Arrise Canvas.
          </p>
          <p className="mt-3 text-sm text-muted">
            Your institution administrator must grant your workspace access.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex h-10 items-center rounded-md bg-orange px-5 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
          >
            Back to sign in
          </Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start organizing your learning today."
      footer={
        <span className="text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-orange hover:underline">
            Sign in
          </Link>
        </span>
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
          <User className="pointer-events-none absolute left-3 top-[38px] h-4 w-4 text-muted" />
          <Input
            label="Full name"
            name="fullName"
            autoComplete="name"
            placeholder="Jane Doe"
            className="pl-9"
            required
          />
        </div>

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

        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-[38px] h-4 w-4 text-muted" />
          <Input
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="At least 8 characters"
            className="pl-9 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-[34px] text-muted transition-colors hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>

        <Input
          label="Confirm password"
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          required
        />

        <label className="flex items-start gap-2 text-sm text-muted">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-border bg-surface accent-[var(--orange)]"
          />
          <span>
            I agree to the{" "}
            <Link href="/terms" className="text-orange hover:underline">
              Terms
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-orange hover:underline">
              Privacy Policy
            </Link>
            .
          </span>
        </label>

        <Button type="submit" size="lg" disabled={loading} className="mt-2">
          {loading && <LoaderCircle className="h-4 w-4 animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </form>
    </AuthShell>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  LogOut,
  CircleAlert,
} from "lucide-react";
import { ROLE_LABELS, type DemoRole } from "../lib/demo-auth";
import { getSupabaseBrowserClient } from "../lib/supabase-browser";

export function AppHeader({
  fullName,
  role,
  isDemo = false,
}: {
  fullName: string;
  role: string;
  isDemo?: boolean;
}) {
  const router = useRouter();
  const [logoutError, setLogoutError] = useState<string | null>(null);
  const roleLabel = ROLE_LABELS[role as DemoRole] ?? role;
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function handleLogout() {
    setLogoutError(null);
    try {
      if (!isDemo) {
        const client = getSupabaseBrowserClient();
        if (!client) throw new Error("Supabase is not configured.");
        const { error } = await client.auth.signOut();
        if (error) throw error;
      }
      router.replace("/login");
      router.refresh();
    } catch {
      setLogoutError("Unable to sign out. Please try again.");
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link
            href={
              isDemo
                ? `/dashboard?previewRole=${encodeURIComponent(role)}`
                : "/dashboard"
            }
            className="flex items-center gap-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">
              Arrise <span className="text-orange">Canvas</span>
            </span>
          </Link>
          {!(isDemo && role === "student") && (
            <nav className="hidden items-center gap-1 md:flex">
              <Link
                href={
                  isDemo
                    ? `/dashboard?previewRole=${encodeURIComponent(role)}`
                    : "/dashboard"
                }
                className="flex items-center gap-2 rounded-md bg-elevated px-3 py-2 text-sm font-medium text-foreground"
              >
                <LayoutDashboard className="h-4 w-4 text-orange" />
                Dashboard
              </Link>
            </nav>
          )}
        </div>

        <div className="flex items-center gap-2">
          <div className="ml-1 flex items-center gap-3 rounded-md border border-border bg-surface py-1 pl-1 pr-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-orange text-xs font-bold text-black">
              {initials}
            </div>
            <div className="hidden leading-tight sm:block">
              <p className="max-w-[10rem] truncate text-sm font-medium text-foreground">
                {fullName}
              </p>
              <p className="text-xs text-muted">{roleLabel}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted transition-colors hover:bg-elevated hover:text-error"
              aria-label="Log out"
              title="Log out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {logoutError && (
        <p
          role="alert"
          className="flex items-center justify-center gap-2 border-t border-error/30 bg-error/10 px-4 py-2 text-sm text-error"
        >
          <CircleAlert className="h-4 w-4" aria-hidden="true" />
          {logoutError}
        </p>
      )}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  BookOpen,
  LayoutDashboard,
  Bell,
  Settings,
  LogOut,
  GraduationCap,
  Search,
} from "lucide-react";
import { ROLE_LABELS, type DemoRole } from "../lib/demo-auth";
import { getSupabaseBrowserClient } from "../lib/supabase-browser";

export function AppHeader({
  fullName,
  role,
  institution,
  isDemo = false,
}: {
  fullName: string;
  role: string;
  institution: string;
  isDemo?: boolean;
}) {
  const router = useRouter();
  const roleLabel = ROLE_LABELS[role as DemoRole] ?? role;
  const initials = fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleLogout() {
    if (!isDemo) {
      const client = getSupabaseBrowserClient();
      void client?.auth.signOut();
    }
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">
              Arrise <span className="text-orange">Canvas</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            <span className="flex items-center gap-2 rounded-md bg-elevated px-3 py-2 text-sm font-medium text-foreground">
              <LayoutDashboard className="h-4 w-4 text-orange" />
              Dashboard
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 rounded-md border border-border bg-surface px-3 py-2 text-sm text-muted lg:flex">
            <Search className="h-4 w-4" />
            <span>Search materials...</span>
            <kbd className="rounded bg-elevated px-1.5 py-0.5 text-xs">⌘K</kbd>
          </div>
          <button
            type="button"
            className="relative flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-orange" />
          </button>
          <button
            type="button"
            className="hidden h-9 w-9 items-center justify-center rounded-md border border-border text-muted transition-colors hover:text-foreground sm:flex"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>

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

      <div className="hidden border-t border-border bg-surface/50 px-4 py-2 text-center text-xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <GraduationCap className="h-3.5 w-3.5 text-orange" />
          Signed in to {institution} · Demo environment
        </span>
      </div>
    </header>
  );
}

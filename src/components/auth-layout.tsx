import * as React from "react";
import Link from "next/link";
import { BookOpen, CircleCheck } from "lucide-react";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen bg-background text-foreground lg:grid-cols-2">
      <div className="relative hidden overflow-hidden border-r border-border bg-surface lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_30%_20%,rgba(255,107,0,0.12),transparent)]" />
        <Link href="/" className="relative flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange">
            <BookOpen className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            Arrise <span className="text-orange">Canvas</span>
          </span>
        </Link>
        <div className="relative">
          <h2 className="max-w-sm text-3xl font-bold tracking-tight">
            Your Learning. <span className="text-orange">One Canvas.</span>
          </h2>
          <ul className="mt-6 flex flex-col gap-3">
            {[
              "Materials, assignments and quizzes in one place",
              "Purpose-built for students, faculty and admins",
              "Track progress and stay on top of every deadline",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm">
                <CircleCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-orange" />
                <span className="text-muted">{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-muted">
          © 2026 Arrise Digital. All rights reserved.
        </p>
      </div>

      <div className="flex items-center justify-center p-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="mb-8 flex items-center gap-2 lg:hidden"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">
              Arrise <span className="text-orange">Canvas</span>
            </span>
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-muted">{subtitle}</p>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm">{footer}</div>}
        </div>
      </div>
    </div>
  );
}

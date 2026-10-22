import Link from "next/link";

const navigation = [
  { href: "/#features", label: "Features" },
  { href: "/#solutions", label: "Solutions" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#about", label: "About" },
  { href: "/#faq", label: "FAQ" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-4">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
          Arrise <span className="text-orange">Canvas</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-5 text-sm text-muted md:flex"
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none rounded-md border border-border px-3 py-2 text-sm font-medium">
            Menu
          </summary>
          <nav
            aria-label="Mobile navigation"
            className="absolute right-0 top-12 z-50 flex min-w-48 flex-col gap-1 rounded-lg border border-border bg-surface p-2 shadow-lg"
          >
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-elevated hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/login"
              className="rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-elevated hover:text-foreground"
            >
              Log in
            </Link>
          </nav>
        </details>
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href="/login"
            className="hidden text-sm font-medium text-muted transition-colors hover:text-foreground sm:inline"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex h-10 items-center rounded-md bg-orange px-4 text-sm font-medium text-black transition-colors hover:bg-orange-hover"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>Arrise Canvas</p>
        <nav aria-label="Footer navigation" className="flex gap-5">
          <Link className="hover:text-foreground" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-foreground" href="/terms">
            Terms
          </Link>
          <Link className="hover:text-foreground" href="/faq">
            FAQ
          </Link>
        </nav>
      </div>
    </footer>
  );
}

import Link from "next/link";

import { APP_NAME } from "@/lib/constants";

import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/app", label: "Workspace" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)]/80 bg-[var(--canvas)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
        <Link className="text-lg font-semibold tracking-tight" href="/">
          {APP_NAME}
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]"
              href={link.href}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm">
          <Link href="/app">Open app</Link>
        </Button>
      </div>
    </header>
  );
}

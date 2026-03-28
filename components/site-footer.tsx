import Link from "next/link";

import { APP_NAME, APP_TAGLINE } from "@/lib/constants";

const links = [
  { href: "/", label: "Product" },
  { href: "/pricing", label: "Pricing" },
  { href: "/app", label: "Workspace" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)]/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md space-y-3">
          <p className="text-lg font-semibold">{APP_NAME}</p>
          <p className="text-sm leading-6 text-[var(--muted)]">{APP_TAGLINE}. Generate structured starter code from visual inspiration.</p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-4 text-sm text-[var(--muted)]">
          {links.map((link) => (
            <Link key={link.href} className="transition hover:text-[var(--foreground)]" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

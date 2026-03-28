import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "For trying the workflow and validating screenshot-to-layout ideas.",
    features: ["3 analyses per day", "Editable workspace", "Local project persistence", "React + Tailwind export"],
    cta: "Start in demo mode",
    href: "/app",
    highlight: false,
  },
  {
    name: "Pro",
    price: "$24/mo",
    description: "For indie builders using screenshots as a recurring product acceleration input.",
    features: ["Unlimited analyses", "Higher live usage allowance", "Priority model-backed code generation", "Priority support queue"],
    cta: "Join the Pro waitlist",
    href: "/app",
    highlight: true,
  },
];

export const metadata: Metadata = {
  title: "Pricing",
};

export default function PricingPage() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <Badge>Pricing</Badge>
        <h1 className="mt-5 text-5xl font-semibold tracking-tight md:text-6xl">Simple packaging for a focused workflow.</h1>
        <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
          Start with demo mode, upgrade when screenshot-driven prototyping becomes part of your weekly build cycle.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`surface rounded-[2rem] border p-8 shadow-sm ${plan.highlight ? "border-amber-500/40 ring-1 ring-amber-500/20" : "border-[var(--line)]"}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-2xl font-semibold">{plan.name}</p>
                <p className="mt-4 text-5xl font-semibold tracking-tight">{plan.price}</p>
                <p className="mt-4 max-w-md text-sm leading-7 text-[var(--muted)]">{plan.description}</p>
              </div>
              {plan.highlight ? <Badge className="border-amber-400/50 bg-amber-100 text-amber-900">Most active</Badge> : null}
            </div>
            <ul className="mt-8 space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm leading-7 text-[var(--muted)]">
                  <span className="mt-1 inline-flex size-5 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                    <Check className="size-3" />
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="mt-8 w-full" size="lg" variant={plan.highlight ? "primary" : "outline"}>
              <Link href={plan.href}>{plan.cta}</Link>
            </Button>
          </article>
        ))}
      </div>

      <div className="mt-16 rounded-[2rem] border border-[var(--line)] bg-white/55 px-8 py-10 text-sm leading-7 text-[var(--muted)]">
        Billing is intentionally placeholder-only in V1. The pricing surface is production-grade UI and positioning, but purchase flow and subscription management stay out of scope for this release.
      </div>
    </main>
  );
}

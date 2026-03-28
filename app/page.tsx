import Link from "next/link";
import { ArrowRight, Layers3, Sparkles, WandSparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featureCards = [
  {
    title: "Structured layout analysis",
    body: "Turn screenshots into normalized section data you can refine instead of reverse-engineering by eye.",
    icon: Layers3,
  },
  {
    title: "Editable visual workspace",
    body: "Update copy, tune style presets, and reorder sections inside a focused editor instead of a full design tool.",
    icon: Sparkles,
  },
  {
    title: "Starter code export",
    body: "Leave with readable React + Tailwind code that acts as a launch point for your own product surface.",
    icon: WandSparkles,
  },
];

export default function HomePage() {
  return (
    <main>
      <section className="mx-auto max-w-7xl px-6 pt-20 pb-24 md:pt-28">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge>Turn screenshots into editable layouts</Badge>
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl md:leading-[1.02]">
                Prototype faster from screenshots, without treating them like clones.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-[var(--muted)] md:text-xl">
                SnapLayout analyzes a screenshot, converts it into structured sections, and gives you a live editor plus exportable React + Tailwind starter code.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/app">
                  Open workspace
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/pricing">View pricing</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-[var(--muted)]">
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2">Demo mode without API key</span>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2">Structured JSON + starter code</span>
              <span className="rounded-full border border-[var(--line)] bg-white/70 px-4 py-2">Built for indie builders</span>
            </div>
          </div>

          <div className="surface rounded-[2rem] border border-[var(--line)] p-5 shadow-[0_30px_120px_rgba(28,25,23,0.12)]">
            <div className="rounded-[1.5rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,251,247,0.96),rgba(247,240,233,0.96))] p-5">
              <div className="mb-5 flex items-center gap-2">
                <span className="size-2.5 rounded-full bg-rose-300" />
                <span className="size-2.5 rounded-full bg-amber-300" />
                <span className="size-2.5 rounded-full bg-emerald-300" />
              </div>
              <div className="grid gap-4 md:grid-cols-[15rem_1fr]">
                <aside className="rounded-[1.25rem] border border-[var(--line)] bg-white/90 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">Structure</p>
                  <div className="mt-4 space-y-3">
                    {["Navbar", "Hero", "Features", "Pricing", "Footer"].map((item) => (
                      <div key={item} className="rounded-2xl border border-[var(--line)] bg-[var(--canvas)] px-4 py-3 text-sm font-medium">
                        {item}
                      </div>
                    ))}
                  </div>
                </aside>
                <div className="space-y-4">
                  <div className="rounded-[1.25rem] border border-[var(--line)] bg-white/90 p-5">
                    <div className="space-y-3">
                      <div className="h-3 w-28 rounded-full bg-amber-200" />
                      <div className="h-14 rounded-[1.25rem] bg-stone-200" />
                      <div className="h-24 rounded-[1.25rem] bg-stone-100" />
                      <div className="grid gap-3 md:grid-cols-2">
                        <div className="h-28 rounded-[1.25rem] bg-stone-100" />
                        <div className="h-28 rounded-[1.25rem] bg-stone-100" />
                      </div>
                    </div>
                  </div>
                  <div className="rounded-[1.25rem] border border-[var(--line)] bg-[#18120f] p-5 text-sm text-stone-200">
                    <p className="font-medium text-amber-200">Starter code</p>
                    <pre className="mt-3 overflow-x-auto text-xs leading-6 text-stone-300">
{`<section className="py-24">
  <div className="mx-auto max-w-6xl px-6">
    <h1 className="text-5xl font-semibold">
      Turn screenshots into editable layouts
    </h1>
  </div>
</section>`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)]/80 bg-white/55">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-16 md:grid-cols-3">
          {featureCards.map((feature) => (
            <article key={feature.title} className="surface rounded-[1.75rem] border border-[var(--line)] p-6 shadow-sm">
              <feature.icon className="size-5 text-amber-700" />
              <h2 className="mt-5 text-2xl font-semibold tracking-tight">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{feature.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-4">
            <Badge>How it works</Badge>
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">A focused workflow built for moving from reference to implementation.</h2>
            <p className="max-w-xl text-lg leading-8 text-[var(--muted)]">
              SnapLayout is deliberately not a full design suite. It gives you structure, editing, and starter code so you can keep momentum in your own stack.
            </p>
          </div>
          <div className="space-y-4">
            {[
              ["Upload a screenshot", "Validate the file, preview it, and analyze it with OpenAI or demo mode when no API key is configured."],
              ["Refine the structure", "Edit headings, CTA labels, plan copy, testimonials, section order, and global tone/radius/spacing presets."],
              ["Export starter code", "Copy readable React + Tailwind markup generated from the normalized layout state."],
            ].map(([title, body], index) => (
              <div key={title} className="surface rounded-[1.75rem] border border-[var(--line)] p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-700">0{index + 1}</p>
                <h3 className="mt-4 text-2xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="surface rounded-[2rem] border border-[var(--line)] px-8 py-14 text-center shadow-[0_28px_100px_rgba(28,25,23,0.12)]">
          <Badge>Ready to prototype faster?</Badge>
          <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
            Turn a screenshot into something editable, structured, and buildable.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            Start in demo mode or connect OpenAI for live analysis. Either way, the workflow stays useful from the first upload.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg">
              <Link href="/app">Try the workspace</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/pricing">Compare plans</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

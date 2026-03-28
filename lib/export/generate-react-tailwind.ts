import type { LayoutProject, LayoutSection, LayoutStyle } from "@/lib/schemas/layout";
import { escapeTemplateLiteral } from "@/lib/sanitize";

function styleTokens(style: LayoutStyle) {
  const tone = {
    warm: {
      shell: "bg-stone-50 text-stone-950",
      muted: "text-stone-600",
      border: "border-stone-200",
      surface: "bg-white/90",
      accent: "bg-amber-600 text-white",
      secondary: "bg-stone-900 text-stone-50",
    },
    graphite: {
      shell: "bg-slate-950 text-slate-50",
      muted: "text-slate-300",
      border: "border-slate-800",
      surface: "bg-slate-900",
      accent: "bg-amber-500 text-slate-950",
      secondary: "bg-slate-50 text-slate-950",
    },
    linen: {
      shell: "bg-orange-50 text-stone-950",
      muted: "text-stone-600",
      border: "border-orange-100",
      surface: "bg-white",
      accent: "bg-stone-950 text-orange-50",
      secondary: "bg-orange-100 text-stone-950",
    },
  }[style.tone];

  const radius = {
    soft: "rounded-2xl",
    rounded: "rounded-3xl",
    square: "rounded-xl",
  }[style.radius];

  const spacing = {
    compact: "py-16",
    comfortable: "py-24",
    airy: "py-32",
  }[style.spacing];

  return { tone, radius, spacing };
}

function q(value: string) {
  return `\`${escapeTemplateLiteral(value)}\``;
}

function renderSection(section: LayoutSection, style: LayoutStyle) {
  const { tone, radius, spacing } = styleTokens(style);

  switch (section.type) {
    case "navbar":
      return `      <header className="border-b ${tone.border}">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
          <a href="#" className="text-lg font-semibold">${section.content.brandName}</a>
          <nav className="hidden gap-6 text-sm md:flex">
${section.content.links.map((link) => `            <a href=${q(link.href)} className="${tone.muted} transition hover:text-current">${link.label}</a>`).join("\n")}
          </nav>
${section.content.primaryCta ? `          <a href=${q(section.content.primaryCta.href)} className="inline-flex items-center justify-center rounded-full ${tone.accent} px-4 py-2 text-sm font-semibold transition hover:opacity-90">${section.content.primaryCta.label}</a>` : ""}
        </div>
      </header>`;
    case "hero":
      return `      <section className="${spacing}">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
${section.content.eyebrow ? `            <p className="text-sm font-semibold uppercase tracking-[0.24em] ${tone.muted}">${section.content.eyebrow}</p>` : ""}
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">${section.content.heading}</h1>
${section.content.subheading ? `              <p className="max-w-2xl text-xl ${tone.muted}">${section.content.subheading}</p>` : ""}
${section.content.body ? `              <p className="max-w-2xl text-base leading-7 ${tone.muted}">${section.content.body}</p>` : ""}
            </div>
            <div className="flex flex-wrap gap-3">
${section.content.primaryCta ? `              <a href=${q(section.content.primaryCta.href)} className="inline-flex items-center justify-center rounded-full ${tone.accent} px-5 py-3 text-sm font-semibold transition hover:opacity-90">${section.content.primaryCta.label}</a>` : ""}
${section.content.secondaryCta ? `              <a href=${q(section.content.secondaryCta.href)} className="inline-flex items-center justify-center rounded-full border ${tone.border} px-5 py-3 text-sm font-semibold transition hover:bg-black/5">${section.content.secondaryCta.label}</a>` : ""}
            </div>
${section.content.highlights.length > 0 ? `            <div className="flex flex-wrap gap-3 pt-2">
${section.content.highlights.map((highlight) => `              <span className="inline-flex rounded-full border ${tone.border} px-3 py-1 text-sm ${tone.muted}">${highlight}</span>`).join("\n")}
            </div>` : ""}
          </div>
          <div className="min-h-[20rem] ${radius} border ${tone.border} ${tone.surface} p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="space-y-4">
              <div className="h-3 w-24 rounded-full bg-amber-200/70" />
              <div className="space-y-3">
                <div className="h-12 rounded-2xl bg-stone-200/70" />
                <div className="h-24 rounded-2xl bg-stone-100" />
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="h-28 rounded-2xl bg-stone-100" />
                  <div className="h-28 rounded-2xl bg-stone-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>`;
    case "features":
      return `      <section className="${spacing}">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">${section.content.heading}</h2>
${section.content.subheading ? `            <p className="text-lg ${tone.muted}">${section.content.subheading}</p>` : ""}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
${section.content.items.map((item) => `            <article className="${radius} border ${tone.border} ${tone.surface} p-6 shadow-sm">
              <div className="space-y-3">
                <h3 className="text-xl font-semibold">${item.title}</h3>
${item.description ? `                <p className="text-sm leading-6 ${tone.muted}">${item.description}</p>` : ""}
${item.meta ? `                <p className="text-sm font-medium text-amber-700">${item.meta}</p>` : ""}
              </div>
            </article>`).join("\n")}
          </div>
        </div>
      </section>`;
    case "testimonials":
      return `      <section className="${spacing}">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">${section.content.heading}</h2>
${section.content.subheading ? `            <p className="text-lg ${tone.muted}">${section.content.subheading}</p>` : ""}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
${section.content.items.map((item) => `            <blockquote className="${radius} border ${tone.border} ${tone.surface} p-6 shadow-sm">
              <p className="text-lg leading-8">${item.quote}</p>
              <footer className="mt-6 text-sm ${tone.muted}">
                <span className="font-semibold text-current">${item.author}</span>${item.role ? `, ${item.role}` : ""}
              </footer>
            </blockquote>`).join("\n")}
          </div>
        </div>
      </section>`;
    case "pricing":
      return `      <section className="${spacing}">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">${section.content.heading}</h2>
${section.content.subheading ? `            <p className="text-lg ${tone.muted}">${section.content.subheading}</p>` : ""}
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
${section.content.plans.map((plan) => `            <article className="${radius} border ${tone.border} ${tone.surface} p-6 shadow-sm">
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-semibold">${plan.name}</h3>
                  <p className="mt-2 text-4xl font-semibold">${plan.price}</p>
${plan.description ? `                  <p className="mt-3 text-sm leading-6 ${tone.muted}">${plan.description}</p>` : ""}
                </div>
                <ul className="space-y-2 text-sm ${tone.muted}">
${plan.features.map((feature) => `                  <li>- ${feature}</li>`).join("\n")}
                </ul>
                <a href=${q(plan.cta.href)} className="inline-flex items-center justify-center rounded-full ${tone.accent} px-4 py-2 text-sm font-semibold transition hover:opacity-90">${plan.cta.label}</a>
              </div>
            </article>`).join("\n")}
          </div>
        </div>
      </section>`;
    case "cta":
      return `      <section className="${spacing}">
        <div className="mx-auto max-w-5xl px-6">
          <div className="${radius} border ${tone.border} ${tone.surface} px-8 py-12 text-center shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="mx-auto max-w-3xl space-y-4">
              <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">${section.content.heading}</h2>
${section.content.body ? `              <p className="text-lg ${tone.muted}">${section.content.body}</p>` : ""}
              <div className="flex flex-wrap justify-center gap-3 pt-4">
                <a href=${q(section.content.primaryCta.href)} className="inline-flex items-center justify-center rounded-full ${tone.accent} px-5 py-3 text-sm font-semibold transition hover:opacity-90">${section.content.primaryCta.label}</a>
${section.content.secondaryCta ? `                <a href=${q(section.content.secondaryCta.href)} className="inline-flex items-center justify-center rounded-full ${tone.secondary} px-5 py-3 text-sm font-semibold transition hover:opacity-90">${section.content.secondaryCta.label}</a>` : ""}
              </div>
            </div>
          </div>
        </div>
      </section>`;
    case "footer":
      return `      <footer className="border-t ${tone.border}">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <p className="text-lg font-semibold">${section.content.brandName}</p>
${section.content.body ? `            <p className="text-sm ${tone.muted}">${section.content.body}</p>` : ""}
          </div>
          <nav className="flex flex-wrap gap-4 text-sm ${tone.muted}">
${section.content.links.map((link) => `            <a href=${q(link.href)} className="transition hover:text-current">${link.label}</a>`).join("\n")}
          </nav>
        </div>
      </footer>`;
    case "generic":
    default:
      return `      <section className="${spacing}">
        <div className="mx-auto max-w-6xl px-6">
          <div className="${radius} border ${tone.border} ${tone.surface} p-8 shadow-sm">
            <div className="max-w-3xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">${section.content.heading}</h2>
${section.content.subheading ? `              <p className="text-lg ${tone.muted}">${section.content.subheading}</p>` : ""}
${section.content.body ? `              <p className="text-base leading-7 ${tone.muted}">${section.content.body}</p>` : ""}
            </div>
${section.content.items.length > 0 ? `            <div className="mt-8 grid gap-4 md:grid-cols-3">
${section.content.items.map((item) => `              <article className="rounded-2xl border ${tone.border} p-5">
                <h3 className="font-semibold">${item.title}</h3>
${item.description ? `                <p className="mt-2 text-sm leading-6 ${tone.muted}">${item.description}</p>` : ""}
              </article>`).join("\n")}
            </div>` : ""}
          </div>
        </div>
      </section>`;
  }
}

export function generateReactTailwind(project: LayoutProject) {
  const { tone } = styleTokens(project.style);

  return `export default function GeneratedLayout() {
  return (
    <main className="min-h-screen ${tone.shell}">
${project.sections.map((section) => renderSection(section, project.style)).join("\n")}
    </main>
  );
}
`;
}

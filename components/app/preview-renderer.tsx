import type { LayoutProject, LayoutSection } from "@/lib/schemas/layout";
import { getPreviewTokens } from "@/lib/rendering/presets";
import { cn } from "@/lib/utils";

function PreviewSection({ section, project }: { section: LayoutSection; project: LayoutProject }) {
  const tokens = getPreviewTokens(project.style);

  switch (section.type) {
    case "navbar":
      return (
        <header className={cn("border-b", tokens.tone.border)}>
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-5">
            <p className="text-lg font-semibold">{section.content.brandName}</p>
            <nav className="hidden gap-5 text-sm md:flex">
              {section.content.links.map((link) => (
                <a key={link.label} className={cn("transition hover:text-current", tokens.tone.muted)} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </header>
      );
    case "hero":
      return (
        <section className={tokens.sectionSpacing}>
          <div className="mx-auto grid max-w-5xl gap-8 px-6 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div className="space-y-5">
              {section.content.eyebrow ? (
                <p className={cn("text-xs font-semibold uppercase tracking-[0.28em]", tokens.tone.muted)}>{section.content.eyebrow}</p>
              ) : null}
              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">{section.content.heading}</h1>
                {section.content.subheading ? <p className={cn("text-lg leading-8", tokens.tone.muted)}>{section.content.subheading}</p> : null}
                {section.content.body ? <p className={cn("text-sm leading-7", tokens.tone.muted)}>{section.content.body}</p> : null}
              </div>
              <div className="flex flex-wrap gap-3">
                {section.content.primaryCta ? (
                  <a className={cn("rounded-full px-5 py-3 text-sm font-semibold", tokens.tone.accent)} href={section.content.primaryCta.href}>
                    {section.content.primaryCta.label}
                  </a>
                ) : null}
                {section.content.secondaryCta ? (
                  <a className={cn("rounded-full px-5 py-3 text-sm font-semibold", tokens.tone.secondary)} href={section.content.secondaryCta.href}>
                    {section.content.secondaryCta.label}
                  </a>
                ) : null}
              </div>
              {section.content.highlights.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {section.content.highlights.map((item) => (
                    <span key={item} className={cn("rounded-full px-3 py-1 text-xs font-medium", tokens.tone.chip)}>
                      {item}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className={cn("min-h-[18rem] border p-6 shadow-sm", tokens.radius, tokens.tone.border, tokens.tone.heroSurface)}>
              <div className="space-y-4">
                <div className="h-3 w-20 rounded-full bg-amber-200/70" />
                <div className="h-12 rounded-2xl bg-black/5" />
                <div className="h-24 rounded-2xl bg-black/4" />
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="h-24 rounded-2xl bg-black/4" />
                  <div className="h-24 rounded-2xl bg-black/4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section className={tokens.sectionSpacing}>
          <div className="mx-auto max-w-5xl px-6">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">{section.content.heading}</h2>
              {section.content.subheading ? <p className={cn("text-sm leading-7", tokens.tone.muted)}>{section.content.subheading}</p> : null}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {section.content.items.map((item) => (
                <article key={item.title} className={cn("border p-5 shadow-sm", tokens.radius, tokens.tone.border, tokens.tone.panelSurface)}>
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  {item.description ? <p className={cn("mt-3 text-sm leading-7", tokens.tone.muted)}>{item.description}</p> : null}
                  {item.meta ? <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">{item.meta}</p> : null}
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "testimonials":
      return (
        <section className={tokens.sectionSpacing}>
          <div className="mx-auto max-w-5xl px-6">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">{section.content.heading}</h2>
              {section.content.subheading ? <p className={cn("text-sm leading-7", tokens.tone.muted)}>{section.content.subheading}</p> : null}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {section.content.items.map((item) => (
                <blockquote key={`${item.author}-${item.quote}`} className={cn("border p-6 shadow-sm", tokens.radius, tokens.tone.border, tokens.tone.panelSurface)}>
                  <p className="text-lg leading-8">{item.quote}</p>
                  <footer className={cn("mt-5 text-sm", tokens.tone.muted)}>
                    <span className="font-semibold text-current">{item.author}</span>
                    {item.role ? `, ${item.role}` : ""}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      );
    case "pricing":
      return (
        <section className={tokens.sectionSpacing}>
          <div className="mx-auto max-w-5xl px-6">
            <div className="max-w-2xl space-y-3">
              <h2 className="text-3xl font-semibold tracking-tight">{section.content.heading}</h2>
              {section.content.subheading ? <p className={cn("text-sm leading-7", tokens.tone.muted)}>{section.content.subheading}</p> : null}
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {section.content.plans.map((plan) => (
                <article key={plan.name} className={cn("border p-6 shadow-sm", tokens.radius, tokens.tone.border, tokens.tone.panelSurface)}>
                  <p className="text-xl font-semibold">{plan.name}</p>
                  <p className="mt-3 text-4xl font-semibold">{plan.price}</p>
                  {plan.description ? <p className={cn("mt-3 text-sm leading-7", tokens.tone.muted)}>{plan.description}</p> : null}
                  <ul className={cn("mt-5 space-y-2 text-sm", tokens.tone.muted)}>
                    {plan.features.map((feature) => (
                      <li key={feature}>- {feature}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    case "cta":
      return (
        <section className={tokens.sectionSpacing}>
          <div className="mx-auto max-w-4xl px-6">
            <div className={cn("border px-8 py-12 text-center shadow-sm", tokens.radius, tokens.tone.border, tokens.tone.panelSurface)}>
              <h2 className="text-3xl font-semibold tracking-tight">{section.content.heading}</h2>
              {section.content.body ? <p className={cn("mx-auto mt-4 max-w-2xl text-sm leading-7", tokens.tone.muted)}>{section.content.body}</p> : null}
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a className={cn("rounded-full px-5 py-3 text-sm font-semibold", tokens.tone.accent)} href={section.content.primaryCta.href}>
                  {section.content.primaryCta.label}
                </a>
                {section.content.secondaryCta ? (
                  <a className={cn("rounded-full px-5 py-3 text-sm font-semibold", tokens.tone.secondary)} href={section.content.secondaryCta.href}>
                    {section.content.secondaryCta.label}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      );
    case "footer":
      return (
        <footer className={cn("border-t", tokens.tone.border)}>
          <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-semibold">{section.content.brandName}</p>
              {section.content.body ? <p className={cn("mt-2 text-sm", tokens.tone.muted)}>{section.content.body}</p> : null}
            </div>
            <nav className="flex flex-wrap gap-3 text-sm">
              {section.content.links.map((link) => (
                <a key={link.label} className={tokens.tone.muted} href={link.href}>
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
        </footer>
      );
    case "generic":
    default:
      return (
        <section className={tokens.sectionSpacing}>
          <div className="mx-auto max-w-5xl px-6">
            <div className={cn("border p-8 shadow-sm", tokens.radius, tokens.tone.border, tokens.tone.panelSurface)} data-testid="generic-preview-section">
              <h2 className="text-3xl font-semibold tracking-tight">{section.content.heading}</h2>
              {section.content.subheading ? <p className={cn("mt-3 text-sm leading-7", tokens.tone.muted)}>{section.content.subheading}</p> : null}
              {section.content.body ? <p className={cn("mt-3 text-sm leading-7", tokens.tone.muted)}>{section.content.body}</p> : null}
              {section.content.items.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {section.content.items.map((item) => (
                    <article key={item.title} className={cn("rounded-2xl border p-4", tokens.tone.border)}>
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.description ? <p className={cn("mt-2 text-sm leading-6", tokens.tone.muted)}>{item.description}</p> : null}
                    </article>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      );
  }
}

export function PreviewRenderer({ project }: { project: LayoutProject }) {
  const tokens = getPreviewTokens(project.style);

  return (
    <div className={cn("min-h-full overflow-hidden rounded-[2rem] border shadow-[0_28px_90px_rgba(28,25,23,0.12)]", tokens.tone.shell, tokens.tone.border)}>
      {project.sections.map((section) => (
        <PreviewSection key={section.id} project={project} section={section} />
      ))}
    </div>
  );
}

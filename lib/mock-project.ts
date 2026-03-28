import type { LayoutProject } from "@/lib/schemas/layout";

export function createMockProject(sourceImageName = "demo-upload.png"): LayoutProject {
  const now = new Date().toISOString();

  return {
    id: "demo-project",
    name: "Screenshot concept",
    sourceImageName,
    createdAt: now,
    updatedAt: now,
    pageType: "landing",
    style: {
      tone: "warm",
      radius: "rounded",
      spacing: "comfortable",
    },
    sections: [
      {
        id: "navbar-1",
        type: "navbar",
        label: "Top navigation",
        layout: "split",
        content: {
          brandName: "SnapLayout",
          links: [
            { label: "Product", href: "#product" },
            { label: "Pricing", href: "#pricing" },
            { label: "Examples", href: "#examples" },
          ],
          primaryCta: { label: "Open workspace", href: "#cta" },
        },
      },
      {
        id: "hero-1",
        type: "hero",
        label: "Hero",
        layout: "two-column",
        content: {
          eyebrow: "From screenshot to structure",
          heading: "Turn visual inspiration into an editable starting point.",
          subheading: "Analyze a screenshot, refine the structure, and export clean React + Tailwind starter code without rebuilding the page by hand.",
          body: "SnapLayout helps indie builders move from reference to working layout faster while keeping the result editable and original.",
          primaryCta: { label: "Analyze screenshot", href: "#cta" },
          secondaryCta: { label: "See pricing", href: "#pricing" },
          highlights: ["Structured JSON output", "Editable preview workspace", "Starter code export"],
        },
      },
      {
        id: "features-1",
        type: "features",
        label: "Core capabilities",
        layout: "grid",
        content: {
          heading: "A faster way to prototype from screenshots",
          subheading: "Use AI for structure, then keep the output firmly in your control.",
          items: [
            {
              title: "Section-aware analysis",
              description: "SnapLayout identifies common landing page sections, content groupings, and hierarchy.",
              meta: "Vision + schema validation",
            },
            {
              title: "Structured editing",
              description: "Update headings, body copy, pricing cards, CTA labels, and section order without touching raw code.",
              meta: "Focused V1 editing model",
            },
            {
              title: "Starter code export",
              description: "Generate React + Tailwind output designed for extension instead of one-off copy-paste markup.",
              meta: "Readable and reusable",
            },
          ],
        },
      },
      {
        id: "testimonials-1",
        type: "testimonials",
        label: "Proof",
        layout: "grid",
        content: {
          heading: "Built for builders who work quickly",
          subheading: "The workflow is optimized for shipping, not pixel-perfect cloning.",
          items: [
            {
              quote: "This gives me a usable layout scaffold in minutes instead of a blank file.",
              author: "Ava Lin",
              role: "Indie SaaS founder",
            },
            {
              quote: "The structure panel made it easy to turn a reference into something original.",
              author: "Marcus Hale",
              role: "Freelance product designer",
            },
          ],
        },
      },
      {
        id: "pricing-1",
        type: "pricing",
        label: "Pricing",
        layout: "cards",
        content: {
          heading: "Start free, upgrade when the workflow sticks",
          subheading: "Realistic V1 packaging with room for future billing integration.",
          plans: [
            {
              name: "Free",
              price: "$0",
              description: "For trying the workflow and testing layout ideas.",
              features: ["3 analyses per day", "Editable workspace", "Local export"],
              cta: { label: "Start free", href: "#cta" },
            },
            {
              name: "Pro",
              price: "$24/mo",
              description: "For makers who use screenshots as a regular prototyping input.",
              features: ["Unlimited analyses", "Higher code generation quality", "Priority support"],
              cta: { label: "Join waitlist", href: "#cta" },
            },
          ],
        },
      },
      {
        id: "cta-1",
        type: "cta",
        label: "Closing CTA",
        layout: "stack",
        content: {
          heading: "Bring your next layout idea into focus faster.",
          body: "Upload a screenshot, refine the structure, and leave with starter code you can actually build on.",
          primaryCta: { label: "Open the workspace", href: "/app" },
          secondaryCta: { label: "View pricing", href: "/pricing" },
        },
      },
      {
        id: "footer-1",
        type: "footer",
        label: "Footer",
        layout: "split",
        content: {
          brandName: "SnapLayout",
          body: "Turn screenshots into editable layouts and structured starter code.",
          links: [
            { label: "Pricing", href: "/pricing" },
            { label: "Workspace", href: "/app" },
            { label: "Privacy", href: "#" },
          ],
        },
      },
    ],
  };
}

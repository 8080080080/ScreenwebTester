import {
  analysisResultSchema,
  type LayoutAnalysisResult,
  type LayoutSection,
  pageTypeSchema,
  radiusPresetSchema,
  sectionTypeSchema,
  spacingPresetSchema,
  tonePresetSchema,
} from "@/lib/schemas/layout";
import { sanitizePlainText, sanitizeUrl } from "@/lib/sanitize";
import { formatSectionType, slugify } from "@/lib/utils";

function readString(value: unknown, fallback = "") {
  return typeof value === "string" ? sanitizePlainText(value) : fallback;
}

function readStringArray(value: unknown) {
  return Array.isArray(value)
    ? value.map((item) => readString(item)).filter(Boolean)
    : [];
}

function normalizeType(value: unknown): LayoutSection["type"] {
  const result = sectionTypeSchema.safeParse(typeof value === "string" ? value.toLowerCase() : value);
  return result.success ? result.data : "generic";
}

function getRecord(value: unknown) {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

function getCta(value: unknown, fallbackLabel: string) {
  const raw = getRecord(value);
  return {
    label: readString(raw.label, fallbackLabel),
    href: sanitizeUrl(readString(raw.href, "#")),
  };
}

function normalizeSection(rawSection: unknown, index: number): LayoutSection {
  const raw = getRecord(rawSection);
  const type = normalizeType(raw.type);
  const label = readString(raw.label, formatSectionType(type));
  const id = readString(raw.id, `${slugify(type)}-${index + 1}`);
  const layout = readString(raw.layout, type === "hero" ? "two-column" : "stack");
  const content = getRecord(raw.content);

  switch (type) {
    case "navbar":
      return {
        id,
        type,
        label,
        layout,
        content: {
          brandName: readString(content.brandName, "Brand"),
          links: (Array.isArray(content.links) ? content.links : [])
            .map((item, itemIndex) => {
              const rawLink = getRecord(item);
              return {
                label: readString(rawLink.label, `Link ${itemIndex + 1}`),
                href: sanitizeUrl(readString(rawLink.href, "#")),
              };
            })
            .filter((item) => item.label)
            .slice(0, 6),
          primaryCta: Object.keys(getRecord(content.primaryCta)).length > 0 ? getCta(content.primaryCta, "Get started") : undefined,
        },
      };
    case "hero":
      return {
        id,
        type,
        label,
        layout,
        content: {
          eyebrow: readString(content.eyebrow),
          heading: readString(content.heading, "A polished headline goes here"),
          subheading: readString(content.subheading),
          body: readString(content.body),
          primaryCta: Object.keys(getRecord(content.primaryCta)).length > 0 ? getCta(content.primaryCta, "Primary action") : undefined,
          secondaryCta: Object.keys(getRecord(content.secondaryCta)).length > 0 ? getCta(content.secondaryCta, "Secondary action") : undefined,
          highlights: readStringArray(content.highlights).slice(0, 5),
        },
      };
    case "features":
      return {
        id,
        type,
        label,
        layout,
        content: {
          heading: readString(content.heading, "Feature overview"),
          subheading: readString(content.subheading),
          items: (Array.isArray(content.items) ? content.items : [])
            .map((item, itemIndex) => {
              const rawItem = getRecord(item);
              return {
                title: readString(rawItem.title, `Feature ${itemIndex + 1}`),
                description: readString(rawItem.description),
                meta: readString(rawItem.meta),
              };
            })
            .filter((item) => item.title)
            .slice(0, 6),
        },
      };
    case "testimonials":
      return {
        id,
        type,
        label,
        layout,
        content: {
          heading: readString(content.heading, "Customer perspective"),
          subheading: readString(content.subheading),
          items: (Array.isArray(content.items) ? content.items : [])
            .map((item, itemIndex) => {
              const rawItem = getRecord(item);
              return {
                quote: readString(rawItem.quote, `Testimonial ${itemIndex + 1}`),
                author: readString(rawItem.author, `Customer ${itemIndex + 1}`),
                role: readString(rawItem.role),
              };
            })
            .filter((item) => item.quote)
            .slice(0, 6),
        },
      };
    case "pricing":
      return {
        id,
        type,
        label,
        layout,
        content: {
          heading: readString(content.heading, "Pricing"),
          subheading: readString(content.subheading),
          plans: (Array.isArray(content.plans) ? content.plans : [])
            .map((plan, planIndex) => {
              const rawPlan = getRecord(plan);
              return {
                name: readString(rawPlan.name, `Plan ${planIndex + 1}`),
                price: readString(rawPlan.price, "$0"),
                description: readString(rawPlan.description),
                features: readStringArray(rawPlan.features),
                cta: getCta(rawPlan.cta, "Choose plan"),
              };
            })
            .filter((plan) => plan.name)
            .slice(0, 4),
        },
      };
    case "cta":
      return {
        id,
        type,
        label,
        layout,
        content: {
          heading: readString(content.heading, "A clear closing prompt"),
          body: readString(content.body),
          primaryCta: getCta(content.primaryCta, "Get started"),
          secondaryCta: Object.keys(getRecord(content.secondaryCta)).length > 0 ? getCta(content.secondaryCta, "Learn more") : undefined,
        },
      };
    case "footer":
      return {
        id,
        type,
        label,
        layout,
        content: {
          brandName: readString(content.brandName, "Brand"),
          body: readString(content.body),
          links: (Array.isArray(content.links) ? content.links : [])
            .map((item, itemIndex) => {
              const rawLink = getRecord(item);
              return {
                label: readString(rawLink.label, `Footer link ${itemIndex + 1}`),
                href: sanitizeUrl(readString(rawLink.href, "#")),
              };
            })
            .filter((item) => item.label)
            .slice(0, 8),
        },
      };
    case "generic":
    default:
      return {
        id,
        type: "generic",
        label,
        layout,
        content: {
          heading: readString(content.heading || raw.heading, "Content section"),
          subheading: readString(content.subheading),
          body: readString(content.body),
          items: (Array.isArray(content.items) ? content.items : [])
            .map((item, itemIndex) => {
              const rawItem = getRecord(item);
              return {
                title: readString(rawItem.title, `Item ${itemIndex + 1}`),
                description: readString(rawItem.description),
                meta: readString(rawItem.meta),
              };
            })
            .filter((item) => item.title)
            .slice(0, 6),
        },
      };
  }
}

export function normalizeAnalysisInput(input: unknown): LayoutAnalysisResult {
  const direct = analysisResultSchema.safeParse(input);

  if (direct.success) {
    return direct.data;
  }

  const raw = getRecord(input);
  const rawStyle = getRecord(raw.style);
  const rawSections = Array.isArray(raw.sections) ? raw.sections : [];
  const pageTypeResult = pageTypeSchema.safeParse(readString(raw.pageType, "marketing").toLowerCase());
  const toneResult = tonePresetSchema.safeParse(readString(rawStyle.tone, "warm").toLowerCase());
  const radiusResult = radiusPresetSchema.safeParse(readString(rawStyle.radius, "rounded").toLowerCase());
  const spacingResult = spacingPresetSchema.safeParse(readString(rawStyle.spacing, "comfortable").toLowerCase());

  return analysisResultSchema.parse({
    pageType: pageTypeResult.success ? pageTypeResult.data : "marketing",
    style: {
      tone: toneResult.success ? toneResult.data : "warm",
      radius: radiusResult.success ? radiusResult.data : "rounded",
      spacing: spacingResult.success ? spacingResult.data : "comfortable",
    },
    sections: rawSections.length > 0
      ? rawSections.map(normalizeSection)
      : [normalizeSection({ type: "generic", label: "Content", content: { heading: "Generated content block" } }, 0)],
  });
}

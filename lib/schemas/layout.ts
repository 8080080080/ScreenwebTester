import { z } from "zod";

export const pageTypeSchema = z.enum(["landing", "pricing", "marketing", "product", "dashboard", "unknown"]);
export const sectionTypeSchema = z.enum(["navbar", "hero", "features", "testimonials", "pricing", "cta", "footer", "generic"]);
export const tonePresetSchema = z.enum(["warm", "graphite", "linen"]);
export const radiusPresetSchema = z.enum(["soft", "rounded", "square"]);
export const spacingPresetSchema = z.enum(["compact", "comfortable", "airy"]);

export const ctaSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const listItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().default(""),
  meta: z.string().default(""),
});

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const styleSchema = z.object({
  tone: tonePresetSchema.default("warm"),
  radius: radiusPresetSchema.default("rounded"),
  spacing: spacingPresetSchema.default("comfortable"),
});

const baseSectionSchema = z.object({
  id: z.string().min(1),
  type: sectionTypeSchema,
  label: z.string().min(1),
  layout: z.string().min(1).default("stack"),
});

export const navbarSectionSchema = baseSectionSchema.extend({
  type: z.literal("navbar"),
  content: z.object({
    brandName: z.string().min(1),
    links: z.array(navLinkSchema).min(1),
    primaryCta: ctaSchema.optional(),
  }),
});

export const heroSectionSchema = baseSectionSchema.extend({
  type: z.literal("hero"),
  content: z.object({
    eyebrow: z.string().default(""),
    heading: z.string().min(1),
    subheading: z.string().default(""),
    body: z.string().default(""),
    primaryCta: ctaSchema.optional(),
    secondaryCta: ctaSchema.optional(),
    highlights: z.array(z.string().min(1)).default([]),
  }),
});

export const featuresSectionSchema = baseSectionSchema.extend({
  type: z.literal("features"),
  content: z.object({
    heading: z.string().min(1),
    subheading: z.string().default(""),
    items: z.array(listItemSchema).min(1),
  }),
});

export const testimonialsSectionSchema = baseSectionSchema.extend({
  type: z.literal("testimonials"),
  content: z.object({
    heading: z.string().min(1),
    subheading: z.string().default(""),
    items: z.array(
      z.object({
        quote: z.string().min(1),
        author: z.string().min(1),
        role: z.string().default(""),
      }),
    ).min(1),
  }),
});

export const pricingSectionSchema = baseSectionSchema.extend({
  type: z.literal("pricing"),
  content: z.object({
    heading: z.string().min(1),
    subheading: z.string().default(""),
    plans: z.array(
      z.object({
        name: z.string().min(1),
        price: z.string().min(1),
        description: z.string().default(""),
        features: z.array(z.string().min(1)).default([]),
        cta: ctaSchema,
      }),
    ).min(1),
  }),
});

export const ctaSectionSchema = baseSectionSchema.extend({
  type: z.literal("cta"),
  content: z.object({
    heading: z.string().min(1),
    body: z.string().default(""),
    primaryCta: ctaSchema,
    secondaryCta: ctaSchema.optional(),
  }),
});

export const footerSectionSchema = baseSectionSchema.extend({
  type: z.literal("footer"),
  content: z.object({
    brandName: z.string().min(1),
    body: z.string().default(""),
    links: z.array(navLinkSchema).default([]),
  }),
});

export const genericSectionSchema = baseSectionSchema.extend({
  type: z.literal("generic"),
  content: z.object({
    heading: z.string().min(1),
    subheading: z.string().default(""),
    body: z.string().default(""),
    items: z.array(listItemSchema).default([]),
  }),
});

export const layoutSectionSchema = z.discriminatedUnion("type", [
  navbarSectionSchema,
  heroSectionSchema,
  featuresSectionSchema,
  testimonialsSectionSchema,
  pricingSectionSchema,
  ctaSectionSchema,
  footerSectionSchema,
  genericSectionSchema,
]);

export const analysisResultSchema = z.object({
  pageType: pageTypeSchema.default("marketing"),
  style: styleSchema.default({
    tone: "warm",
    radius: "rounded",
    spacing: "comfortable",
  }),
  sections: z.array(layoutSectionSchema).min(1),
});

export const projectSchema = analysisResultSchema.extend({
  id: z.string().min(1),
  name: z.string().min(1),
  sourceImageName: z.string().default(""),
  createdAt: z.string().min(1),
  updatedAt: z.string().min(1),
});

export type LayoutStyle = z.infer<typeof styleSchema>;
export type LayoutSection = z.infer<typeof layoutSectionSchema>;
export type LayoutAnalysisResult = z.infer<typeof analysisResultSchema>;
export type LayoutProject = z.infer<typeof projectSchema>;

import type { LayoutStyle } from "@/lib/schemas/layout";

export function getPreviewTokens(style: LayoutStyle) {
  const tone = {
    warm: {
      shell: "bg-stone-50 text-stone-950",
      heroSurface: "bg-white/90",
      panelSurface: "bg-white/92",
      muted: "text-stone-600",
      border: "border-stone-200/90",
      chip: "bg-stone-100 text-stone-700",
      accent: "bg-amber-600 text-white",
      accentSoft: "bg-amber-100 text-amber-900",
      secondary: "bg-stone-900 text-stone-50",
    },
    graphite: {
      shell: "bg-slate-950 text-slate-50",
      heroSurface: "bg-slate-900",
      panelSurface: "bg-slate-900/95",
      muted: "text-slate-300",
      border: "border-slate-800",
      chip: "bg-slate-800 text-slate-200",
      accent: "bg-amber-500 text-slate-950",
      accentSoft: "bg-slate-800 text-amber-200",
      secondary: "bg-slate-50 text-slate-950",
    },
    linen: {
      shell: "bg-orange-50 text-stone-950",
      heroSurface: "bg-white",
      panelSurface: "bg-white/95",
      muted: "text-stone-600",
      border: "border-orange-100",
      chip: "bg-orange-100 text-stone-700",
      accent: "bg-stone-950 text-orange-50",
      accentSoft: "bg-orange-100 text-stone-950",
      secondary: "bg-stone-900 text-orange-50",
    },
  }[style.tone];

  const radius = {
    soft: "rounded-2xl",
    rounded: "rounded-3xl",
    square: "rounded-xl",
  }[style.radius];

  const sectionSpacing = {
    compact: "py-12",
    comfortable: "py-16",
    airy: "py-20",
  }[style.spacing];

  return {
    tone,
    radius,
    sectionSpacing,
  };
}

/**
 * Theme Contract
 * --------------
 * The single interface every theme MUST implement. Themes are pure
 * configuration: no JSX, no business logic, no data access.
 *
 * Shape:
 * {
 *   id, name,
 *   colors: { primary, secondary, accent, background, surface, border,
 *             text, textMuted, success, warning, error, gradient },
 *   typography: { heading, body, scale: { xs..6xl }, weight, tracking },
 *   spacing: { section, gap, page },
 *   radius: { sm, md, lg, xl, pill },
 *   shadows: { sm, md, lg },
 *   assets: { backgroundImage, divider, motif, icons },
 *   animations: { enabled, duration, easing, entrance },
 *   layout: { variant, maxWidth, align, sectionOrder },
 *   componentVariants: { card, button, heading, image, badge }
 * }
 */

export const THEME_CONTRACT_VERSION = 1;

/** Base defaults — every theme is merged on top of this. */
export const BASE_THEME = {
  id: "base",
  name: "Base",
  version: THEME_CONTRACT_VERSION,

  colors: {
    primary: "#8f201a",
    secondary: "#4a0f0e",
    accent: "#d4a24c",
    background: "#0b0b0d",
    surface: "rgba(255,255,255,0.05)",
    border: "rgba(255,255,255,0.10)",
    text: "#fdf6ec",
    textMuted: "rgba(255,255,255,0.65)",
    success: "#3fa87a",
    warning: "#e0a83c",
    error: "#d1483f",
    gradient: "from-slate-900 via-slate-950 to-black",
  },

  typography: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    scale: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.5rem",
      "2xl": "2rem",
      "3xl": "2.5rem",
      "4xl": "3.25rem",
      "5xl": "4rem",
    },
    weight: { normal: 400, medium: 500, bold: 700, black: 900 },
    tracking: { tight: "-0.02em", normal: "0", wide: "0.2em", widest: "0.4em" },
  },

  spacing: {
    page: "1.5rem",
    section: "4rem",
    gap: "1rem",
  },

  radius: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    pill: "999px",
  },

  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.20)",
    md: "0 8px 24px rgba(0,0,0,0.28)",
    lg: "0 24px 60px rgba(0,0,0,0.45)",
  },

  assets: {
    backgroundImage: null,
    divider: null,
    motif: null,
    icons: {},
  },

  animations: {
    enabled: true,
    duration: "600ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    entrance: "fade-up",
  },

  layout: {
    variant: "stacked",
    maxWidth: "72rem",
    align: "center",
    sectionOrder: null, // null => use invitation config
  },

  componentVariants: {
    card: "glass",
    button: "solid",
    heading: "display",
    image: "rounded",
    badge: "outline",
  },
};

/** Deep merge helper used by the theme engine (plain objects only). */
export function mergeTheme(base, override = {}) {
  const out = Array.isArray(base) ? [...base] : { ...base };
  for (const [k, v] of Object.entries(override || {})) {
    if (v && typeof v === "object" && !Array.isArray(v) && typeof out[k] === "object" && out[k] !== null) {
      out[k] = mergeTheme(out[k], v);
    } else if (v !== undefined && v !== null) {
      out[k] = v;
    }
  }
  return out;
}

/** Runtime validation — returns { valid, errors }. Never throws. */
export function validateTheme(theme) {
  const errors = [];
  const required = ["id", "colors", "typography", "spacing", "radius", "shadows", "layout", "componentVariants"];
  required.forEach((key) => {
    if (!theme || theme[key] === undefined) errors.push(`Missing "${key}"`);
  });
  return { valid: errors.length === 0, errors };
}

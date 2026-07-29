/**
 * Theme Registry
 * --------------
 * Configuration-only theme catalogue. Adding a theme = adding a config object
 * here (or calling registerTheme at runtime). No renderer/component changes.
 */
import { BASE_THEME, mergeTheme, validateTheme } from "./themeContract";

const registry = new Map();

/** Register (or override) a theme. Themes are merged onto BASE_THEME. */
export function registerTheme(config) {
  if (!config?.id) return null;
  const theme = mergeTheme(BASE_THEME, config);
  const { valid, errors } = validateTheme(theme);
  if (!valid) {
    // Non-fatal: keep the platform running with a base-safe theme.
    console.warn(`[themeRegistry] invalid theme "${config.id}":`, errors);
  }
  registry.set(theme.id, theme);
  return theme;
}

export function getTheme(id) {
  return registry.get(id) || null;
}

export function listThemes() {
  return Array.from(registry.values()).map(({ id, name }) => ({ id, name }));
}

export const DEFAULT_THEME_ID = "royal-maroon";

/* ------------------------------------------------------------------ */
/* Built-in themes                                                     */
/* ------------------------------------------------------------------ */

registerTheme({
  id: "royal-maroon",
  name: "Royal Maroon",
  colors: {
    primary: "#8f201a",
    secondary: "#4a0f0e",
    accent: "#d4a24c",
    text: "#fdf6ec",
    gradient: "from-[#4a0f0e] via-[#8f201a] to-[#4a0f0e]",
  },
  typography: { heading: "'Playfair Display', Georgia, serif" },
  componentVariants: { card: "glass", heading: "display" },
});

registerTheme({
  id: "minimal-ivory",
  name: "Minimal Ivory",
  colors: {
    primary: "#1f2933",
    secondary: "#52606d",
    accent: "#b08968",
    background: "#f7f3ee",
    surface: "rgba(31,41,51,0.04)",
    border: "rgba(31,41,51,0.12)",
    text: "#1f2933",
    textMuted: "rgba(31,41,51,0.65)",
    gradient: "from-[#f7f3ee] via-[#efe8df] to-[#f7f3ee]",
  },
  typography: {
    heading: "'Cormorant Garamond', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    tracking: { widest: "0.3em" },
  },
  radius: { md: "0.75rem", lg: "1rem", xl: "1.25rem" },
  animations: { entrance: "fade" },
  componentVariants: { card: "outline", heading: "serif", badge: "soft" },
});

registerTheme({
  id: "midnight-emerald",
  name: "Midnight Emerald",
  colors: {
    primary: "#0f5132",
    secondary: "#06281a",
    accent: "#8fd6a9",
    background: "#04120c",
    text: "#eafaf0",
    gradient: "from-[#04120c] via-[#0f5132] to-[#04120c]",
  },
  typography: { heading: "'Space Grotesk', system-ui, sans-serif" },
  componentVariants: { card: "glass", heading: "modern" },
});

export default registry;

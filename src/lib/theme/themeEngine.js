/**
 * Theme Engine
 * ------------
 * Resolves a theme for an invitation and projects it into design tokens
 * (CSS custom properties + JS token object). Presentation lives here only.
 */
import { BASE_THEME, mergeTheme } from "./themeContract";
import { getTheme, DEFAULT_THEME_ID } from "./themeRegistry";

/**
 * Backward compatibility adapter.
 * Legacy invitations carry `theme: { primary, accent, bg, text, font }`.
 * Map that flat shape onto the theme contract without breaking anything.
 */
export function adaptLegacyTheme(legacy = {}) {
  if (!legacy || typeof legacy !== "object") return {};
  const isLegacy =
    legacy.primary || legacy.accent || legacy.bg || legacy.text || legacy.font;
  if (!isLegacy) return legacy;

  return {
    colors: {
      ...(legacy.primary ? { primary: legacy.primary } : {}),
      ...(legacy.accent ? { accent: legacy.accent } : {}),
      ...(legacy.text ? { text: legacy.text } : {}),
      ...(legacy.bg ? { gradient: legacy.bg } : {}),
    },
    ...(legacy.font ? { typography: { heading: legacy.font } } : {}),
  };
}

/**
 * Resolve the effective theme for an invitation.
 * Priority: registered theme (themeId) -> legacy inline overrides -> base.
 */
export function resolveTheme(invitation) {
  const themeId =
    invitation?.themeId || invitation?.theme?.id || DEFAULT_THEME_ID;
  const registered = getTheme(themeId) || getTheme(DEFAULT_THEME_ID) || BASE_THEME;
  const overrides = adaptLegacyTheme(invitation?.theme);
  return mergeTheme(registered, overrides);
}

/** Flatten a resolved theme into CSS custom properties. */
export function toCssVariables(theme) {
  const t = theme || BASE_THEME;
  const vars = {};
  Object.entries(t.colors || {}).forEach(([k, v]) => {
    if (k !== "gradient") vars[`--inv-color-${kebab(k)}`] = v;
  });
  Object.entries(t.radius || {}).forEach(([k, v]) => (vars[`--inv-radius-${k}`] = v));
  Object.entries(t.shadows || {}).forEach(([k, v]) => (vars[`--inv-shadow-${k}`] = v));
  Object.entries(t.spacing || {}).forEach(([k, v]) => (vars[`--inv-space-${k}`] = v));
  Object.entries(t.typography?.scale || {}).forEach(
    ([k, v]) => (vars[`--inv-text-${k}`] = v)
  );
  vars["--inv-font-heading"] = t.typography?.heading;
  vars["--inv-font-body"] = t.typography?.body;
  vars["--inv-anim-duration"] = t.animations?.duration;
  vars["--inv-anim-easing"] = t.animations?.easing;
  vars["--inv-max-width"] = t.layout?.maxWidth;
  return vars;
}

/** Component style tokens derived from theme variants — consumed by sections. */
export function buildStyleTokens(theme) {
  const t = theme || BASE_THEME;
  const variant = t.componentVariants || {};

  const cardBase = "backdrop-blur-sm transition-colors";
  const cardByVariant = {
    glass: "border border-[var(--inv-color-border)] bg-[var(--inv-color-surface)]",
    outline: "border border-[var(--inv-color-border)] bg-transparent",
    solid: "border border-transparent bg-[var(--inv-color-surface)]",
    flat: "border-0 bg-transparent",
  };

  return {
    card: {
      className: `${cardBase} ${cardByVariant[variant.card] || cardByVariant.glass}`,
      style: {
        borderRadius: "var(--inv-radius-lg)",
        boxShadow: "var(--inv-shadow-md)",
      },
    },
    section: {
      style: {
        paddingTop: "var(--inv-space-section)",
        paddingBottom: "var(--inv-space-section)",
        paddingLeft: "var(--inv-space-page)",
        paddingRight: "var(--inv-space-page)",
        maxWidth: "var(--inv-max-width)",
        marginInline: "auto",
      },
    },
    heading: {
      style: {
        fontFamily: "var(--inv-font-heading)",
        color: "var(--inv-color-text)",
        letterSpacing: t.typography?.tracking?.tight,
      },
    },
    body: {
      style: { fontFamily: "var(--inv-font-body)", color: "var(--inv-color-text-muted)" },
    },
    accent: { style: { color: "var(--inv-color-accent)" } },
    badge: {
      style: {
        borderRadius: "var(--inv-radius-pill)",
        borderColor: "var(--inv-color-accent)",
        color: "var(--inv-color-accent)",
      },
    },
    image: {
      style: {
        borderRadius: variant.image === "square" ? "0px" : "var(--inv-radius-md)",
      },
    },
    entrance: t.animations?.enabled ? t.animations.entrance : null,
  };
}

function kebab(s) {
  return s.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

/**
 * ThemeService
 * ------------
 * Orchestrates the Theme Engine + registry. Owns no theme logic.
 */
import { resolveTheme as engineResolveTheme, listThemes as registryListThemes, getTheme, DEFAULT_THEME_ID } from "../../lib/theme";
import { toInvitationView } from "../../domain/event";
import { updateEvent } from "../event/EventService";
import { ok, fail } from "../result";

export function listThemes() {
  return ok(registryListThemes());
}

/** Accepts an Event or an invitation view. */
export function resolveTheme(source, themeId) {
  if (!source) return getTheme(themeId || DEFAULT_THEME_ID);
  const view = source.event ? source : toInvitationView(source) || source;
  return engineResolveTheme(themeId ? { ...view, themeId } : view);
}

export function validateTheme(themeId) {
  const theme = getTheme(themeId);
  const errors = [];
  if (!theme) errors.push(`Unknown theme "${themeId}"`);
  else {
    if (!theme.colors) errors.push("Theme is missing colors");
    if (!theme.fonts) errors.push("Theme is missing fonts");
  }
  return errors.length ? fail(errors.join("; ")) : ok(theme);
}

export function assignTheme(idOrSlug, themeId) {
  const validation = validateTheme(themeId);
  if (!validation.ok) return validation;
  return updateEvent(idOrSlug, { themeId });
}

export default { listThemes, resolveTheme, validateTheme, assignTheme };

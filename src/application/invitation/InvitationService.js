/**
 * InvitationService
 * -----------------
 * Prepares everything the renderer needs. The renderer consumes only the
 * view model produced here.
 */
import { getEvent } from "../event/EventService";
import { buildInvitationViewModel } from "./viewModel";
import { resolveTheme as themeResolve } from "../theme/ThemeService";
import { evaluateRules } from "../../lib/rules";
import { toInvitationView } from "../../domain/event";
import { ok, fail } from "../result";

export function loadInvitation(idOrSlug = "default") {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  return ok(toInvitationView(result.data));
}

/** Prepared view model for the renderer (published mode). */
export function prepareRendererInput(idOrSlug = "default", options = {}) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  const vm = buildInvitationViewModel(result.data, options);
  return vm ? ok(vm) : fail("Could not build view model");
}

/** Preview mode ignores publish gating (draft-friendly). */
export function previewInvitation(idOrSlug = "default", options = {}) {
  return prepareRendererInput(idOrSlug, { ...options, mode: options.mode || "draft" });
}

export function resolveTheme(idOrSlug, themeId) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  return ok(themeResolve(result.data, themeId));
}

export function resolveRules(idOrSlug, overrides) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  const view = toInvitationView(result.data);
  return ok(evaluateRules(view, overrides ? { overrides } : {}));
}

export { buildInvitationViewModel };

export default {
  loadInvitation,
  previewInvitation,
  resolveTheme,
  resolveRules,
  prepareRendererInput,
};

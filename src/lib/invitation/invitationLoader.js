/**
 * Invitation Loader (LEGACY / BACKWARD COMPATIBLE)
 * ------------------------------------------------
 * Deprecated: the Event domain is now the single source of truth.
 * This module remains as a thin adapter over `domain/event` so existing
 * imports keep working. New code should use `useEvent` / `loadEvent`.
 */
import { loadEvent, normalizeEvent, toInvitationView } from "../../domain/event";

/** @deprecated use loadEvent(id) + toInvitationView(event) */
export function loadInvitation(id = "default") {
  const event = loadEvent(id);
  return event ? toInvitationView(event) : null;
}

/** @deprecated use normalizeEvent(raw) */
export function normalize(raw) {
  const event = normalizeEvent(raw);
  return event ? toInvitationView(event) : null;
}

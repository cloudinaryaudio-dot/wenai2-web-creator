/**
 * PublishService
 * --------------
 * Publishing workflow. Lifecycle rules stay in the domain.
 */
import { EVENT_STATUS, transition, validateEvent } from "../../domain/event";
import { getEvent } from "../event/EventService";
import { getAppContext } from "../context";
import { ok, fail } from "../result";

export function validatePublishReadiness(idOrSlug) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  const event = result.data;
  const validation = validateEvent(event);
  const blockers = [...validation.errors];
  if (!event.invitation?.hero) blockers.push("Invitation hero is missing");
  if (!event.invitation?.sections?.length) blockers.push("No sections configured");
  return blockers.length
    ? fail(blockers.join("; "), { blockers, warnings: validation.warnings })
    : ok({ ready: true, warnings: validation.warnings });
}

export function publish(idOrSlug, { force = false } = {}) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  if (!force) {
    const readiness = validatePublishReadiness(idOrSlug);
    if (!readiness.ok) return readiness;
  }
  return applyTransition(result.data, EVENT_STATUS.PUBLISHED);
}

export function unpublish(idOrSlug) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  return applyTransition(result.data, EVENT_STATUS.DRAFT);
}

/** Extension point only — scheduling infrastructure is injected later. */
export function schedulePublish(idOrSlug, when) {
  const { scheduler } = getAppContext();
  try {
    return ok(scheduler.schedule({ type: "publish", target: idOrSlug, when }));
  } catch (err) {
    return fail(err?.message || "Scheduling not available");
  }
}

function applyTransition(event, to) {
  const res = transition(event, to);
  if (!res.ok) return fail(res.error);
  const saved = getAppContext().storage.saveEvent(res.event);
  if (!saved) return fail("Could not persist event");
  getAppContext().notifications?.emit?.({ type: `event.${to}`, eventId: saved.id });
  return ok(saved);
}

export default { publish, unpublish, schedulePublish, validatePublishReadiness };

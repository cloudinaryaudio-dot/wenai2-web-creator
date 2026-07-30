/**
 * EventService
 * ------------
 * Orchestrates the Event domain + storage. Owns no business rules.
 */
import {
  createEvent as domainCreateEvent,
  duplicateEvent as domainDuplicateEvent,
  normalizeEvent,
  validateEvent as domainValidateEvent,
  archive as domainArchive,
  restore as domainRestore,
  EVENT_STATUS,
} from "../../domain/event";
import { getAppContext } from "../context";
import { ok, fail } from "../result";

function storage() {
  return getAppContext().storage;
}

export function getEvent(idOrSlug = "default") {
  const event = storage().loadEvent(idOrSlug);
  return event ? ok(event) : fail(`Event "${idOrSlug}" not found`);
}

export function listEvents() {
  return ok(storage().loadEvents());
}

export function createEvent(input = {}) {
  const event = domainCreateEvent({ ...input, owner: input.owner ?? currentOwner() });
  const validation = domainValidateEvent(event);
  const saved = storage().saveEvent(event);
  return saved ? ok(saved, { warnings: validation.warnings }) : fail("Could not persist event");
}

export function duplicateEvent(idOrSlug, overrides = {}) {
  const source = storage().loadEvent(idOrSlug);
  if (!source) return fail(`Event "${idOrSlug}" not found`);
  const copy = domainDuplicateEvent(source, overrides);
  const saved = storage().saveEvent(copy);
  return saved ? ok(saved) : fail("Could not persist duplicate");
}

export function updateEvent(idOrSlug, patch = {}) {
  const source = storage().loadEvent(idOrSlug);
  if (!source) return fail(`Event "${idOrSlug}" not found`);
  const next = normalizeEvent({
    ...source,
    ...patch,
    id: source.id,
    updatedAt: new Date(getAppContext().now()).toISOString(),
  });
  const validation = domainValidateEvent(next);
  if (!validation.valid) return fail(validation.errors.join("; "));
  const saved = storage().saveEvent(next);
  return saved ? ok(saved, { warnings: validation.warnings }) : fail("Could not persist event");
}

/** Patch a single module (invitation, schedule, gallery, …). */
export function updateModule(idOrSlug, moduleName, value) {
  return updateEvent(idOrSlug, { [moduleName]: value });
}

export function archiveEvent(idOrSlug) {
  return applyTransition(idOrSlug, domainArchive);
}

export function restoreEvent(idOrSlug) {
  return applyTransition(idOrSlug, domainRestore);
}

/** Soft delete only — events are never physically removed. */
export function deleteEvent(idOrSlug) {
  const result = archiveEvent(idOrSlug);
  return result.ok ? ok(result.data, { softDeleted: true }) : result;
}

export function validateEvent(idOrSlug) {
  const event = typeof idOrSlug === "string" ? storage().loadEvent(idOrSlug) : idOrSlug;
  if (!event) return fail("Event not found");
  return ok(domainValidateEvent(event));
}

function applyTransition(idOrSlug, fn) {
  const event = storage().loadEvent(idOrSlug);
  if (!event) return fail(`Event "${idOrSlug}" not found`);
  const result = fn(event);
  if (!result.ok) return fail(result.error);
  const saved = storage().saveEvent(result.event);
  return saved ? ok(saved) : fail("Could not persist event");
}

function currentOwner() {
  return getAppContext().auth?.getCurrentUser?.()?.id || null;
}

export { EVENT_STATUS };

export default {
  getEvent,
  listEvents,
  createEvent,
  duplicateEvent,
  updateEvent,
  updateModule,
  archiveEvent,
  restoreEvent,
  deleteEvent,
  validateEvent,
};

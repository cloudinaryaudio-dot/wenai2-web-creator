/**
 * Event Factory
 * -------------
 * Creates new events from an event type + partial input. The only place that
 * knows how to build a fresh, contract-valid Event.
 */
import { createEmptyEvent } from "./eventContract";
import { normalizeEvent } from "./eventNormalizer";
import { EVENT_STATUS } from "./eventLifecycle";
import { getEventType, DEFAULT_EVENT_TYPE_ID } from "./eventTypeRegistry";
import { DEFAULT_SETTINGS } from "./eventSettings";

function uid(prefix = "evt") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}${Date.now().toString(36).slice(-4)}`;
}

export function createEvent(input = {}) {
  const type = input.type || DEFAULT_EVENT_TYPE_ID;
  const typeConfig = getEventType(type);
  const now = new Date().toISOString();

  const draft = {
    ...createEmptyEvent(),
    id: input.id || uid(),
    type,
    title: input.title || `New ${typeConfig.label}`,
    status: input.status || EVENT_STATUS.DRAFT,
    themeId: input.themeId || typeConfig.defaultTheme,
    createdAt: now,
    updatedAt: now,
    settings: { ...DEFAULT_SETTINGS, ...typeConfig.defaultSettings, ...(input.settings || {}) },
    invitation: {
      ...createEmptyEvent().invitation,
      sections: typeConfig.defaultSections,
      ...(input.invitation || {}),
    },
    ...stripHandled(input),
  };

  return normalizeEvent(draft);
}

function stripHandled(input) {
  const { id, type, title, status, themeId, settings, invitation, createdAt, updatedAt, ...rest } =
    input || {};
  return rest;
}

/** Clone an event as a new draft (never mutates the source). */
export function duplicateEvent(event, overrides = {}) {
  const now = new Date().toISOString();
  return normalizeEvent({
    ...event,
    id: overrides.id || uid(),
    slug: overrides.slug || "",
    title: overrides.title || `${event?.title || "Event"} (Copy)`,
    status: EVENT_STATUS.DRAFT,
    createdAt: now,
    updatedAt: now,
  });
}

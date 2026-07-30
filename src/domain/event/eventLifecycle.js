/**
 * Event Lifecycle
 * ---------------
 * Configuration-driven state machine. Events are never deleted — archiving is
 * the terminal state and is reversible via restore.
 */

export const EVENT_STATUS = {
  DRAFT: "draft",
  PREVIEW: "preview",
  PUBLISHED: "published",
  LIVE: "live",
  COMPLETED: "completed",
  ARCHIVED: "archived",
};

export const LIFECYCLE_ORDER = [
  EVENT_STATUS.DRAFT,
  EVENT_STATUS.PREVIEW,
  EVENT_STATUS.PUBLISHED,
  EVENT_STATUS.LIVE,
  EVENT_STATUS.COMPLETED,
  EVENT_STATUS.ARCHIVED,
];

/** Allowed transitions — configuration, not code branches. */
export const LIFECYCLE_TRANSITIONS = {
  [EVENT_STATUS.DRAFT]: [EVENT_STATUS.PREVIEW, EVENT_STATUS.PUBLISHED, EVENT_STATUS.ARCHIVED],
  [EVENT_STATUS.PREVIEW]: [EVENT_STATUS.DRAFT, EVENT_STATUS.PUBLISHED, EVENT_STATUS.ARCHIVED],
  [EVENT_STATUS.PUBLISHED]: [EVENT_STATUS.LIVE, EVENT_STATUS.COMPLETED, EVENT_STATUS.DRAFT, EVENT_STATUS.ARCHIVED],
  [EVENT_STATUS.LIVE]: [EVENT_STATUS.COMPLETED, EVENT_STATUS.ARCHIVED],
  [EVENT_STATUS.COMPLETED]: [EVENT_STATUS.ARCHIVED, EVENT_STATUS.PUBLISHED],
  [EVENT_STATUS.ARCHIVED]: [EVENT_STATUS.DRAFT],
};

/** Statuses that render publicly. */
export const PUBLIC_STATUSES = [
  EVENT_STATUS.PUBLISHED,
  EVENT_STATUS.LIVE,
  EVENT_STATUS.COMPLETED,
];

export function isValidStatus(status) {
  return LIFECYCLE_ORDER.includes(status);
}

export function canTransition(from, to) {
  return Boolean(LIFECYCLE_TRANSITIONS[from]?.includes(to));
}

/** Returns a new event object; never mutates. */
export function transition(event, to) {
  const from = event?.status || EVENT_STATUS.DRAFT;
  if (!canTransition(from, to)) {
    return { ok: false, event, error: `Illegal transition ${from} -> ${to}` };
  }
  return {
    ok: true,
    event: { ...event, status: to, updatedAt: new Date().toISOString() },
    error: null,
  };
}

export function archive(event) {
  return transition(event, EVENT_STATUS.ARCHIVED);
}

export function restore(event) {
  return transition(event, EVENT_STATUS.DRAFT);
}

/** Primary date of the event (used for derived live/completed state). */
export function getPrimaryDate(event) {
  const iso =
    event?.invitation?.countdown?.targetDate ||
    event?.invitation?.hero?.date ||
    event?.schedule?.[0]?.date ||
    null;
  const ts = iso ? new Date(iso).getTime() : NaN;
  return Number.isNaN(ts) ? null : ts;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * Time-derived status. Only applies to published-family statuses so that
 * drafts/archives are never auto-promoted.
 */
export function deriveStatus(event, now = Date.now()) {
  const status = event?.status || EVENT_STATUS.DRAFT;
  if (!PUBLIC_STATUSES.includes(status)) return status;
  const ts = getPrimaryDate(event);
  if (ts == null) return status;
  if (ts > now) return EVENT_STATUS.PUBLISHED;
  if (now - ts < DAY_MS) return EVENT_STATUS.LIVE;
  return EVENT_STATUS.COMPLETED;
}

export function isPubliclyVisible(event) {
  return PUBLIC_STATUSES.includes(event?.status) || event?.status === EVENT_STATUS.PREVIEW;
}

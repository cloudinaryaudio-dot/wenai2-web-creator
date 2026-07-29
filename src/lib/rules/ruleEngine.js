/**
 * Business Rule Engine
 * --------------------
 * Pure functions. No React, no styling, no storage.
 * The renderer asks the rule engine what may be rendered; components
 * never make business decisions.
 */

export const RULE_KEYS = [
  "showHero",
  "showCouple",
  "showEventDetails",
  "showCountdown",
  "showSchedule",
  "showFamily",
  "showVenue",
  "showGallery",
  "showContact",
  "showMusic",
  "showGift",
  "showRSVP",
  "showFooter",
];

export const PUBLISH_STATE = {
  DRAFT: "draft",
  PUBLISHED: "published",
  ARCHIVED: "archived",
};

export const INVITATION_STATUS = {
  UPCOMING: "upcoming",
  LIVE: "live",
  PAST: "past",
};

/** Derived status from the primary event date. */
export function getInvitationStatus(invitation, now = Date.now()) {
  const iso = invitation?.countdown?.targetDate || invitation?.hero?.date;
  const ts = iso ? new Date(iso).getTime() : NaN;
  if (!ts || Number.isNaN(ts)) return INVITATION_STATUS.UPCOMING;
  if (ts > now) return INVITATION_STATUS.UPCOMING;
  if (now - ts < 24 * 60 * 60 * 1000) return INVITATION_STATUS.LIVE;
  return INVITATION_STATUS.PAST;
}

export function getPublishState(invitation) {
  return invitation?.publishState || PUBLISH_STATE.PUBLISHED;
}

function hasContent(v) {
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === "object") return Object.keys(v).length > 0;
  return Boolean(v);
}

/**
 * Evaluate all rules for an invitation.
 * Priority: explicit rule override -> data availability -> default false.
 */
export function evaluateRules(invitation, options = {}) {
  const now = options.now ?? Date.now();
  const overrides = { ...(invitation?.rules || {}), ...(options.overrides || {}) };
  const status = getInvitationStatus(invitation, now);
  const publishState = getPublishState(invitation);

  const derived = {
    showHero: hasContent(invitation?.hero),
    showCouple: hasContent(invitation?.couple),
    showEventDetails: hasContent(invitation?.eventDetails),
    // Countdown is meaningless once the event has passed.
    showCountdown:
      hasContent(invitation?.countdown) && status !== INVITATION_STATUS.PAST,
    showSchedule: hasContent(invitation?.schedule),
    showFamily: hasContent(invitation?.family),
    showVenue: hasContent(invitation?.venue),
    showGallery: hasContent(invitation?.gallery),
    showContact: hasContent(invitation?.contact),
    showMusic: hasContent(invitation?.music),
    showGift: hasContent(invitation?.gift),
    showRSVP: hasContent(invitation?.rsvp),
    showFooter: hasContent(invitation?.footer),
  };

  const rules = {};
  RULE_KEYS.forEach((key) => {
    rules[key] = overrides[key] !== undefined ? Boolean(overrides[key]) : derived[key];
  });

  return { ...rules, invitationStatus: status, publishState };
}

/** Map a section id to the rule that gates it. */
export const SECTION_RULE_MAP = {
  hero: "showHero",
  couple: "showCouple",
  eventDetails: "showEventDetails",
  countdown: "showCountdown",
  schedule: "showSchedule",
  family: "showFamily",
  venue: "showVenue",
  gallery: "showGallery",
  contact: "showContact",
  music: "showMusic",
  gift: "showGift",
  rsvp: "showRSVP",
  footer: "showFooter",
};

export function canRenderSection(sectionId, rules) {
  const ruleKey = SECTION_RULE_MAP[sectionId];
  if (!ruleKey) return true; // unknown/custom sections are not gated
  return Boolean(rules?.[ruleKey]);
}

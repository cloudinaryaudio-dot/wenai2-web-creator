/**
 * Event Normalizer
 * ----------------
 * Converts ANY raw record (legacy invitation JSON, partial event, future
 * backend row) into the canonical Event contract. Idempotent and pure.
 */
import { createEmptyEvent, EVENT_VISIBILITY } from "./eventContract";
import { EVENT_STATUS, isValidStatus } from "./eventLifecycle";
import { getEventType, hasEventType, DEFAULT_EVENT_TYPE_ID } from "./eventTypeRegistry";

const asArray = (v) => (Array.isArray(v) ? v : []);
const asObject = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : null);

function slugify(value, fallback) {
  const base = String(value || "").trim().toLowerCase();
  const slug = base.replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  return slug || fallback;
}

/** Legacy `publishState` -> lifecycle status. */
function toStatus(raw) {
  const candidate = raw?.status || raw?.publishState;
  if (isValidStatus(candidate)) return candidate;
  if (candidate === "published") return EVENT_STATUS.PUBLISHED;
  return EVENT_STATUS.PUBLISHED; // legacy records were implicitly public
}

/** Legacy `rules` -> settings toggles (backward compatibility). */
const RULE_TO_SETTING = {
  showCountdown: "showCountdown",
  showGallery: "showGallery",
  showVenue: "showVenue",
  showFamily: "showFamily",
  showContact: "showContacts",
  showMusic: "showMusic",
  showStory: "showStory",
};

function legacyRulesToSettings(rules = {}) {
  const settings = {};
  Object.entries(RULE_TO_SETTING).forEach(([ruleKey, settingKey]) => {
    if (typeof rules[ruleKey] === "boolean") settings[settingKey] = rules[ruleKey];
  });
  return settings;
}

/**
 * Normalize a raw record into an Event.
 * Accepts both the new Event shape and the legacy invitation shape.
 */
export function normalizeEvent(raw, options = {}) {
  if (!raw || typeof raw !== "object") return null;

  const base = createEmptyEvent();
  const id = String(raw.id || options.id || "default");
  const type = hasEventType(raw.type || raw.eventType)
    ? raw.type || raw.eventType
    : DEFAULT_EVENT_TYPE_ID;
  const typeConfig = getEventType(type);

  // Modules may live at the root (legacy) or under the module keys (new).
  const invitationRaw = asObject(raw.invitation) || {};
  const hero = asObject(invitationRaw.hero ?? raw.hero);
  const couple = asObject(invitationRaw.couple ?? raw.couple);
  const eventDetails = asObject(invitationRaw.eventDetails ?? raw.eventDetails);
  const countdown = asObject(invitationRaw.countdown ?? raw.countdown);
  const story = asObject(invitationRaw.story ?? raw.story);
  const music = asObject(invitationRaw.music ?? raw.music);
  const footer = asObject(invitationRaw.footer ?? raw.footer);

  const sections =
    asArray(invitationRaw.sections).length
      ? invitationRaw.sections
      : asArray(raw.config?.sections).length
      ? raw.config.sections
      : typeConfig.defaultSections;

  const title =
    raw.title || hero?.title || eventDetails?.title || typeConfig.label;

  const legacySettings = legacyRulesToSettings(raw.rules || {});
  const settings = { ...legacySettings, ...(asObject(raw.settings) || {}) };

  const seoRaw = asObject(raw.seo) || {};

  const event = {
    ...base,
    id,
    slug: raw.slug || slugify(title, id),
    type,
    title,
    status: toStatus(raw),
    visibility: raw.visibility || EVENT_VISIBILITY.PUBLIC,
    owner: raw.owner ?? null,
    themeId: raw.themeId || raw.theme?.id || typeConfig.defaultTheme || null,
    language: raw.language || base.language,
    timezone: raw.timezone || base.timezone,
    createdAt: raw.createdAt || base.createdAt,
    updatedAt: raw.updatedAt || base.updatedAt,

    invitation: {
      hero,
      couple,
      eventDetails,
      countdown,
      story,
      music,
      footer,
      sections,
      theme: asObject(invitationRaw.theme ?? raw.theme) || {},
    },
    schedule: asArray(raw.schedule ?? invitationRaw.schedule),
    venue: asObject(raw.venue ?? invitationRaw.venue),
    gallery: asArray(raw.gallery ?? invitationRaw.gallery),
    family: asArray(raw.family ?? invitationRaw.family),
    contacts: asArray(raw.contacts ?? raw.contact ?? invitationRaw.contacts),
    settings,
    seo: {
      title: seoRaw.title || title,
      description: seoRaw.description || eventDetails?.description || hero?.subtitle || "",
      image: seoRaw.image || hero?.image || "",
      canonical: seoRaw.canonical || "",
      keywords: asArray(seoRaw.keywords),
    },

    extensions: asObject(raw.extensions) || {},
  };

  return event;
}

export function normalizeEvents(rawMap) {
  const out = {};
  Object.entries(rawMap || {}).forEach(([key, raw]) => {
    const event = normalizeEvent(raw, { id: key });
    if (event) out[event.id] = event;
  });
  return out;
}

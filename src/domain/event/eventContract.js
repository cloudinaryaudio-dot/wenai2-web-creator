/**
 * Event Contract
 * --------------
 * The canonical shape of an Event. The Event is the single source of truth of
 * the platform; every higher layer (renderer, admin, SEO) consumes this object
 * and nothing else.
 *
 * Pure data + pure helpers. No React, no storage, no styling.
 */

/** Core metadata keys (non-module fields). */
export const EVENT_CORE_KEYS = [
  "id",
  "slug",
  "type",
  "title",
  "status",
  "visibility",
  "owner",
  "themeId",
  "language",
  "timezone",
  "createdAt",
  "updatedAt",
];

/** Modules owned by the Event today. */
export const EVENT_MODULES = [
  "invitation",
  "schedule",
  "venue",
  "gallery",
  "family",
  "contacts",
  "settings",
  "seo",
];

/**
 * Reserved extension points. These are declared (and preserved through
 * normalization) but intentionally NOT implemented yet.
 */
export const EVENT_EXTENSION_MODULES = [
  "guests",
  "rsvp",
  "analytics",
  "gifts",
  "livestream",
  "payments",
];

export const EVENT_VISIBILITY = {
  PUBLIC: "public",
  UNLISTED: "unlisted",
  PRIVATE: "private",
};

/** Empty (but structurally valid) event. */
export function createEmptyEvent() {
  const now = new Date().toISOString();
  return {
    // core
    id: "",
    slug: "",
    type: "wedding",
    title: "",
    status: "draft",
    visibility: EVENT_VISIBILITY.PUBLIC,
    owner: null,
    themeId: null,
    language: "en",
    timezone: "Asia/Kolkata",
    createdAt: now,
    updatedAt: now,

    // modules
    invitation: {
      hero: null,
      couple: null,
      eventDetails: null,
      countdown: null,
      story: null,
      music: null,
      footer: null,
      sections: [],
      /** legacy inline theme overrides, kept for backward compatibility */
      theme: {},
    },
    schedule: [],
    venue: null,
    gallery: [],
    family: [],
    contacts: [],
    settings: {},
    seo: {
      title: "",
      description: "",
      image: "",
      canonical: "",
      keywords: [],
    },

    // reserved extension points (never implemented here)
    extensions: {},
  };
}

/** Type guard-ish helper used across services. */
export function isEvent(value) {
  return Boolean(value && typeof value === "object" && "type" in value && "status" in value);
}

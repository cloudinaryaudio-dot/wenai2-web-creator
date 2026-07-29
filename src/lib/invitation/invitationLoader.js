/**
 * Invitation Loader
 * -----------------
 * Single abstraction for fetching a normalized Invitation object.
 *
 * The renderer must never know where data comes from. Today the source is
 * localStorage (seeded from mock JSON). Tomorrow it can be Supabase — only
 * this file changes.
 */
import { MOCK_DATA, storageKey } from "../../context/mockData";

const DATASET = "invitations";

function readAll() {
  try {
    const raw = localStorage.getItem(storageKey(DATASET));
    if (raw) return JSON.parse(raw);
  } catch (_) {
    // ignore
  }
  // First-time hydrate from mock so the app is always interactive.
  try {
    localStorage.setItem(storageKey(DATASET), JSON.stringify(MOCK_DATA[DATASET]));
  } catch (_) {
    // ignore
  }
  return MOCK_DATA[DATASET];
}

/**
 * Load a single invitation by id (default: "default").
 * Returns a normalized invitation object or null.
 */
export function loadInvitation(id = "default") {
  const all = readAll() || {};
  const raw = all[id] || all.default || null;
  if (!raw) return null;
  return normalize(raw);
}

/**
 * Normalize any raw invitation record into a stable shape.
 * The renderer depends on this shape, not the source of truth.
 */
export function normalize(raw) {
  return {
    id: raw.id || "default",
    eventType: raw.eventType || "wedding",
    // Presentation reference (theme engine); legacy inline theme still honored.
    themeId: raw.themeId || raw.theme?.id || null,
    theme: raw.theme || {},
    // Behaviour layer (rule engine).
    rules: raw.rules || {},
    publishState: raw.publishState || "published",
    config: raw.config || { sections: [] },

    hero: raw.hero || null,
    couple: raw.couple || null,
    eventDetails: raw.eventDetails || null,
    countdown: raw.countdown || null,
    family: Array.isArray(raw.family) ? raw.family : [],
    schedule: Array.isArray(raw.schedule) ? raw.schedule : [],
    venue: raw.venue || null,
    gallery: Array.isArray(raw.gallery) ? raw.gallery : [],
    contact: Array.isArray(raw.contact) ? raw.contact : [],
    footer: raw.footer || null,
  };
}

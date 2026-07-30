/**
 * Event Loader (Storage Abstraction)
 * ----------------------------------
 * The ONLY module that knows where events are stored.
 * Today: mock JSON seeded into localStorage. Tomorrow: Supabase/REST — swap
 * the `storage` adapter below and nothing else in the platform changes.
 *
 * No UI component may read storage directly.
 */
import { MOCK_DATA, storageKey } from "../../context/mockData";
import { normalizeEvent, normalizeEvents } from "./eventNormalizer";
import { registerEvents, getEventFromRegistry } from "./eventRegistry";

/** Legacy dataset name — kept so existing localStorage data keeps working. */
const LEGACY_DATASET = "invitations";
const EVENTS_DATASET = "events";

/* ------------------------------------------------------------------ */
/* Storage adapter (swappable)                                         */
/* ------------------------------------------------------------------ */

const localStorageAdapter = {
  readAll() {
    const fromEvents = safeRead(EVENTS_DATASET);
    const fromLegacy = safeRead(LEGACY_DATASET);
    if (fromEvents || fromLegacy) return { ...(fromLegacy || {}), ...(fromEvents || {}) };

    // First-time hydrate from mock so the app is always interactive.
    const seed = MOCK_DATA[LEGACY_DATASET] || {};
    safeWrite(LEGACY_DATASET, seed);
    return seed;
  },
  writeAll(map) {
    safeWrite(EVENTS_DATASET, map);
  },
};

let storage = localStorageAdapter;

/** Replace the persistence implementation (e.g. a Supabase adapter). */
export function setEventStorageAdapter(adapter) {
  if (adapter?.readAll && adapter?.writeAll) storage = adapter;
}

function safeRead(dataset) {
  try {
    const raw = localStorage.getItem(storageKey(dataset));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function safeWrite(dataset, value) {
  try {
    localStorage.setItem(storageKey(dataset), JSON.stringify(value));
    return true;
  } catch (err) {
    console.error("[eventLoader] write failed", err);
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

/** Load every event, normalized and registered. */
export function loadEvents() {
  const raw = storage.readAll() || {};
  const events = normalizeEvents(raw);
  registerEvents(events);
  return Object.values(events);
}

/** Load a single event by id or slug. Returns a normalized Event or null. */
export function loadEvent(idOrSlug = "default") {
  const raw = storage.readAll() || {};
  const record = raw[idOrSlug] || findBySlug(raw, idOrSlug) || raw.default || null;
  if (!record) return getEventFromRegistry(idOrSlug);
  const event = normalizeEvent(record, { id: idOrSlug });
  if (event) registerEvents([event]);
  return event;
}

function findBySlug(map, slug) {
  return Object.values(map).find((r) => r?.slug === slug) || null;
}

/** Persist an event (upsert). Events are never deleted — archive instead. */
export function saveEvent(event) {
  const normalized = normalizeEvent(event);
  if (!normalized?.id) return null;
  const all = storage.readAll() || {};
  const next = { ...all, [normalized.id]: normalized };
  storage.writeAll(next);
  registerEvents([normalized]);
  return normalized;
}

/** Async mirror of the API — future backends are async by nature. */
export const eventLoaderAsync = {
  loadEvent: async (idOrSlug) => loadEvent(idOrSlug),
  loadEvents: async () => loadEvents(),
  saveEvent: async (event) => saveEvent(event),
};

/**
 * Event Registry
 * --------------
 * In-memory index of normalized events for the current session.
 * Read-model only: it caches what the loader produced so higher layers can
 * query without touching storage.
 */
import { normalizeEvent } from "./eventNormalizer";

const registry = new Map();
const subscribers = new Set();

function emit() {
  subscribers.forEach((fn) => {
    try {
      fn(listEvents());
    } catch (err) {
      console.error("[eventRegistry] subscriber failed", err);
    }
  });
}

export function registerEvent(raw) {
  const event = normalizeEvent(raw);
  if (!event?.id) return null;
  registry.set(event.id, event);
  if (event.slug) registry.set(`slug:${event.slug}`, event);
  emit();
  return event;
}

export function registerEvents(list) {
  const items = Array.isArray(list) ? list : Object.values(list || {});
  const out = items.map((raw) => {
    const event = normalizeEvent(raw);
    if (!event?.id) return null;
    registry.set(event.id, event);
    if (event.slug) registry.set(`slug:${event.slug}`, event);
    return event;
  });
  emit();
  return out.filter(Boolean);
}

export function getEventFromRegistry(idOrSlug) {
  return registry.get(idOrSlug) || registry.get(`slug:${idOrSlug}`) || null;
}

export function listEvents() {
  return Array.from(new Set(registry.values()));
}

export function clearRegistry() {
  registry.clear();
  emit();
}

export function subscribe(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}

export default registry;

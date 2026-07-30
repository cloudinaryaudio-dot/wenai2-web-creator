/**
 * Content Serializers
 * -------------------
 * Transport boundary. Converts a content document to/from persistable JSON and
 * to the legacy invitation shape consumed by the existing renderer.
 * Pure; storage-agnostic on purpose (localStorage today, Supabase tomorrow).
 */
import { CONTENT_SCHEMA_VERSION } from "../content/contentContract";
import { getSectionType } from "../registry/sectionTypeRegistry";
import { sortSections } from "./sortUtils";

/** Document -> plain JSON-safe object. */
export function serializeContent(document) {
  if (!document) return null;
  return {
    version: CONTENT_SCHEMA_VERSION,
    eventId: document.eventId ?? null,
    locale: document.locale || "en",
    defaultLocale: document.defaultLocale || "en",
    metadata: { ...(document.metadata || {}) },
    extensions: { ...(document.extensions || {}) },
    sections: sortSections(document.sections || []).map((section) => ({
      id: section.id,
      type: section.type,
      enabled: section.enabled !== false,
      order: section.order,
      settings: { ...(section.settings || {}) },
      metadata: { ...(section.metadata || {}) },
      blocks: (section.blocks || []).map((block) => ({
        id: block.id,
        type: block.type,
        value: block.value,
        style: { ...(block.style || {}) },
        visibility: { ...(block.visibility || {}) },
        metadata: { ...(block.metadata || {}) },
      })),
    })),
  };
}

/** JSON string or object -> raw document (feed through normalizeContent). */
export function deserializeContent(input) {
  if (!input) return null;
  if (typeof input === "string") {
    try {
      return JSON.parse(input);
    } catch {
      return null;
    }
  }
  return input;
}

/**
 * Document -> legacy invitation section data map:
 *   { hero: {...}, gallery: [...], ... }
 * This is what keeps the existing renderer and section registry unchanged.
 */
export function toLegacySectionData(document) {
  const out = {};
  (document?.sections || []).forEach((section) => {
    const def = getSectionType(section.type);
    if (!def) return;
    out[section.id] = def.toData(section);
  });
  return out;
}

/** Ordered ids of enabled sections — feeds `config.sections`. */
export function toSectionOrder(document) {
  return sortSections(document?.sections || [])
    .filter((s) => s.enabled !== false)
    .map((s) => s.id);
}

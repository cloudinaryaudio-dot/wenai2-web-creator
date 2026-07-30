/**
 * Content Manager
 * ---------------
 * The CMS engine's application service. Pure functions only:
 * normalize / validate / sort / resolve / serialize / createDefault.
 *
 * Nothing here knows about React, storage, themes or the renderer.
 */
import {
  CONTENT_SCHEMA_VERSION,
  createBlock,
  createContentDocument,
  createSection,
  VISIBILITY,
} from "../content/contentContract";
import { getBlockType } from "../registry/blockTypeRegistry";
import { getSectionType, listSectionTypeIds } from "../registry/sectionTypeRegistry";
import { validateContent } from "../validators/contentValidator";
import { localizeContent } from "../localization/localizationService";
import { sortSections } from "../serializers/sortUtils";

/* ------------------------------ normalize ------------------------------ */

function normalizeBlock(rawBlock, index) {
  if (!rawBlock || typeof rawBlock !== "object") return null;
  const def = getBlockType(rawBlock.type);
  if (!def) return null;
  const base = createBlock(rawBlock.type, def.defaultValue, {
    id: rawBlock.id,
    style: { ...def.defaultStyle, ...(rawBlock.style || {}) },
    visibility: rawBlock.visibility,
    metadata: { order: index, ...(rawBlock.metadata || {}) },
  });
  return { ...base, value: def.normalize(rawBlock.value ?? def.defaultValue) };
}

function normalizeSection(rawSection, index) {
  if (!rawSection || typeof rawSection !== "object") return null;
  const type = rawSection.type || rawSection.id;
  const def = getSectionType(type);
  if (!def) return null;
  const blocks = (Array.isArray(rawSection.blocks) ? rawSection.blocks : [])
    .map(normalizeBlock)
    .filter(Boolean);

  return createSection(type, {
    id: rawSection.id || type,
    enabled: rawSection.enabled !== false,
    order: Number.isFinite(rawSection.order) ? rawSection.order : index,
    blocks: blocks.length ? blocks : def.createDefaultBlocks(),
    settings: { ...def.defaultSettings, ...(rawSection.settings || {}) },
    metadata: { label: def.label, ...(rawSection.metadata || {}) },
  });
}

/**
 * Accepts any raw record (persisted document, partial document, plain array of
 * sections) and returns a canonical content document. Idempotent.
 */
export function normalizeContent(raw, options = {}) {
  const rawDoc = Array.isArray(raw) ? { sections: raw } : raw || {};
  const sections = (Array.isArray(rawDoc.sections) ? rawDoc.sections : [])
    .map(normalizeSection)
    .filter(Boolean);

  const doc = createContentDocument({
    eventId: rawDoc.eventId ?? options.eventId ?? null,
    locale: rawDoc.locale || options.locale || "en",
    defaultLocale: rawDoc.defaultLocale || "en",
    sections: sortSections(sections),
    metadata: rawDoc.metadata,
    extensions: rawDoc.extensions,
  });
  doc.version = CONTENT_SCHEMA_VERSION;
  return doc;
}

/* -------------------------------- sort --------------------------------- */

export { sortSections };

/* ------------------------------- resolve -------------------------------- */

const isBlockVisible = (block) => (block?.visibility?.mode ?? VISIBILITY.ALWAYS) !== VISIBILITY.NEVER;

/**
 * Returns the visible, localized blocks of a section.
 * `predicate` is an optional host-supplied gate (rule engine, scheduling, ...)
 * so the CMS never owns visibility policy.
 */
export function resolveBlocks(section, options = {}) {
  const blocks = (section?.blocks || []).filter(isBlockVisible);
  const predicate = typeof options.predicate === "function" ? options.predicate : () => true;
  return blocks.filter((b) => predicate(b, section));
}

/**
 * Resolves a document into an ordered list of renderable descriptors:
 *   { id, type, settings, metadata, blocks, data }
 * `data` is produced by the section type adapter — the only bridge to the
 * existing section components.
 */
export function resolveContent(document, options = {}) {
  const localized = localizeContent(document, options.locale);
  const predicate = typeof options.sectionPredicate === "function" ? options.sectionPredicate : () => true;

  return sortSections(localized.sections || [])
    .filter((s) => s.enabled !== false)
    .filter((s) => predicate(s))
    .map((section) => {
      const def = getSectionType(section.type);
      const blocks = resolveBlocks(section, options);
      return {
        id: section.id,
        type: section.type,
        settings: section.settings,
        metadata: section.metadata,
        ruleKey: def?.ruleKey || null,
        blocks,
        data: def ? def.toData({ ...section, blocks }) : null,
      };
    });
}

/* --------------------------- create defaults ---------------------------- */

export function createDefaultSection(type, overrides = {}) {
  const def = getSectionType(type);
  if (!def) return null;
  return createSection(type, {
    id: overrides.id || type,
    order: overrides.order,
    blocks: overrides.blocks || def.createDefaultBlocks(),
    settings: { ...def.defaultSettings, ...(overrides.settings || {}) },
    metadata: { label: def.label, ...(overrides.metadata || {}) },
  });
}

/**
 * Builds an empty but structurally valid document for the given section types.
 */
export function createDefaultContent(options = {}) {
  const types = options.sectionTypes?.length ? options.sectionTypes : listSectionTypeIds();
  const sections = types
    .map((type, order) => createDefaultSection(type, { order }))
    .filter(Boolean);
  return createContentDocument({
    eventId: options.eventId ?? null,
    locale: options.locale || "en",
    sections,
    metadata: { title: options.title || null },
  });
}

/* ------------------------------ re-exports ------------------------------ */

export { validateContent };
export { serializeContent, deserializeContent } from "../serializers/contentSerializer";

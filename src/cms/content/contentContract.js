/**
 * CMS Content Contract
 * --------------------
 * The canonical, transport-agnostic content document of an Event.
 * Pure data + pure factories. No React, no storage, no styling.
 *
 * Document -> Sections -> Blocks
 * Every section and every block shares ONE contract. Type-specific behaviour
 * lives in the registries, never in the contract.
 */

export const CONTENT_SCHEMA_VERSION = 1;

/** Section contract keys (closed set). */
export const SECTION_KEYS = [
  "id",
  "type",
  "enabled",
  "order",
  "blocks",
  "settings",
  "metadata",
];

/** Block contract keys (closed set). */
export const BLOCK_KEYS = ["id", "type", "value", "style", "visibility", "metadata"];

export const VISIBILITY = {
  ALWAYS: "always",
  NEVER: "never",
  /** reserved: evaluated by the rule engine / future scheduling engine */
  CONDITIONAL: "conditional",
};

let seq = 0;
/** Deterministic-enough id factory (no crypto dependency). */
export function createId(prefix = "n") {
  seq += 1;
  return `${prefix}_${Date.now().toString(36)}_${seq.toString(36)}`;
}

/**
 * @returns {{id:string,type:string,value:any,style:object,visibility:object,metadata:object}}
 */
export function createBlock(type, value = null, overrides = {}) {
  return {
    id: overrides.id || createId("blk"),
    type,
    value,
    style: overrides.style || {},
    visibility: {
      mode: VISIBILITY.ALWAYS,
      /** reserved extension points, never interpreted here */
      rule: null,
      schedule: null,
      ...(overrides.visibility || {}),
    },
    metadata: {
      locale: null,
      source: "system",
      createdAt: null,
      updatedAt: null,
      ...(overrides.metadata || {}),
    },
  };
}

/**
 * @returns {{id:string,type:string,enabled:boolean,order:number,blocks:object[],settings:object,metadata:object}}
 */
export function createSection(type, overrides = {}) {
  return {
    id: overrides.id || createId("sec"),
    type,
    enabled: overrides.enabled !== false,
    order: Number.isFinite(overrides.order) ? overrides.order : 0,
    blocks: Array.isArray(overrides.blocks) ? overrides.blocks : [],
    settings: overrides.settings || {},
    metadata: {
      label: null,
      locale: null,
      source: "system",
      createdAt: null,
      updatedAt: null,
      ...(overrides.metadata || {}),
    },
  };
}

/**
 * @returns {{version:number,eventId:string|null,locale:string,defaultLocale:string,sections:object[],metadata:object,extensions:object}}
 */
export function createContentDocument(overrides = {}) {
  return {
    version: CONTENT_SCHEMA_VERSION,
    eventId: overrides.eventId ?? null,
    locale: overrides.locale || "en",
    defaultLocale: overrides.defaultLocale || "en",
    sections: Array.isArray(overrides.sections) ? overrides.sections : [],
    metadata: {
      title: null,
      status: "published",
      revision: 0,
      ...(overrides.metadata || {}),
    },
    /**
     * Reserved extension points. Declared and preserved, never implemented here:
     * editor, versions, drafts, ai, scheduling, translations.
     */
    extensions: overrides.extensions || {},
  };
}

export function isSection(value) {
  return Boolean(value && typeof value === "object" && typeof value.type === "string" && Array.isArray(value.blocks));
}

export function isBlock(value) {
  return Boolean(value && typeof value === "object" && typeof value.type === "string" && "value" in value);
}

export function isContentDocument(value) {
  return Boolean(value && typeof value === "object" && Array.isArray(value.sections));
}

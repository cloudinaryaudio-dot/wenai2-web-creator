/**
 * Section Type Registry
 * ---------------------
 * Configuration-driven catalogue of section types.
 *
 * A section type definition:
 *   { type, label, allowedBlocks, defaultSettings, createDefaultBlocks?, ruleKey?, editor? }
 *
 * `ruleKey` links a section to the existing rule engine without the CMS
 * knowing how rules are evaluated.
 */

const registry = new Map();

export function registerSectionType(definition) {
  if (!definition?.type) return;
  registry.set(definition.type, {
    label: definition.type,
    /** "*" = any registered block type */
    allowedBlocks: "*",
    defaultSettings: {},
    createDefaultBlocks: () => [],
    ruleKey: null,
    singleton: false,
    /** reserved: future drag-and-drop editor metadata */
    editor: { icon: null, group: "general", schema: null },
    ...definition,
  });
}

export function getSectionType(type) {
  return registry.get(type) || null;
}

export function hasSectionType(type) {
  return registry.has(type);
}

export function listSectionTypes() {
  return Array.from(registry.values());
}

export function listSectionTypeIds() {
  return Array.from(registry.keys());
}

export function isBlockAllowed(sectionType, blockType) {
  const def = getSectionType(sectionType);
  if (!def) return false;
  if (def.allowedBlocks === "*") return true;
  return Array.isArray(def.allowedBlocks) && def.allowedBlocks.includes(blockType);
}

export default registry;

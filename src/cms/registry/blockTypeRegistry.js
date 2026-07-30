/**
 * Block Type Registry
 * -------------------
 * Configuration-driven catalogue of block types. No conditionals anywhere else
 * in the CMS may branch on a block type; they resolve the definition here.
 *
 * A block type definition:
 *   { type, label, category, defaultValue, defaultStyle, validate?, normalize?, editor? }
 */

const registry = new Map();

export function registerBlockType(definition) {
  if (!definition?.type) return;
  registry.set(definition.type, {
    label: definition.type,
    category: "content",
    defaultValue: null,
    defaultStyle: {},
    validate: () => [],
    normalize: (value) => value,
    /** reserved: future block library / drag-and-drop editor metadata */
    editor: { icon: null, group: "general", schema: null },
    ...definition,
  });
}

export function getBlockType(type) {
  return registry.get(type) || null;
}

export function hasBlockType(type) {
  return registry.has(type);
}

export function listBlockTypes() {
  return Array.from(registry.values());
}

export function listBlockTypeIds() {
  return Array.from(registry.keys());
}

export default registry;

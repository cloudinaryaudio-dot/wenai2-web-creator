/**
 * CMS Extension Points
 * --------------------
 * Declared contracts for capabilities that are intentionally NOT implemented.
 * They exist so future features plug in without changing the data model.
 *
 * Every entry documents where it hooks into the engine.
 */
export const CMS_EXTENSION_POINTS = {
  /** Drag-and-drop editor: reorder via `section.order`, insert via createDefaultSection/createBlock. */
  editor: { key: "editor", storedAt: "document.extensions.editor", implemented: false },
  /** Block library: driven entirely by blockTypeRegistry + definition.editor metadata. */
  blockLibrary: { key: "blockLibrary", storedAt: "registry.blockTypeRegistry", implemented: false },
  /** Version history: append serialized snapshots. */
  versions: { key: "versions", storedAt: "document.extensions.versions", implemented: false },
  /** Draft autosave: parallel document with metadata.status = "draft". */
  drafts: { key: "drafts", storedAt: "document.extensions.drafts", implemented: false },
  /** AI-generated content: blocks carry metadata.source = "ai". */
  ai: { key: "ai", storedAt: "block.metadata.source", implemented: false },
  /** Localization: block.metadata.translations[locale]. */
  localization: { key: "localization", storedAt: "block.metadata.translations", implemented: false },
  /** Scheduling: section/block visibility.schedule = { from, to }. */
  scheduling: { key: "scheduling", storedAt: "node.visibility.schedule", implemented: false },
};

export default CMS_EXTENSION_POINTS;

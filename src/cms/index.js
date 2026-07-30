/**
 * CMS Engine — public surface
 * ---------------------------
 * Consumers (application layer only) import from here. Importing internal CMS
 * files from UI code is forbidden: the renderer must never know content
 * internals.
 *
 * Side effect: registering the built-in section & block types.
 */
import "./blocks/blockTypes";
import "./sections/sectionTypes";

export {
  CONTENT_SCHEMA_VERSION,
  VISIBILITY,
  createBlock,
  createSection,
  createContentDocument,
  isBlock,
  isSection,
  isContentDocument,
} from "./content/contentContract";

export {
  normalizeContent,
  validateContent,
  sortSections,
  resolveBlocks,
  resolveContent,
  createDefaultContent,
  createDefaultSection,
} from "./content/contentManager";

export {
  serializeContent,
  deserializeContent,
  toLegacySectionData,
  toSectionOrder,
} from "./serializers/contentSerializer";

export { contentFromInvitation } from "./content/invitationContentAdapter";

export { BLOCK_TYPES } from "./blocks/blockTypes";
export { SECTION_TYPES } from "./sections/sectionTypes";

export {
  registerBlockType,
  getBlockType,
  hasBlockType,
  listBlockTypes,
  listBlockTypeIds,
} from "./registry/blockTypeRegistry";

export {
  registerSectionType,
  getSectionType,
  hasSectionType,
  listSectionTypes,
  listSectionTypeIds,
  isBlockAllowed,
} from "./registry/sectionTypeRegistry";

export { localizeContent, resolveLocalizedValue, listAvailableLocales } from "./localization/localizationService";

export { CMS_EXTENSION_POINTS } from "./extensionPoints";

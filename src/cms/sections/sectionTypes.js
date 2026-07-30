/**
 * Built-in Section Types
 * ----------------------
 * Each definition owns three pure concerns for its type:
 *  - createDefaultBlocks(): empty-state content
 *  - fromSource(source):    projects legacy/raw data into blocks   (adapter in)
 *  - toData(section):       projects blocks back into the shape the existing
 *                           section components expect                (adapter out)
 *
 * The renderer never sees any of this; it receives the output of `toData`
 * through the serializer, exactly as before.
 */
import { registerSectionType } from "../registry/sectionTypeRegistry";
import { createBlock } from "../content/contentContract";
import { BLOCK_TYPES } from "../blocks/blockTypes";

export const SECTION_TYPES = {
  HERO: "hero",
  COUPLE: "couple",
  EVENT_DETAILS: "eventDetails",
  COUNTDOWN: "countdown",
  FAMILY: "family",
  SCHEDULE: "schedule",
  VENUE: "venue",
  GALLERY: "gallery",
  CONTACT: "contact",
  FOOTER: "footer",
};

/** A single RAW block keeps legacy payloads lossless until they are migrated. */
const raw = (value, id) => createBlock(BLOCK_TYPES.RAW, value ?? null, { id, metadata: { source: "legacy" } });
const rawValue = (section) => section?.blocks?.find((b) => b.type === BLOCK_TYPES.RAW)?.value ?? null;

/**
 * Shared factory: legacy-backed section type.
 * DRY — every built-in type differs only by its type id, rule key and defaults.
 */
function legacySectionType({ type, label, ruleKey, allowedBlocks, emptyValue = null, defaultSettings = {} }) {
  return {
    type,
    label,
    ruleKey,
    allowedBlocks,
    defaultSettings,
    createDefaultBlocks: () => [raw(emptyValue)],
    fromSource: (source) => [raw(source ?? emptyValue)],
    toData: (section) => rawValue(section) ?? emptyValue,
  };
}

const definitions = [
  legacySectionType({
    type: SECTION_TYPES.HERO,
    label: "Hero Banner",
    allowedBlocks: [BLOCK_TYPES.HEADING, BLOCK_TYPES.TEXT, BLOCK_TYPES.IMAGE, BLOCK_TYPES.BUTTON, BLOCK_TYPES.RAW],
    emptyValue: null,
  }),
  legacySectionType({
    type: SECTION_TYPES.COUPLE,
    label: "Hosts",
    allowedBlocks: [BLOCK_TYPES.IMAGE, BLOCK_TYPES.HEADING, BLOCK_TYPES.TEXT, BLOCK_TYPES.RAW],
  }),
  legacySectionType({
    type: SECTION_TYPES.EVENT_DETAILS,
    label: "Event Details",
    allowedBlocks: [BLOCK_TYPES.HEADING, BLOCK_TYPES.RICH_TEXT, BLOCK_TYPES.TEXT, BLOCK_TYPES.RAW],
  }),
  legacySectionType({
    type: SECTION_TYPES.COUNTDOWN,
    label: "Countdown",
    ruleKey: "showCountdown",
    allowedBlocks: [BLOCK_TYPES.COUNTDOWN, BLOCK_TYPES.RAW],
  }),
  legacySectionType({
    type: SECTION_TYPES.FAMILY,
    label: "Family",
    ruleKey: "showFamily",
    allowedBlocks: [BLOCK_TYPES.TEXT, BLOCK_TYPES.RAW],
    emptyValue: [],
  }),
  legacySectionType({
    type: SECTION_TYPES.SCHEDULE,
    label: "Schedule",
    allowedBlocks: [BLOCK_TYPES.TEXT, BLOCK_TYPES.RAW],
    emptyValue: [],
  }),
  legacySectionType({
    type: SECTION_TYPES.VENUE,
    label: "Venue",
    ruleKey: "showVenue",
    allowedBlocks: [BLOCK_TYPES.MAP, BLOCK_TYPES.TEXT, BLOCK_TYPES.RAW],
  }),
  legacySectionType({
    type: SECTION_TYPES.GALLERY,
    label: "Gallery",
    ruleKey: "showGallery",
    allowedBlocks: [BLOCK_TYPES.GALLERY, BLOCK_TYPES.IMAGE, BLOCK_TYPES.RAW],
    emptyValue: [],
  }),
  legacySectionType({
    type: SECTION_TYPES.CONTACT,
    label: "Contact",
    ruleKey: "showContact",
    allowedBlocks: [BLOCK_TYPES.TEXT, BLOCK_TYPES.BUTTON, BLOCK_TYPES.RAW],
    emptyValue: [],
  }),
  legacySectionType({
    type: SECTION_TYPES.FOOTER,
    label: "Footer",
    allowedBlocks: [BLOCK_TYPES.TEXT, BLOCK_TYPES.DIVIDER, BLOCK_TYPES.RAW],
  }),
];

definitions.forEach(registerSectionType);

export { rawValue };
export default definitions;

/**
 * Built-in Block Types
 * --------------------
 * Registered through configuration only. Adding a block type = add an entry
 * here (or call registerBlockType from anywhere) — nothing else changes.
 */
import { registerBlockType } from "../registry/blockTypeRegistry";

const str = (v) => (typeof v === "string" ? v : v == null ? "" : String(v));
const arr = (v) => (Array.isArray(v) ? v : []);
const obj = (v) => (v && typeof v === "object" && !Array.isArray(v) ? v : {});

const required = (path) => (block) =>
  block?.value == null || block.value === "" ? [{ path, code: "required", message: `${block?.type} block requires a value` }] : [];

export const BLOCK_TYPES = {
  TEXT: "text",
  HEADING: "heading",
  IMAGE: "image",
  VIDEO: "video",
  BUTTON: "button",
  COUNTDOWN: "countdown",
  GALLERY: "gallery",
  MAP: "map",
  DIVIDER: "divider",
  QUOTE: "quote",
  RICH_TEXT: "richText",
  /** structural: an opaque payload passed straight to a legacy section */
  RAW: "raw",
};

const definitions = [
  {
    type: BLOCK_TYPES.TEXT,
    label: "Text",
    category: "typography",
    defaultValue: "",
    normalize: str,
  },
  {
    type: BLOCK_TYPES.HEADING,
    label: "Heading",
    category: "typography",
    defaultValue: { text: "", level: 2 },
    normalize: (v) => (typeof v === "string" ? { text: v, level: 2 } : { text: str(obj(v).text), level: obj(v).level || 2 }),
    validate: (b) => (str(b?.value?.text) ? [] : [{ path: "value.text", code: "required", message: "Heading text is required" }]),
  },
  {
    type: BLOCK_TYPES.IMAGE,
    label: "Image",
    category: "media",
    defaultValue: { src: "", alt: "" },
    normalize: (v) => (typeof v === "string" ? { src: v, alt: "" } : { src: str(obj(v).src), alt: str(obj(v).alt) }),
    validate: (b) => (str(b?.value?.src) ? [] : [{ path: "value.src", code: "required", message: "Image src is required" }]),
  },
  {
    type: BLOCK_TYPES.VIDEO,
    label: "Video",
    category: "media",
    defaultValue: { src: "", poster: "", provider: "file" },
    normalize: (v) => (typeof v === "string" ? { src: v, poster: "", provider: "file" } : { src: str(obj(v).src), poster: str(obj(v).poster), provider: obj(v).provider || "file" }),
  },
  {
    type: BLOCK_TYPES.BUTTON,
    label: "Button",
    category: "action",
    defaultValue: { label: "", href: "", variant: "primary" },
    normalize: (v) => ({ label: str(obj(v).label), href: str(obj(v).href), variant: obj(v).variant || "primary" }),
  },
  {
    type: BLOCK_TYPES.COUNTDOWN,
    label: "Countdown",
    category: "widget",
    defaultValue: { targetDate: null, label: "" },
    normalize: (v) => ({ targetDate: obj(v).targetDate || null, label: str(obj(v).label) }),
    validate: required("value.targetDate"),
  },
  {
    type: BLOCK_TYPES.GALLERY,
    label: "Gallery",
    category: "media",
    defaultValue: { items: [] },
    normalize: (v) => ({
      items: arr(Array.isArray(v) ? v : obj(v).items).map((i) => (typeof i === "string" ? { src: i, alt: "" } : { src: str(obj(i).src), alt: str(obj(i).alt) })),
    }),
  },
  {
    type: BLOCK_TYPES.MAP,
    label: "Map",
    category: "widget",
    defaultValue: { embed: "", address: "", lat: null, lng: null },
    normalize: (v) => ({ embed: str(obj(v).embed), address: str(obj(v).address), lat: obj(v).lat ?? null, lng: obj(v).lng ?? null }),
  },
  {
    type: BLOCK_TYPES.DIVIDER,
    label: "Divider",
    category: "layout",
    defaultValue: { variant: "line" },
    normalize: (v) => ({ variant: obj(v).variant || "line" }),
  },
  {
    type: BLOCK_TYPES.QUOTE,
    label: "Quote",
    category: "typography",
    defaultValue: { text: "", author: "" },
    normalize: (v) => (typeof v === "string" ? { text: v, author: "" } : { text: str(obj(v).text), author: str(obj(v).author) }),
  },
  {
    type: BLOCK_TYPES.RICH_TEXT,
    label: "Rich Text",
    category: "typography",
    defaultValue: { format: "html", content: "" },
    normalize: (v) => (typeof v === "string" ? { format: "html", content: v } : { format: obj(v).format || "html", content: str(obj(v).content) }),
  },
  {
    type: BLOCK_TYPES.RAW,
    label: "Raw",
    category: "system",
    defaultValue: null,
    normalize: (v) => (v === undefined ? null : v),
    editor: { icon: null, group: "system", schema: null, hidden: true },
  },
];

definitions.forEach(registerBlockType);

export default definitions;

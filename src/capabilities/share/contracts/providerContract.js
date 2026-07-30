/**
 * Share Provider Contract
 * -----------------------
 * Strategy Pattern definition. A provider is pure configuration + a pure
 * `build(shareModel, options) -> ShareAction` function.
 * Providers never touch the DOM, never call external APIs.
 */
import { SHARE_CHANNELS } from "./shareContract";

export const SHARE_ACTION_KINDS = {
  /** Open an external URL (web intent / deep link). */
  URL: "url",
  /** Copy a payload to the clipboard (executed by an adapter). */
  CLIPBOARD: "clipboard",
  /** Render something locally (QR). */
  RENDER: "render",
  /** Native Web Share API. */
  NATIVE: "native",
};

export function createShareAction(partial = {}) {
  return {
    kind: partial.kind || SHARE_ACTION_KINDS.URL,
    providerId: partial.providerId || "",
    url: partial.url ?? null,
    payload: partial.payload ?? null,
    target: partial.target || "_blank",
    implemented: partial.implemented !== false,
    meta: partial.meta || {},
  };
}

/**
 * Provider definition factory. Validates the strategy contract shape.
 * @param {object} def
 * @param {string} def.id
 * @param {string} def.label
 * @param {string} def.channel   one of SHARE_CHANNELS
 * @param {(model, options) => object} def.build
 */
export function defineShareProvider(def = {}) {
  if (!def.id) throw new Error("[share] provider requires an id");
  if (typeof def.build !== "function") throw new Error(`[share] provider "${def.id}" requires build()`);
  return {
    id: def.id,
    label: def.label || def.id,
    channel: def.channel || SHARE_CHANNELS.SOCIAL,
    icon: def.icon || def.id,
    /** capability flags — UI reads these, never provider internals */
    supportsMessage: def.supportsMessage !== false,
    supportsImage: Boolean(def.supportsImage),
    implemented: def.implemented !== false,
    order: typeof def.order === "number" ? def.order : 100,
    build: def.build,
  };
}

export { SHARE_CHANNELS };
export default { defineShareProvider, createShareAction, SHARE_ACTION_KINDS };

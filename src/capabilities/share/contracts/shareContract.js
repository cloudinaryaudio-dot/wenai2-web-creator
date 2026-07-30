/**
 * Share Contract
 * --------------
 * The canonical, framework-independent shape of a Share Model.
 * No UI, no storage, no provider specifics.
 */

export const SHARE_MODEL_VERSION = 1;

export const SHARE_CHANNELS = {
  SOCIAL: "social",
  MESSAGING: "messaging",
  DIRECT: "direct",
  OFFLINE: "offline",
};

export const QR_SCOPES = {
  EVENT: "event",
  GUEST: "guest",
  TABLE: "table",
};

/** Social metadata contract (OpenGraph / Twitter / WhatsApp / Telegram). */
export function createSocialMetadata(partial = {}) {
  return {
    openGraph: {
      "og:type": "website",
      "og:title": "",
      "og:description": "",
      "og:image": "",
      "og:url": "",
      "og:locale": "en",
      ...(partial.openGraph || {}),
    },
    twitter: {
      "twitter:card": "summary_large_image",
      "twitter:title": "",
      "twitter:description": "",
      "twitter:image": "",
      ...(partial.twitter || {}),
    },
    /** WhatsApp/Telegram read OpenGraph; declared for explicit extension. */
    whatsapp: { preferredImageRatio: "1:1", ...(partial.whatsapp || {}) },
    telegram: { preferredImageRatio: "1.91:1", ...(partial.telegram || {}) },
  };
}

/** QR descriptor — architecture only, no image generation. */
export function createQrDescriptor(partial = {}) {
  return {
    scope: partial.scope || QR_SCOPES.EVENT,
    targetUrl: partial.targetUrl || "",
    format: partial.format || "svg",
    size: partial.size || 512,
    /** guest/table scopes carry a reference id (future). */
    reference: partial.reference ?? null,
    implemented: false,
  };
}

/** The standardized share model every Event exposes. */
export function createShareModel(partial = {}) {
  return {
    version: SHARE_MODEL_VERSION,
    eventId: partial.eventId || "",
    publicUrl: partial.publicUrl || "",
    canonicalUrl: partial.canonicalUrl || "",
    previewUrl: partial.previewUrl || "",
    shortUrl: partial.shortUrl ?? null,
    qrCode: partial.qrCode || createQrDescriptor(),
    shareTitle: partial.shareTitle || "",
    shareDescription: partial.shareDescription || "",
    previewImage: partial.previewImage || "",
    shareMessage: partial.shareMessage || "",
    socialMetadata: partial.socialMetadata || createSocialMetadata(),
    locale: partial.locale || "en",
  };
}

export function isShareModel(value) {
  return Boolean(value && typeof value === "object" && "publicUrl" in value && "shareMessage" in value);
}

export default { createShareModel, createSocialMetadata, createQrDescriptor };

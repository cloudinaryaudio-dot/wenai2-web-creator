/**
 * ShareService (Application Layer)
 * --------------------------------
 * Thin orchestration over the Share Capability. UI talks to this only —
 * never to builders, providers or the engine directly.
 * Backward compatible with the previous ShareService API.
 */
import { getEvent } from "../event/EventService";
import { ok, fail } from "../result";
import {
  getShareModel,
  getProviders,
  getShareAction,
  getShareActions,
  buildPublicUrl,
  buildCanonicalUrl,
  buildPreviewUrl,
  buildEventQr,
  buildShareMessage,
  toMetaTags,
  validateShareability,
  validateShareModel,
  configureShare,
  registerShareProvider,
  SHARE_ACTION_KINDS,
} from "../../capabilities/share";

function withEvent(idOrSlug, fn) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  return fn(result.data);
}

/* ------------------------------------------------------------------ */
/* Share model                                                         */
/* ------------------------------------------------------------------ */

export function getShareModelFor(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => {
    const shareability = validateShareability(event);
    if (!shareability.valid) return fail(shareability.errors.join(", "));
    const model = getShareModel(event, options);
    const validation = validateShareModel(model);
    return ok(model, { warnings: [...shareability.warnings, ...validation.warnings] });
  });
}

export function listProviders(options = {}) {
  return ok(getProviders(options));
}

export function getProviderAction(idOrSlug, providerId, options = {}) {
  return withEvent(idOrSlug, (event) => {
    const action = getShareAction(event, providerId, options);
    return action ? ok(action) : fail(`Unknown share provider "${providerId}"`);
  });
}

export function listProviderActions(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => ok(getShareActions(event, options)));
}

export function getSocialMetadata(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => {
    const model = getShareModel(event, options);
    return ok({ metadata: model.socialMetadata, tags: toMetaTags(model.socialMetadata) });
  });
}

export function getShareMessage(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) =>
    ok(buildShareMessage(event, {
      ...options,
      tokens: { url: buildPublicUrl(event, options).url, ...(options.tokens || {}) },
    }))
  );
}

/* ------------------------------------------------------------------ */
/* URLs (backward compatible)                                          */
/* ------------------------------------------------------------------ */

export function generatePublicUrl(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => ok(buildPublicUrl(event, options)));
}

export function generateCanonicalUrl(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => ok(buildCanonicalUrl(event, options)));
}

export function generatePreviewUrl(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => ok(buildPreviewUrl(event, options)));
}

/** Placeholder — a shortener provider is injected later. */
export function generateShortUrl(idOrSlug, options = {}) {
  const result = generatePublicUrl(idOrSlug, options);
  if (!result.ok) return result;
  return ok({ ...result.data, shortUrl: null, provider: null, implemented: false });
}

/** Descriptor only — QR image rendering is an adapter concern. */
export function generateQRCode(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => {
    const urls = buildPublicUrl(event, options);
    return ok({ ...urls, qr: buildEventQr(event, options), format: "svg", implemented: false });
  });
}

/** Returns a clipboard action; the UI adapter performs the write. */
export function copyLink(idOrSlug, options = {}) {
  return withEvent(idOrSlug, (event) => {
    const urls = buildPublicUrl(event, options);
    const action = getShareAction(event, "copy-link", options);
    return ok({ ...urls, action, copied: false, implemented: false });
  });
}

export { configureShare, registerShareProvider, SHARE_ACTION_KINDS };

export default {
  getShareModelFor,
  listProviders,
  getProviderAction,
  listProviderActions,
  getSocialMetadata,
  getShareMessage,
  generatePublicUrl,
  generateCanonicalUrl,
  generatePreviewUrl,
  generateShortUrl,
  generateQRCode,
  copyLink,
  configureShare,
  registerShareProvider,
};

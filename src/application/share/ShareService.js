/**
 * ShareService
 * ------------
 * URL/sharing orchestration. No external integrations — architecture only.
 */
import { getEvent } from "../event/EventService";
import { ok, fail } from "../result";

const DEFAULT_BASE = () =>
  typeof window !== "undefined" && window.location ? window.location.origin : "";

export function generatePublicUrl(idOrSlug, { baseUrl } = {}) {
  const result = getEvent(idOrSlug);
  if (!result.ok) return result;
  const event = result.data;
  const path = `/invitation/${event.slug || event.id}`;
  return ok({ path, url: `${baseUrl ?? DEFAULT_BASE()}${path}` });
}

/** Placeholder — a shortener provider is injected later. */
export function generateShortUrl(idOrSlug, options = {}) {
  const result = generatePublicUrl(idOrSlug, options);
  if (!result.ok) return result;
  return ok({ ...result.data, shortUrl: null, provider: null, implemented: false });
}

/** Placeholder — QR rendering belongs to an adapter, not this layer. */
export function generateQRCode(idOrSlug, options = {}) {
  const result = generatePublicUrl(idOrSlug, options);
  if (!result.ok) return result;
  return ok({ ...result.data, qr: null, format: "svg", implemented: false });
}

/** Placeholder — clipboard access is a UI/browser concern. */
export function copyLink(idOrSlug, options = {}) {
  const result = generatePublicUrl(idOrSlug, options);
  if (!result.ok) return result;
  return ok({ ...result.data, copied: false, implemented: false });
}

export default { generatePublicUrl, generateShortUrl, generateQRCode, copyLink };

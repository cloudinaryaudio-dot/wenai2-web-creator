/**
 * URL Builder
 * -----------
 * The ONLY place URLs are assembled. Supports custom domains and UTM tagging.
 */
import { getShareConfig } from "../registry/shareConfig";

function runtimeOrigin() {
  return typeof window !== "undefined" && window.location ? window.location.origin : "";
}

export function resolveBaseUrl(options = {}) {
  const config = getShareConfig();
  return (
    options.baseUrl ||
    options.customDomain ||
    config.customDomain ||
    config.baseUrl ||
    runtimeOrigin() ||
    ""
  );
}

function fillRoute(pattern, params = {}) {
  return String(pattern || "").replace(/:([a-zA-Z0-9_]+)/g, (_, key) =>
    encodeURIComponent(params[key] ?? "")
  );
}

function withQuery(path, query) {
  const entries = Object.entries(query || {}).filter(([, v]) => v != null && v !== "");
  if (!entries.length) return path;
  const search = entries.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
  return `${path}${path.includes("?") ? "&" : "?"}${search}`;
}

function utmQuery(options = {}) {
  const utm = options.utm ?? getShareConfig().defaults.utm;
  if (!utm) return {};
  return {
    utm_source: utm.source,
    utm_medium: utm.medium,
    utm_campaign: utm.campaign,
  };
}

/** Generic builder — every specialised builder delegates here. */
export function buildUrl(routeKey, params = {}, options = {}) {
  const config = getShareConfig();
  const path = withQuery(fillRoute(config.routes[routeKey], params), {
    ...utmQuery(options),
    ...(options.query || {}),
  });
  const base = resolveBaseUrl(options).replace(/\/$/, "");
  return { path, url: `${base}${path}` };
}

const identity = (event) => ({ slug: event?.slug || event?.id || "", id: event?.id || "" });

export function buildPublicUrl(event, options = {}) {
  return buildUrl("public", identity(event), options);
}

export function buildCanonicalUrl(event, options = {}) {
  const explicit = event?.seo?.canonical;
  if (explicit) return { path: explicit, url: explicit };
  return buildUrl("canonical", identity(event), { ...options, utm: null });
}

export function buildPreviewUrl(event, options = {}) {
  return buildUrl("preview", identity(event), options);
}

export function buildQrTargetUrl(event, options = {}) {
  return buildUrl("qr", identity(event), options);
}

export default { buildUrl, buildPublicUrl, buildCanonicalUrl, buildPreviewUrl, buildQrTargetUrl, resolveBaseUrl };

/**
 * QR Builder
 * ----------
 * Architecture only — descriptors are produced, images are not.
 * A renderer adapter (svg/canvas library) plugs in via setQrRenderer().
 */
import { createQrDescriptor, QR_SCOPES } from "../contracts/shareContract";
import { buildQrTargetUrl, buildPublicUrl } from "./urlBuilder";

let renderer = null;

/** Extension point: inject a QR image renderer later. */
export function setQrRenderer(impl) {
  renderer = typeof impl === "function" ? impl : null;
}

export function buildEventQr(event, options = {}) {
  const target = (options.usePublicUrl === false ? buildQrTargetUrl : buildPublicUrl)(event, options);
  return createQrDescriptor({ ...options, scope: QR_SCOPES.EVENT, targetUrl: target.url });
}

/** Future: per-guest QR (guest module not implemented). */
export function buildGuestQr(event, guestId, options = {}) {
  const target = buildPublicUrl(event, { ...options, query: { ...(options.query || {}), g: guestId } });
  return createQrDescriptor({ ...options, scope: QR_SCOPES.GUEST, reference: guestId, targetUrl: target.url });
}

/** Future: per-table QR (seating module not implemented). */
export function buildTableQr(event, tableId, options = {}) {
  const target = buildPublicUrl(event, { ...options, query: { ...(options.query || {}), t: tableId } });
  return createQrDescriptor({ ...options, scope: QR_SCOPES.TABLE, reference: tableId, targetUrl: target.url });
}

/** Returns null until a renderer adapter is registered. */
export function renderQr(descriptor) {
  return renderer ? renderer(descriptor) : null;
}

export { QR_SCOPES };
export default { buildEventQr, buildGuestQr, buildTableQr, renderQr, setQrRenderer };

/**
 * Share Model Service
 * -------------------
 * Assembles the standardized share model for an Event by composing builders.
 * Pure: takes an Event, returns a ShareModel. No storage, no UI.
 */
import { createShareModel } from "../contracts/shareContract";
import { buildPublicUrl, buildCanonicalUrl, buildPreviewUrl } from "../builders/urlBuilder";
import { buildShareMessage } from "../builders/messageBuilder";
import { buildSocialMetadata } from "../builders/metadataBuilder";
import { buildEventQr } from "../builders/qrBuilder";
import { getShareConfig } from "../registry/shareConfig";

export function buildShareModel(event, options = {}) {
  const locale = options.locale || event?.language || getShareConfig().defaults.locale;

  const publicUrl = buildPublicUrl(event, options).url;
  const canonicalUrl = buildCanonicalUrl(event, options).url;
  const previewUrl = buildPreviewUrl(event, options).url;

  const shareTitle = options.title || event?.seo?.title || event?.title || "";
  const shareDescription = options.description || event?.seo?.description || "";
  const previewImage = options.image || event?.seo?.image || event?.invitation?.hero?.image || "";

  const shareMessage = buildShareMessage(event, {
    ...options,
    locale,
    tokens: { url: publicUrl, ...(options.tokens || {}) },
  });

  return createShareModel({
    eventId: event?.id || "",
    publicUrl,
    canonicalUrl,
    previewUrl,
    shortUrl: null, // resolved by the shortener provider when implemented
    qrCode: buildEventQr(event, options),
    shareTitle,
    shareDescription,
    previewImage,
    shareMessage,
    locale,
    socialMetadata: buildSocialMetadata({
      title: shareTitle,
      description: shareDescription,
      image: previewImage,
      url: canonicalUrl,
      locale,
    }),
  });
}

export default { buildShareModel };

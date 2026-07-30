/**
 * Message Builder
 * ---------------
 * Configuration-driven, event-aware, localized message generation.
 * No hardcoded copy outside shareConfig templates.
 */
import { MESSAGE_TEMPLATES, SUBJECT_TEMPLATES, getShareConfig } from "../registry/shareConfig";

/** Token replacement: {token} -> value, unknown tokens collapse to "". */
export function applyPlaceholders(template, tokens = {}) {
  return String(template || "")
    .replace(/\{(\w+)\}/g, (_, key) => (tokens[key] == null ? "" : String(tokens[key])))
    .replace(/[ \t]+\n/g, "\n")
    .trim();
}

function pickTemplate(dictionary, locale, type) {
  const fallbackLocale = getShareConfig().defaults.locale;
  const table = dictionary[locale] || dictionary[fallbackLocale] || {};
  return table[type] || table.default || dictionary[fallbackLocale]?.default || "{title} {url}";
}

/** Derive the tokens a template may reference from an Event. */
export function buildMessageTokens(event, extra = {}) {
  const details = event?.invitation?.eventDetails || {};
  const hero = event?.invitation?.hero || {};
  const venue = event?.venue || {};
  const date = details.date || hero.date || "";
  const venueName = venue.name || details.venue || "";
  return {
    title: event?.title || event?.seo?.title || "",
    type: event?.type || "",
    date: date ? ` on ${date}` : "",
    rawDate: date,
    venue: venueName ? ` at ${venueName}` : "",
    rawVenue: venueName,
    host: event?.owner?.name || "",
    url: "",
    ...extra,
  };
}

export function buildShareMessage(event, options = {}) {
  const locale = options.locale || event?.language || getShareConfig().defaults.locale;
  const template =
    options.template || pickTemplate(MESSAGE_TEMPLATES, locale, event?.type);
  return applyPlaceholders(template, buildMessageTokens(event, options.tokens));
}

export function buildShareSubject(event, options = {}) {
  const locale = options.locale || event?.language || getShareConfig().defaults.locale;
  const template = options.subjectTemplate || pickTemplate(SUBJECT_TEMPLATES, locale, event?.type);
  return applyPlaceholders(template, buildMessageTokens(event, options.tokens));
}

export default { buildShareMessage, buildShareSubject, applyPlaceholders, buildMessageTokens };

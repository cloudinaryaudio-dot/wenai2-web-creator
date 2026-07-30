/**
 * Invitation -> Content adapter
 * -----------------------------
 * Projects the existing invitation view (legacy shape) into a CMS content
 * document. This is the ONLY place that knows the legacy field names, so the
 * rest of the CMS stays source-agnostic and the event domain stays untouched.
 */
import { createContentDocument } from "../content/contentContract";
import { getSectionType, listSectionTypeIds } from "../registry/sectionTypeRegistry";
import { normalizeContent } from "../content/contentManager";

/** legacy invitation key per section type (identity where names already match). */
const SOURCE_KEY = {
  contact: "contact",
};

function readSource(invitation, type) {
  const key = SOURCE_KEY[type] || type;
  return invitation?.[key] ?? null;
}

/**
 * @param {object} invitation legacy invitation view (see domain/event adapters)
 * @param {object} [options]  { sectionTypes?: string[], eventId?: string, locale?: string }
 */
export function contentFromInvitation(invitation, options = {}) {
  if (!invitation) return null;

  const order =
    options.sectionTypes?.length
      ? options.sectionTypes
      : invitation.config?.sections?.length
      ? invitation.config.sections
      : listSectionTypeIds();

  const sections = order
    .map((type, index) => {
      const def = getSectionType(type);
      if (!def) return null;
      return {
        id: type,
        type,
        enabled: true,
        order: index,
        blocks: def.fromSource(readSource(invitation, type)),
        settings: {},
        metadata: { label: def.label, source: "invitation" },
      };
    })
    .filter(Boolean);

  const doc = createContentDocument({
    eventId: options.eventId ?? invitation.id ?? null,
    locale: options.locale || invitation.language || "en",
    sections,
    metadata: { title: invitation.hero?.title || null, status: invitation.publishState || "published" },
  });

  return normalizeContent(doc, { eventId: doc.eventId, locale: doc.locale });
}

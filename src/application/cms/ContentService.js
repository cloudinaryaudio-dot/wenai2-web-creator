/**
 * Content Service (application layer)
 * -----------------------------------
 * The bridge between the Event domain and the CMS engine.
 * UI never calls the CMS directly — it consumes the output of this service
 * through the invitation view model.
 */
import {
  contentFromInvitation,
  normalizeContent,
  resolveContent,
  serializeContent,
  toLegacySectionData,
  toSectionOrder,
  validateContent,
} from "../../cms";

/**
 * Builds the content document for an invitation view.
 * @returns {object|null} normalized content document
 */
export function buildContent(invitation, options = {}) {
  if (!invitation) return null;
  // A stored CMS document always wins over the legacy projection.
  if (options.content) return normalizeContent(options.content, { eventId: invitation.id });
  return contentFromInvitation(invitation, options);
}

/**
 * Prepares the normalized CMS output the renderer consumes.
 * @returns {{document, sections, order, data, issues}}
 */
export function prepareContent(invitation, options = {}) {
  const document = buildContent(invitation, options);
  if (!document) return { document: null, sections: [], order: [], data: {}, issues: [] };

  const sections = resolveContent(document, {
    locale: options.locale,
    sectionPredicate: options.sectionPredicate,
  });

  const { issues } = validateContent(document);

  return {
    document,
    sections,
    order: sections.map((s) => s.id),
    /** legacy-compatible section data map consumed by the existing renderer */
    data: sections.reduce((acc, s) => ({ ...acc, [s.id]: s.data }), {}),
    issues,
  };
}

/** Persistence boundary helper (storage adapter decides where it goes). */
export function exportContent(document) {
  return serializeContent(document);
}

export { toLegacySectionData, toSectionOrder };

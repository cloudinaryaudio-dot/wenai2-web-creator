/**
 * PreviewService
 * --------------
 * Draft vs published view models. Rendering stays in the UI layer.
 */
import { prepareRendererInput } from "../invitation/InvitationService";
import { ok } from "../result";

export function previewDraft(idOrSlug, options = {}) {
  return prepareRendererInput(idOrSlug, { ...options, mode: "draft" });
}

export function previewPublished(idOrSlug, options = {}) {
  return prepareRendererInput(idOrSlug, { ...options, mode: "published" });
}

/** Shallow structural diff between the two modes. */
export function comparePreview(idOrSlug, options = {}) {
  const draft = previewDraft(idOrSlug, options);
  const published = previewPublished(idOrSlug, options);
  if (!draft.ok) return draft;
  if (!published.ok) return published;

  const a = draft.data;
  const b = published.data;
  const onlyInDraft = a.sections.filter((s) => !b.sections.includes(s));
  const onlyInPublished = b.sections.filter((s) => !a.sections.includes(s));

  return ok({
    draft: a,
    published: b,
    differences: {
      sections: { onlyInDraft, onlyInPublished },
      theme: a.themeId !== b.themeId ? { draft: a.themeId, published: b.themeId } : null,
      status: { draft: a.meta.status, published: b.meta.status },
    },
    identical: !onlyInDraft.length && !onlyInPublished.length && a.themeId === b.themeId,
  });
}

export default { previewDraft, previewPublished, comparePreview };

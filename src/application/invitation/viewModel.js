/**
 * Invitation ViewModel
 * --------------------
 * The ONLY shape the renderer consumes. Assembled here so no UI component
 * ever gathers data, themes or rules itself.
 */
import { evaluateRules, canRenderSection, PUBLISH_STATE } from "../../lib/rules";
import { listSectionIds } from "../../ui/invitation/sectionRegistry";
import { toInvitationView } from "../../domain/event";
import { resolveTheme } from "../theme/ThemeService";
import { prepareContent } from "../cms/ContentService";


/**
 * @returns {{
 *   invitation: object, theme: object, rules: object,
 *   sections: string[], visible: boolean, meta: object
 * }}
 */
export function buildInvitationViewModel(event, options = {}) {
  if (!event) return null;
  const invitation = toInvitationView(event);
  if (!invitation) return null;

  const themeId = options.themeId || invitation.themeId;
  const theme = resolveTheme(invitation, themeId);

  const rules = evaluateRules(
    options.mode === "draft" ? { ...invitation, publishState: "draft" } : invitation,
    options.ruleOverrides ? { overrides: options.ruleOverrides } : {}
  );

  const order =
    theme.layout?.sectionOrder?.length
      ? theme.layout.sectionOrder
      : invitation.config?.sections?.length
      ? invitation.config.sections
      : listSectionIds();

  // CMS engine: the event is projected into a content document, then resolved
  // into normalized section data. The renderer consumes ONLY this output.
  const content = prepareContent(invitation, {
    content: options.content,
    sectionTypes: order,
    locale: options.locale,
    eventId: event.id,
  });

  const sections = content.order.filter((id) => canRenderSection(id, rules));

  return {
    invitation: {
      ...invitation,
      ...content.data,
      themeId,
      config: { ...invitation.config, sections: content.order },
    },
    content: content.document,
    contentSections: content.sections,
    contentIssues: content.issues,
    theme,
    themeId,
    rules,
    sections,
    visible: rules.publishState !== PUBLISH_STATE.ARCHIVED,
    meta: {
      id: event.id,
      slug: event.slug,
      type: event.type,
      title: event.title,
      status: event.status,
      seo: event.seo || null,
      mode: options.mode || "published",
    },
  };
}


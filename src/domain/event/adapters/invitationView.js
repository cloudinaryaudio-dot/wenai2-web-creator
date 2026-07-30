/**
 * Invitation View Adapter
 * -----------------------
 * Projects an Event onto the legacy invitation shape consumed by the existing
 * renderer / section registry. Keeps the renderer 100% backward compatible
 * while the Event stays the single source of truth.
 */
import { resolveSettings, settingsToRuleOverrides } from "../eventSettings";
import { deriveStatus, EVENT_STATUS } from "../eventLifecycle";
import { getEventType } from "../eventTypeRegistry";


const LIFECYCLE_TO_PUBLISH_STATE = {
  [EVENT_STATUS.DRAFT]: "draft",
  [EVENT_STATUS.PREVIEW]: "draft",
  [EVENT_STATUS.PUBLISHED]: "published",
  [EVENT_STATUS.LIVE]: "published",
  [EVENT_STATUS.COMPLETED]: "published",
  [EVENT_STATUS.ARCHIVED]: "archived",
};

export function toInvitationView(event) {
  if (!event) return null;
  const settings = resolveSettings(event);
  const typeConfig = getEventType(event.type);
  const inv = event.invitation || {};

  return {
    id: event.id,
    eventType: event.type,
    themeId: event.themeId || typeConfig.defaultTheme,
    theme: inv.theme || {},
    rules: settingsToRuleOverrides(settings),
    publishState: LIFECYCLE_TO_PUBLISH_STATE[deriveStatus(event)] || "published",
    config: { sections: inv.sections?.length ? inv.sections : typeConfig.defaultSections },

    hero: inv.hero || null,
    couple: inv.couple || null,
    eventDetails: inv.eventDetails || null,
    countdown: inv.countdown || null,
    music: inv.music || null,
    story: inv.story || null,
    family: event.family || [],
    schedule: event.schedule || [],
    venue: event.venue || null,
    gallery: event.gallery || [],
    contact: event.contacts || [],
    footer: inv.footer || null,

    /** escape hatch: the full event for future modules */
    event,
    settings,
    terminology: typeConfig.terminology,
  };
}

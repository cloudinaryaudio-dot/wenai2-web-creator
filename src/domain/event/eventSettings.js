/**
 * Event Settings
 * --------------
 * Centralized, configuration-driven feature toggles.
 * The renderer and modules obey these; UI components never decide features.
 */
import { getEventType } from "./eventTypeRegistry";

export const SETTING_KEYS = [
  "showCountdown",
  "showGallery",
  "showVenue",
  "showMap",
  "showFamily",
  "showContacts",
  "showMusic",
  "showStory",
  "showLivestream",
  "allowShare",
  "allowDownload",
  "allowGuests",
  "passwordProtected",
  "isPremium",
];

export const DEFAULT_SETTINGS = {
  showCountdown: true,
  showGallery: true,
  showVenue: true,
  showMap: true,
  showFamily: true,
  showContacts: true,
  showMusic: false,
  showStory: false,
  showLivestream: false,
  allowShare: true,
  allowDownload: false,
  allowGuests: false,
  passwordProtected: false,
  isPremium: false,
};

/**
 * Effective settings = defaults <- event-type defaults <- event overrides.
 * Unknown keys are preserved (forward compatible) but never required.
 */
export function resolveSettings(event, overrides = {}) {
  const typeDefaults = getEventType(event?.type)?.defaultSettings || {};
  const merged = {
    ...DEFAULT_SETTINGS,
    ...typeDefaults,
    ...(event?.settings || {}),
    ...overrides,
  };
  SETTING_KEYS.forEach((key) => {
    merged[key] = Boolean(merged[key]);
  });
  return merged;
}

export function isEnabled(event, key) {
  return Boolean(resolveSettings(event)[key]);
}

/**
 * Project settings onto rule-engine overrides.
 * A disabled setting hides its section; an enabled setting still requires
 * content (the rule engine derives that from data availability).
 */
const SETTING_TO_RULE = {
  showCountdown: "showCountdown",
  showGallery: "showGallery",
  showVenue: "showVenue",
  showFamily: "showFamily",
  showContacts: "showContact",
  showMusic: "showMusic",
  showStory: "showStory",
};

export function settingsToRuleOverrides(settings = {}) {
  const overrides = {};
  Object.entries(SETTING_TO_RULE).forEach(([settingKey, ruleKey]) => {
    if (settings[settingKey] === false) overrides[ruleKey] = false;
  });
  return overrides;
}

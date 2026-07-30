/**
 * Event Type Registry
 * -------------------
 * Configuration over conditionals. Adding an event type = registering config.
 * No module may branch on `type === "wedding"`.
 */

const registry = new Map();

export const BASE_EVENT_TYPE = {
  id: "generic",
  label: "Event",
  icon: "calendar",
  terminology: {
    host: "Host",
    guest: "Guest",
    celebration: "Celebration",
    primaryDate: "Event Date",
  },
  supportedModules: [
    "invitation",
    "schedule",
    "venue",
    "gallery",
    "family",
    "contacts",
    "settings",
    "seo",
  ],
  defaultSections: [
    "hero",
    "eventDetails",
    "countdown",
    "schedule",
    "venue",
    "gallery",
    "contact",
    "footer",
  ],
  defaultTheme: "royal-maroon",
  defaultSettings: {},
};

export function registerEventType(config) {
  if (!config?.id) return null;
  const merged = {
    ...BASE_EVENT_TYPE,
    ...config,
    terminology: { ...BASE_EVENT_TYPE.terminology, ...(config.terminology || {}) },
    defaultSettings: { ...BASE_EVENT_TYPE.defaultSettings, ...(config.defaultSettings || {}) },
  };
  registry.set(merged.id, merged);
  return merged;
}

export const DEFAULT_EVENT_TYPE_ID = "wedding";

export function getEventType(id) {
  return registry.get(id) || registry.get(DEFAULT_EVENT_TYPE_ID) || BASE_EVENT_TYPE;
}

export function hasEventType(id) {
  return registry.has(id);
}

export function listEventTypes() {
  return Array.from(registry.values()).map(({ id, label, icon }) => ({ id, label, icon }));
}

export function supportsModule(typeId, moduleName) {
  return getEventType(typeId).supportedModules.includes(moduleName);
}

/* ------------------------------------------------------------------ */
/* Built-in event types (configuration only)                           */
/* ------------------------------------------------------------------ */

registerEventType({
  id: "wedding",
  label: "Wedding",
  icon: "heart",
  terminology: {
    host: "Couple",
    guest: "Guest",
    celebration: "Wedding",
    primaryDate: "Wedding Date",
  },
  defaultSections: [
    "hero",
    "couple",
    "eventDetails",
    "countdown",
    "family",
    "schedule",
    "venue",
    "gallery",
    "contact",
    "footer",
  ],
  defaultTheme: "royal-maroon",
});

registerEventType({
  id: "engagement",
  label: "Engagement",
  icon: "gem",
  terminology: {
    host: "Couple",
    guest: "Guest",
    celebration: "Engagement",
    primaryDate: "Engagement Date",
  },
  defaultSections: [
    "hero",
    "couple",
    "eventDetails",
    "countdown",
    "family",
    "venue",
    "gallery",
    "contact",
    "footer",
  ],
  defaultTheme: "minimal-ivory",
});

registerEventType({
  id: "biodata",
  label: "Biodata",
  icon: "user",
  terminology: {
    host: "Candidate",
    guest: "Viewer",
    celebration: "Biodata",
    primaryDate: "Date of Birth",
  },
  supportedModules: ["invitation", "family", "contacts", "settings", "seo", "gallery"],
  defaultSections: ["hero", "eventDetails", "family", "gallery", "contact", "footer"],
  defaultTheme: "minimal-ivory",
  defaultSettings: { showCountdown: false, showVenue: false, showMap: false },
});

registerEventType({
  id: "birthday",
  label: "Birthday",
  icon: "cake",
  terminology: {
    host: "Celebrant",
    guest: "Guest",
    celebration: "Birthday",
    primaryDate: "Birthday",
  },
  defaultTheme: "midnight-emerald",
});

export default registry;

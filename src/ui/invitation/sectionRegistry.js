/**
 * Section Component Registry
 * --------------------------
 * Section id -> { component, select } mapping.
 * The renderer resolves sections through this registry and never imports a
 * section implementation directly. Adding a section = registerSection(...).
 */
import {
  HeroSection,
  CoupleSection,
  EventDetailsSection,
  CountdownSection,
  FamilySection,
  ScheduleSection,
  VenueSection,
  GallerySection,
  ContactSection,
  FooterSection,
} from "./sections";

const registry = new Map();

/**
 * @param {string} id       section id used in invitation.config.sections
 * @param {object} entry    { component, select?: (invitation) => data }
 */
export function registerSection(id, entry) {
  if (!id || !entry?.component) return;
  registry.set(id, { select: (inv) => inv?.[id], ...entry });
}

export function getSection(id) {
  return registry.get(id) || null;
}

export function listSectionIds() {
  return Array.from(registry.keys());
}

/* Built-in sections */
registerSection("hero", { component: HeroSection });
registerSection("couple", { component: CoupleSection });
registerSection("eventDetails", { component: EventDetailsSection });
registerSection("countdown", { component: CountdownSection });
registerSection("family", { component: FamilySection });
registerSection("schedule", { component: ScheduleSection });
registerSection("venue", { component: VenueSection });
registerSection("gallery", { component: GallerySection });
registerSection("contact", { component: ContactSection });
registerSection("footer", { component: FooterSection });

export default registry;

import React from "react";
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

/**
 * Configuration-driven renderer.
 * The registry maps a section key to (data, config, theme) -> JSX.
 * Add a new section by extending the registry — no page changes required.
 */
const REGISTRY = {
  hero: (inv, theme) => <HeroSection data={inv.hero} theme={theme} />,
  couple: (inv, theme) => <CoupleSection data={inv.couple} theme={theme} />,
  eventDetails: (inv, theme) => (
    <EventDetailsSection data={inv.eventDetails} theme={theme} />
  ),
  countdown: (inv, theme) => (
    <CountdownSection data={inv.countdown} theme={theme} />
  ),
  family: (inv, theme) => <FamilySection data={inv.family} theme={theme} />,
  schedule: (inv, theme) => <ScheduleSection data={inv.schedule} theme={theme} />,
  venue: (inv, theme) => <VenueSection data={inv.venue} theme={theme} />,
  gallery: (inv, theme) => <GallerySection data={inv.gallery} theme={theme} />,
  contact: (inv, theme) => <ContactSection data={inv.contact} theme={theme} />,
  footer: (inv, theme) => <FooterSection data={inv.footer} theme={theme} />,
};

export default function InvitationRenderer({ invitation }) {
  if (!invitation) return null;
  const theme = invitation.theme || {};
  const sections = invitation.config?.sections?.length
    ? invitation.config.sections
    : Object.keys(REGISTRY);

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.bg || "from-slate-900 via-slate-950 to-black"} text-white`}>
      {sections.map((key) => {
        const render = REGISTRY[key];
        if (!render) return null;
        return <React.Fragment key={key}>{render(invitation, theme)}</React.Fragment>;
      })}
    </div>
  );
}

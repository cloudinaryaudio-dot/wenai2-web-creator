import React, { useEffect, useState } from "react";
import { useTheme } from "../../../lib/theme";

/**
 * Section modules.
 * Each section receives only { data } (plus optional invitation/rules) and
 * consumes presentation exclusively through design tokens.
 * No hardcoded colors, fonts, radii or shadows.
 */

/* ---------------- primitives (token consumers) ---------------- */

function Section({ children, tone = "default", className = "" }) {
  const { tokens } = useTheme();
  return (
    <section
      className={className}
      style={{
        ...tokens.section.style,
        width: "100%",
        textAlign: tone === "center" ? "center" : undefined,
      }}
    >
      {children}
    </section>
  );
}

function Card({ children, className = "", style }) {
  const { tokens } = useTheme();
  return (
    <div className={`${tokens.card.className} ${className}`} style={{ ...tokens.card.style, ...style }}>
      {children}
    </div>
  );
}

function Heading({ children, size = "3xl", className = "" }) {
  const { tokens } = useTheme();
  return (
    <h2
      className={className}
      style={{ ...tokens.heading.style, fontSize: `var(--inv-text-${size})`, fontWeight: 700 }}
    >
      {children}
    </h2>
  );
}

function Muted({ children, size = "base", className = "" }) {
  const { tokens } = useTheme();
  return (
    <p className={className} style={{ ...tokens.body.style, fontSize: `var(--inv-text-${size})` }}>
      {children}
    </p>
  );
}

/* ---------------- sections ---------------- */

export function HeroSection({ data }) {
  const { tokens } = useTheme();
  if (!data) return null;
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {data.image && (
        <img src={data.image} alt={data.title || "Hero"} className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      <div className="relative text-center px-6 max-w-3xl">
        {data.tagline && (
          <div
            className="uppercase mb-4"
            style={{
              ...tokens.accent.style,
              fontSize: "var(--inv-text-sm)",
              letterSpacing: "0.4em",
            }}
          >
            {data.tagline}
          </div>
        )}
        <h1 style={{ ...tokens.heading.style, fontSize: "var(--inv-text-5xl)", fontWeight: 900 }}>
          {data.title}
        </h1>
        {data.subtitle && (
          <div className="mt-4">
            <Muted size="lg">{data.subtitle}</Muted>
          </div>
        )}
        {data.date && (
          <div
            className="mt-6 inline-block px-6 py-2 border"
            style={tokens.badge.style}
          >
            {formatDate(data.date)}
          </div>
        )}
      </div>
    </section>
  );
}

export function CoupleSection({ data }) {
  const { tokens } = useTheme();
  if (!data) return null;
  const { bride, groom } = data;
  return (
    <Section>
      <div className="grid sm:grid-cols-2 gap-8">
        {[groom, bride].map((p, i) =>
          p ? (
            <Card key={i} className="p-6 text-center">
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-40 h-40 object-cover mx-auto mb-4"
                  style={{
                    borderRadius: "var(--inv-radius-pill)",
                    boxShadow: "var(--inv-shadow-sm)",
                    border: "4px solid var(--inv-color-accent)",
                  }}
                />
              )}
              <Heading size="xl">{p.name}</Heading>
              {p.about && <Muted className="mt-2">{p.about}</Muted>}
            </Card>
          ) : null
        )}
      </div>
    </Section>
  );
}

export function EventDetailsSection({ data }) {
  if (!data) return null;
  return (
    <Section tone="center">
      <Heading size="4xl">{data.title}</Heading>
      <div className="mt-4">
        <Muted size="lg">{data.description}</Muted>
      </div>
    </Section>
  );
}

export function CountdownSection({ data }) {
  const { tokens } = useTheme();
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!data?.targetDate) return null;
  const diff = Math.max(0, new Date(data.targetDate).getTime() - now);
  const cells = [
    { label: "Days", value: Math.floor(diff / 86400000) },
    { label: "Hours", value: Math.floor((diff / 3600000) % 24) },
    { label: "Minutes", value: Math.floor((diff / 60000) % 60) },
    { label: "Seconds", value: Math.floor((diff / 1000) % 60) },
  ];
  return (
    <Section tone="center">
      {data.label && <Heading>{data.label}</Heading>}
      <div className="grid grid-cols-4 gap-3 sm:gap-6 mt-8">
        {cells.map((c) => (
          <Card key={c.label} className="p-4 sm:p-6">
            <div style={{ ...tokens.accent.style, fontSize: "var(--inv-text-3xl)", fontWeight: 900 }}>
              {String(c.value).padStart(2, "0")}
            </div>
            <div style={{ ...tokens.body.style, fontSize: "var(--inv-text-xs)", letterSpacing: "0.2em" }} className="mt-1 uppercase">
              {c.label}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function FamilySection({ data }) {
  if (!data?.length) return null;
  return (
    <Section tone="center">
      <Heading>Family</Heading>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        {data.map((m, i) => (
          <Card key={i} className="p-5 text-center">
            <Heading size="lg">{m.name}</Heading>
            <Muted size="sm" className="mt-1">{m.relation}</Muted>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function ScheduleSection({ data }) {
  const { tokens } = useTheme();
  if (!data?.length) return null;
  return (
    <Section tone="center">
      <Heading>Schedule</Heading>
      <div className="space-y-4 mt-8 text-left">
        {data.map((e, i) => (
          <Card key={i} className="p-5 flex flex-col sm:flex-row sm:items-center gap-3">
            <div
              className="uppercase sm:w-32"
              style={{ ...tokens.accent.style, fontSize: "var(--inv-text-sm)", fontWeight: 700, letterSpacing: "0.2em" }}
            >
              {formatDate(e.date)}
            </div>
            <div className="flex-1">
              <Heading size="lg">{e.title}</Heading>
              {e.venue && <Muted size="sm">{e.venue}</Muted>}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export function VenueSection({ data }) {
  if (!data) return null;
  return (
    <Section tone="center">
      <Heading>Venue</Heading>
      <Card className="overflow-hidden mt-8">
        <div className="p-6 text-center">
          <Heading size="xl">{data.name}</Heading>
          {data.address && <Muted className="mt-1">{data.address}</Muted>}
        </div>
        {data.mapEmbed && (
          <iframe src={data.mapEmbed} title="Venue map" className="w-full h-72 border-0" loading="lazy" />
        )}
      </Card>
    </Section>
  );
}

export function GallerySection({ data }) {
  const { tokens } = useTheme();
  if (!data?.length) return null;
  return (
    <Section tone="center">
      <Heading>Gallery</Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-8">
        {data.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery ${i + 1}`}
            className="w-full aspect-square object-cover hover:scale-[1.02] transition-transform"
            style={tokens.image.style}
            loading="lazy"
          />
        ))}
      </div>
    </Section>
  );
}

export function ContactSection({ data }) {
  const { tokens } = useTheme();
  if (!data?.length) return null;
  return (
    <Section tone="center">
      <Heading>Contact</Heading>
      <div className="grid sm:grid-cols-2 gap-4 mt-8">
        {data.map((c, i) => (
          <a key={i} href={`tel:${c.phone}`} className={`${tokens.card.className} p-5 block`} style={tokens.card.style}>
            <Heading size="lg">{c.name}</Heading>
            <Muted size="sm" className="mt-1">{c.phone}</Muted>
          </a>
        ))}
      </div>
    </Section>
  );
}

export function FooterSection({ data }) {
  const { tokens } = useTheme();
  if (!data) return null;
  return (
    <footer
      className="text-center mt-10"
      style={{
        ...tokens.section.style,
        borderTop: "1px solid var(--inv-color-border)",
      }}
    >
      <Muted size="lg">{data.message}</Muted>
      {data.hashtag && (
        <div className="mt-2" style={{ ...tokens.accent.style, fontWeight: 700, letterSpacing: "0.2em" }}>
          {data.hashtag}
        </div>
      )}
    </footer>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

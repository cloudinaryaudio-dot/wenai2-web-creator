import React, { useEffect, useState } from "react";

/**
 * Section components.
 * Each accepts only { data, config, theme }. No unrelated props.
 */

const cardCls =
  "rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-xl";

export function HeroSection({ data, theme }) {
  if (!data) return null;
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {data.image && (
        <img
          src={data.image}
          alt={data.title || "Hero"}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
      <div className="relative text-center px-6 max-w-3xl">
        {data.tagline && (
          <div
            className="uppercase tracking-[0.4em] text-sm mb-4"
            style={{ color: theme?.accent || "#d4a24c" }}
          >
            {data.tagline}
          </div>
        )}
        <h1
          className="text-5xl sm:text-7xl font-black mb-4"
          style={{ color: theme?.text || "#fff", fontFamily: theme?.font }}
        >
          {data.title}
        </h1>
        {data.subtitle && (
          <p className="text-white/80 text-lg sm:text-xl">{data.subtitle}</p>
        )}
        {data.date && (
          <div
            className="mt-6 inline-block px-6 py-2 rounded-full border"
            style={{ borderColor: theme?.accent || "#d4a24c", color: theme?.accent || "#d4a24c" }}
          >
            {formatDate(data.date)}
          </div>
        )}
      </div>
    </section>
  );
}

export function CoupleSection({ data, theme }) {
  if (!data) return null;
  const { bride, groom } = data;
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto">
      <div className="grid sm:grid-cols-2 gap-8">
        {[groom, bride].map((p, i) =>
          p ? (
            <div key={i} className={`${cardCls} p-6 text-center`}>
              {p.image && (
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-40 h-40 rounded-full object-cover mx-auto mb-4 ring-4"
                  style={{ ringColor: theme?.accent }}
                />
              )}
              <h3 className="text-2xl font-bold text-white">{p.name}</h3>
              {p.about && <p className="text-white/70 mt-2">{p.about}</p>}
            </div>
          ) : null
        )}
      </div>
    </section>
  );
}

export function EventDetailsSection({ data }) {
  if (!data) return null;
  return (
    <section className="py-16 px-6 text-center max-w-3xl mx-auto">
      <h2 className="text-4xl font-black text-white mb-4">{data.title}</h2>
      <p className="text-white/70 text-lg">{data.description}</p>
    </section>
  );
}

export function CountdownSection({ data, theme }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!data?.targetDate) return null;
  const target = new Date(data.targetDate).getTime();
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const cells = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: mins },
    { label: "Seconds", value: secs },
  ];
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto text-center">
      {data.label && (
        <h2 className="text-3xl font-bold text-white mb-8">{data.label}</h2>
      )}
      <div className="grid grid-cols-4 gap-3 sm:gap-6">
        {cells.map((c) => (
          <div key={c.label} className={`${cardCls} p-4 sm:p-6`}>
            <div
              className="text-3xl sm:text-5xl font-black"
              style={{ color: theme?.accent || "#d4a24c" }}
            >
              {String(c.value).padStart(2, "0")}
            </div>
            <div className="text-xs sm:text-sm text-white/60 mt-1 uppercase tracking-widest">
              {c.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FamilySection({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Family</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {data.map((m, i) => (
          <div key={i} className={`${cardCls} p-5 text-center`}>
            <div className="text-white font-semibold">{m.name}</div>
            <div className="text-white/60 text-sm mt-1">{m.relation}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function ScheduleSection({ data, theme }) {
  if (!data?.length) return null;
  return (
    <section className="py-16 px-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Schedule</h2>
      <div className="space-y-4">
        {data.map((e, i) => (
          <div key={i} className={`${cardCls} p-5 flex flex-col sm:flex-row sm:items-center gap-3`}>
            <div
              className="text-sm font-bold uppercase tracking-widest sm:w-32"
              style={{ color: theme?.accent || "#d4a24c" }}
            >
              {formatDate(e.date)}
            </div>
            <div className="flex-1">
              <div className="text-white font-bold text-lg">{e.title}</div>
              {e.venue && <div className="text-white/60 text-sm">{e.venue}</div>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function VenueSection({ data }) {
  if (!data) return null;
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Venue</h2>
      <div className={`${cardCls} overflow-hidden`}>
        <div className="p-6 text-center">
          <div className="text-2xl font-bold text-white">{data.name}</div>
          {data.address && <div className="text-white/70 mt-1">{data.address}</div>}
        </div>
        {data.mapEmbed && (
          <iframe
            src={data.mapEmbed}
            title="Venue map"
            className="w-full h-72 border-0"
            loading="lazy"
          />
        )}
      </div>
    </section>
  );
}

export function GallerySection({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Gallery</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {data.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery ${i + 1}`}
            className="w-full aspect-square object-cover rounded-2xl hover:scale-[1.02] transition-transform"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ data }) {
  if (!data?.length) return null;
  return (
    <section className="py-16 px-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-8">Contact</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {data.map((c, i) => (
          <a
            key={i}
            href={`tel:${c.phone}`}
            className={`${cardCls} p-5 hover:bg-white/10 transition text-center`}
          >
            <div className="text-white font-semibold">{c.name}</div>
            <div className="text-white/70 text-sm mt-1">{c.phone}</div>
          </a>
        ))}
      </div>
    </section>
  );
}

export function FooterSection({ data, theme }) {
  if (!data) return null;
  return (
    <footer className="py-12 px-6 text-center border-t border-white/10 mt-10">
      <div className="text-white/80 text-lg">{data.message}</div>
      {data.hashtag && (
        <div
          className="mt-2 font-bold tracking-widest"
          style={{ color: theme?.accent || "#d4a24c" }}
        >
          {data.hashtag}
        </div>
      )}
    </footer>
  );
}

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

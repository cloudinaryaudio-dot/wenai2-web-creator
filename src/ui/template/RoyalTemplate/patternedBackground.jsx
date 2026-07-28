import React, { useState } from "react";

/**
 * WeddingBackgrounds.jsx
 * Single-file React component with 15 print-ready SVG themes (mandala, paisley, henna).
 * Minimal UI: only small circular theme pickers (no heavy blocks). Drop this file in your React + Tailwind project.
 *
 * Usage:
 *   <WeddingBackgrounds initial={0} />
 *
 * Notes:
 * - Inline SVG motifs remain vector for printing. To export for print, extract the SVG nodes or use a vector-aware export.
 */

function MandalaSVG({ opacity = 0.12 }) {
  return (
    <svg viewBox="0 0 1200 1200" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      <defs>
        <linearGradient id="goldGradA" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#F6E7C6" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#goldGradA)" strokeWidth="2" opacity={opacity}>
        <circle cx="600" cy="600" r="520" />
        <circle cx="600" cy="600" r="420" />
        <circle cx="600" cy="600" r="320" />
        {[...Array(24)].map((_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          const x = 600 + Math.cos(angle) * 520;
          const y = 600 + Math.sin(angle) * 520;
          return <path key={i} d={`M600 600 L ${x} ${y}`} />;
        })}
      </g>
    </svg>
  );
}

function PaisleySVG({ opacity = 0.08 }) {
  return (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      <defs>
        <linearGradient id="paisleyGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#FFDDB1" />
          <stop offset="100%" stopColor="#C09C4A" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#paisleyGrad)" strokeWidth="1.2" opacity={opacity}>
        {[...Array(12)].map((_, i) => {
          const cx = 100 + (i % 4) * 180;
          const cy = 100 + Math.floor(i / 4) * 220;
          return (
            <g key={i} transform={`translate(${cx},${cy})`}>
              <path d="M0 0 C 30 -40, 80 -40, 110 0 C 140 40, 110 120, 50 140 C -10 120 -40 40 0 0 Z" />
              <path d="M25 20 C 40 10, 70 10, 85 20" strokeWidth="0.8" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

function HennaSVG({ opacity = 0.08 }) {
  return (
    <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      <g fill="none" stroke="#8B5A2B" strokeWidth="1" opacity={opacity}>
        <path d="M20 300 C 150 120, 350 120, 480 300 S 730 520, 900 300" />
        {[...Array(18)].map((_, i) => (
          <circle key={i} cx={40 + i * 50} cy={120 + ((i % 3) * 40)} r="3" />
        ))}
      </g>
    </svg>
  );
}

const THEMES = [
  { id: 1, name: "Pastel Floral Watercolor", background: "radial-gradient(circle at 10% 20%, #FDE8EE 0%, #F9C6D1 30%, #FFD6E0 70%, #F7E7EE 100%)", decor: (i) => <MandalaSVG opacity={0.06} /> },
  { id: 2, name: "Blush Peach Watercolor Leaves", background: "linear-gradient(180deg,#FFEFE6 0%, #FFD6BF 60%, #FFF8F5 100%)", decor: () => <HennaSVG opacity={0.04} /> },
  { id: 3, name: "Pastel Mint Floral Tile", background: "radial-gradient(circle at 50% 40%, #F6FFF9 0%, #E8F8F0 35%, #CFF3E6 100%)", decor: () => <PaisleySVG opacity={0.035} /> },
  { id: 4, name: "Gold Mandala Concentric Lace (Maroon)", background: "radial-gradient(circle at 50% 35%, rgba(237,230,218,0.02) 0%, #6B0F10 35%, #8A1B1E 100%)", decor: () => <MandalaSVG opacity={0.14} /> },
  { id: 5, name: "Geometric Lace with Gold Foil", background: "#FFF8F2", decor: () => <MandalaSVG opacity={0.06} /> },
  { id: 6, name: "Navy Lace with Conic Gold Shine", background: "linear-gradient(180deg,#071133 0%, #0f2a52 70%)", decor: () => <MandalaSVG opacity={0.06} /> },
  { id: 7, name: "Delicate Henna Line Art", background: "linear-gradient(180deg,#FFF9F2 0%, #FCE8C9 60%)", decor: () => <HennaSVG opacity={0.12} /> },
  { id: 8, name: "Henna Paisley Border", background: "#FFF6EF", decor: () => <PaisleySVG opacity={0.12} /> },
  { id: 9, name: "Intricate Mehndi Lace", background: "linear-gradient(180deg,#FFF9F4 0%, #F7E4D6 100%)", decor: () => <HennaSVG opacity={0.14} /> },
  { id: 10, name: "Ganesha Silhouette in Subtle Gold", background: "linear-gradient(180deg,#7A1418 0%, #C84A4A 70%)", decor: () => (
    <svg viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      <defs>
        <linearGradient id="ganeshaGrad" x1="0" x2="1"><stop offset="0%" stopColor="#F6EDE3"/><stop offset="100%" stopColor="#D4AF37"/></linearGradient>
      </defs>
      <g opacity="0.08" fill="url(#ganeshaGrad)">
        <path d="M600 120 C 540 80, 480 120, 460 180 C 440 240, 520 340, 580 360 C 640 380, 720 340, 740 280 C 760 220, 700 140, 600 120 Z" />
        <circle cx="650" cy="220" r="10" />
      </g>
    </svg>
  )},
  { id: 11, name: "Om Motif with Circular Gold Halo", background: "radial-gradient(circle at 50% 40%, #2B4C6F 0%, #10243A 100%)", decor: () => (
    <svg viewBox="0 0 800 800" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" aria-hidden className="w-full h-full">
      <defs><radialGradient id="omHalo" cx="50%" cy="50%"><stop offset="0%" stopColor="#FFF1C9"/><stop offset="100%" stopColor="#FFD550"/></radialGradient></defs>
      <g opacity="0.08"><circle cx="400" cy="300" r="180" fill="url(#omHalo)"/><text x="400" y="330" textAnchor="middle" fontSize="160" fill="#10243A" fontFamily="serif">ॐ</text></g>
    </svg>
  )},
  { id: 12, name: "Auspicious Motifs (Kalash/Lotus)", background: "#FFF8EC", decor: () => <PaisleySVG opacity={0.06} /> },
  { id: 13, name: "Silk Wave with Paisley Drift", background: "linear-gradient(180deg,#FDEDE9 0%, #F8C8C4 60%)", decor: () => <PaisleySVG opacity={0.06} /> },
  { id: 14, name: "Modern Abstract Waves (Sage/Champagne)", background: "linear-gradient(180deg,#EAF5EE 0%, #CDEBD8 60%)", decor: () => <PaisleySVG opacity={0.04} /> },
  { id: 15, name: "Deep Jewel Silk with Paisley Motif", background: "linear-gradient(180deg,#2A0F3B 0%, #4A1F5C 70%)", decor: () => <MandalaSVG opacity={0.06} /> },
];

export default function PatternedBackground({ initial = 0 }) {
  const [index, setIndex] = useState(initial);
  const theme = THEMES[index] || THEMES[0];

  return (
    <div className="min-h-screen w-full flex items-center justify-center" style={{ background: theme.background }}>
      {/* decorative SVG layer (vector, print-ready) */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden>
        {theme.decor()}
        {/* very light noise for on-screen subtlety */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.02, backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 2px)', backgroundSize: '6px 6px' }} />
      </div>
      <img
  src="/p.png"
  alt="ganesha"
  className="
    w-44 h-44           /* 180px width & height */
    rounded-full       /* fully rounded circle */
    object-cover       /* maintain aspect ratio, cover frame */
    border-4           /* border width */
    border-transparent /* transparent border base */
    bg-gradient-to-br from-amber-400 via-yellow-300 to-yellow-200 /* gradient background for border effect */
    p-1                /* padding creates border spacing */
    shadow-2xl         /* strong shadow for depth */
    filter drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] /* subtle warm glow */
    transition-shadow duration-300 ease-in-out /* smooth shadow transitions */
  "
/>


      {/* minimal centered card */}
      <div className="relative z-10 w-full max-w-2xl mx-4">
        <div className="mx-auto text-center rounded-xl bg-white/92 backdrop-blur-sm p-6 shadow-lg border border-white/60">
          <h2 className="text-xl font-semibold text-gray-900">[BRIDE] &amp; [GROOM]</h2>
          <p className="mt-2 text-xs text-gray-600">Wedding Invitation Preview</p>
        </div>
      </div>

      {/* small circular theme pickers - minimal UI */}
      <div className="fixed left-4 top-6 z-20 flex flex-col gap-3">
        {THEMES.map((t, i) => (
          <button key={t.id} aria-label={`Select theme ${t.name}`} title={t.name}
            onClick={() => setIndex(i)}
            className="w-10 h-10 rounded-full ring-1 ring-white/40 shadow-sm flex items-center justify-center"
            style={{ background: (typeof t.background === 'string' ? t.background : '#fff'), transform: i === index ? 'scale(1.05)' : 'scale(1)', transition: 'transform 160ms' }}>
            {/* tiny inner dot for contrast */}
            <div style={{ width: 8, height: 8, borderRadius: 999, background: 'rgba(255,255,255,0.9)' }} />
          </button>
        ))}
      </div>

      <style>{`
        /* ensure svg vectors don't interfere with print; keep print clean */
        @media print {
          .backdrop-blur-sm { backdrop-filter: none !important; }
          .shadow-lg { box-shadow: none !important; }
        }

        /* small accessibility focus state */
        button:focus { outline: 3px solid rgba(99,102,241,0.22); outline-offset: 2px; }
      `}</style>
    </div>
  );
}

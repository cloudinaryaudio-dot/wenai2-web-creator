import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, Heart, Sparkles, Crown, Gift, Cake, Baby,
  GraduationCap, Briefcase, PartyPopper, Flower2, Star, X, Check, Clock, FileText,
} from "lucide-react";
import { useData } from "../context/DataContext";

const iconMap = {
  wedding: Heart,
  engagement: Crown,
  birthday: Cake,
  baby: Baby,
  anniversary: Flower2,
  graduation: GraduationCap,
  corporate: Briefcase,
  party: PartyPopper,
  festival: Gift,
};

export default function CardsPage() {
  const navigate = useNavigate();
  const { get } = useData();
  const store = get("cards") || { categories: [], cards: [] };

  const categories = useMemo(
    () => [
      { id: "all", name: "All Cards", gradient: "from-violet-500 to-fuchsia-500" },
      ...(store.categories || []),
    ],
    [store.categories]
  );
  const cards = store.cards || [];

  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = useMemo(() => {
    return cards.filter(c =>
      (active === "all" || c.category === active) &&
      c.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [cards, active, query]);

  const grouped = useMemo(() => {
    if (active !== "all") return null;
    const map = {};
    (store.categories || []).forEach(cat => {
      const items = cards.filter(c => c.category === cat.id && c.title.toLowerCase().includes(query.toLowerCase()));
      if (items.length) map[cat.id] = { cat, items };
    });
    return map;
  }, [active, query, cards, store.categories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <header className="sticky top-0 z-30 backdrop-blur-xl bg-slate-950/70 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Home
          </button>
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-amber-300 via-pink-300 to-fuchsia-300 bg-clip-text text-transparent">
            Card Studio
          </h1>
          <div className="ml-auto relative flex-1 max-w-md hidden sm:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search cards..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 focus:border-fuchsia-400/50 focus:outline-none placeholder:text-white/40"
            />
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
          <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" /> {cards.length}+ Premium Designs
          </span>
          <h2 className="text-4xl sm:text-6xl font-black leading-tight mb-4">
            Design a card for{" "}
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              every moment
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Tap any card to see the full details. Admins can edit everything from the admin dashboard.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar">
          {categories.map((c) => {
            const Icon = c.id === "all" ? Sparkles : (iconMap[c.id] || Star);
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                className={`shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all ${
                  isActive
                    ? `bg-gradient-to-r ${c.gradient} border-transparent shadow-lg scale-105`
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-semibold text-sm whitespace-nowrap">{c.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {active === "all" && grouped ? (
          Object.entries(grouped).map(([key, { cat, items }]) => {
            const Icon = iconMap[cat.id] || Star;
            return (
              <div key={key} className="mb-12">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-2xl font-bold">{cat.name}</h3>
                  </div>
                  <button
                    onClick={() => setActive(cat.id)}
                    className="text-sm text-white/60 hover:text-white transition"
                  >
                    View all →
                  </button>
                </div>
                <CardGrid items={items} onOpen={setSelected} />
              </div>
            );
          })
        ) : (
          <CardGrid items={filtered} onOpen={setSelected} />
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/60">
            No cards found. Try a different search.
          </div>
        )}
      </section>

      {selected && <CardDetailModal card={selected} onClose={() => setSelected(null)} />}

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </div>
  );
}

function CardGrid({ items, onOpen }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((card) => (
        <div
          key={card.id}
          className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-fuchsia-400/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/10"
        >
          <button
            onClick={() => onOpen(card)}
            className="block w-full text-left"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={card.img}
                alt={card.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
              {card.tag && (
                <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg">
                  {card.tag}
                </span>
              )}
            </div>
          </button>
          <div className="p-4">
            <h4 className="font-bold text-lg mb-1 truncate">{card.title}</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-300 text-sm">
                <Star className="w-4 h-4 fill-amber-300" /> {card.rating ?? 4.8}
              </div>
              <span className="font-bold text-fuchsia-300">{card.price}</span>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                onClick={() => onOpen(card)}
                className="py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 font-semibold text-sm transition"
              >
                View Details
              </button>
              <button
                onClick={() => navigate(`/invitation/${card.invitationId || "default"}`)}
                className="py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 font-semibold text-sm transition"
              >
                View Invitation
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CardDetailModal({ card, onClose }) {
  const navigate = useNavigate();
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[92vh] overflow-auto rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid md:grid-cols-2 gap-0">
          <div className="relative aspect-[4/5] md:aspect-auto overflow-hidden md:rounded-l-3xl">
            <img src={card.img} alt={card.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-slate-950/70 to-transparent" />
            {card.tag && (
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-amber-400 to-pink-500 shadow-lg">
                {card.tag}
              </span>
            )}
          </div>

          <div className="p-6 sm:p-8 text-white">
            <div className="text-xs uppercase tracking-widest text-fuchsia-300 mb-2">
              {card.category}
            </div>
            <h3 className="text-3xl font-black mb-3">{card.title}</h3>

            <div className="flex items-center gap-4 mb-5">
              <div className="flex items-center gap-1 text-amber-300">
                <Star className="w-4 h-4 fill-amber-300" />
                <span className="font-semibold">{card.rating ?? 4.8}</span>
              </div>
              <span className="text-2xl font-black text-fuchsia-300">{card.price}</span>
            </div>

            <p className="text-white/70 leading-relaxed mb-6">
              {card.description || "No description provided."}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                  <FileText className="w-3.5 h-3.5" /> Pages
                </div>
                <div className="font-bold">{card.pages ?? "—"}</div>
              </div>
              <div className="rounded-xl bg-white/5 border border-white/10 p-3">
                <div className="flex items-center gap-2 text-white/50 text-xs mb-1">
                  <Clock className="w-3.5 h-3.5" /> Delivery
                </div>
                <div className="font-bold">
                  {card.deliveryDays ? `${card.deliveryDays} day${card.deliveryDays > 1 ? "s" : ""}` : "—"}
                </div>
              </div>
            </div>

            {Array.isArray(card.features) && card.features.length > 0 && (
              <div className="mb-6">
                <div className="text-sm font-semibold text-white/80 mb-2">What's included</div>
                <ul className="space-y-2">
                  {card.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                      <Check className="w-4 h-4 mt-0.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => { onClose(); navigate(`/invitation/${card.invitationId || "default"}`); }}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 font-semibold transition"
              >
                View Invitation
              </button>
              <button
                onClick={onClose}
                className="px-5 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

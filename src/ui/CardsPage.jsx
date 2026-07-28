import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, Heart, Sparkles, Crown, Gift, Cake, Baby,
  GraduationCap, Briefcase, PartyPopper, Flower2, Star,
} from "lucide-react";

const categories = [
  { id: "all", name: "All Cards", icon: Sparkles, gradient: "from-violet-500 to-fuchsia-500" },
  { id: "wedding", name: "Wedding", icon: Heart, gradient: "from-rose-500 to-pink-500" },
  { id: "engagement", name: "Engagement", icon: Crown, gradient: "from-amber-500 to-orange-500" },
  { id: "birthday", name: "Birthday", icon: Cake, gradient: "from-pink-500 to-purple-500" },
  { id: "baby", name: "Baby Shower", icon: Baby, gradient: "from-sky-400 to-indigo-500" },
  { id: "anniversary", name: "Anniversary", icon: Flower2, gradient: "from-red-500 to-rose-600" },
  { id: "graduation", name: "Graduation", icon: GraduationCap, gradient: "from-emerald-500 to-teal-500" },
  { id: "corporate", name: "Corporate", icon: Briefcase, gradient: "from-slate-600 to-slate-800" },
  { id: "party", name: "Party", icon: PartyPopper, gradient: "from-yellow-400 to-red-500" },
  { id: "festival", name: "Festival", icon: Gift, gradient: "from-fuchsia-500 to-purple-600" },
];

const cards = [
  { id: 1, title: "Royal Indian Wedding", category: "wedding", price: "₹1,999", tag: "Bestseller", img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800" },
  { id: 2, title: "Minimal Modern Wedding", category: "wedding", price: "₹999", tag: "New", img: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800" },
  { id: 3, title: "Beach Sunset Wedding", category: "wedding", price: "₹1,499", img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800" },
  { id: 4, title: "Golden Engagement", category: "engagement", price: "₹1,299", tag: "Popular", img: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800" },
  { id: 5, title: "Ring Ceremony", category: "engagement", price: "₹899", img: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=800" },
  { id: 6, title: "Kids Birthday Bash", category: "birthday", price: "₹499", tag: "Hot", img: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=800" },
  { id: 7, title: "Elegant Milestone", category: "birthday", price: "₹699", img: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800" },
  { id: 8, title: "It's a Boy", category: "baby", price: "₹599", img: "https://images.unsplash.com/photo-1519689680058-324335c77eba?w=800" },
  { id: 9, title: "It's a Girl", category: "baby", price: "₹599", img: "https://images.unsplash.com/photo-1544126592-807ade215a0b?w=800" },
  { id: 10, title: "25th Anniversary", category: "anniversary", price: "₹1,199", tag: "Premium", img: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800" },
  { id: 11, title: "Graduation Day", category: "graduation", price: "₹799", img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800" },
  { id: 12, title: "Corporate Gala", category: "corporate", price: "₹1,499", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800" },
  { id: 13, title: "Neon Party Night", category: "party", price: "₹599", tag: "Trending", img: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800" },
  { id: 14, title: "Diwali Greetings", category: "festival", price: "₹399", img: "https://images.unsplash.com/photo-1604423481675-52c1e37c3e2b?w=800" },
  { id: 15, title: "Holi Celebrations", category: "festival", price: "₹399", img: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=800" },
  { id: 16, title: "Sangeet Night", category: "wedding", price: "₹1,099", img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" },
];

export default function CardsPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return cards.filter(c =>
      (active === "all" || c.category === active) &&
      c.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [active, query]);

  const grouped = useMemo(() => {
    if (active !== "all") return null;
    const map = {};
    categories.slice(1).forEach(cat => {
      const items = cards.filter(c => c.category === cat.id && c.title.toLowerCase().includes(query.toLowerCase()));
      if (items.length) map[cat.id] = { cat, items };
    });
    return map;
  }, [active, query]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      {/* Header */}
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

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-fuchsia-600/20 blur-3xl" />
          <div className="absolute top-10 right-0 w-96 h-96 rounded-full bg-amber-500/20 blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm mb-6">
            <Sparkles className="w-4 h-4 text-amber-300" /> 200+ Premium Designs
          </span>
          <h2 className="text-4xl sm:text-6xl font-black leading-tight mb-4">
            Design a card for{" "}
            <span className="bg-gradient-to-r from-amber-300 via-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
              every moment
            </span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Weddings, birthdays, anniversaries, corporate — pick a category and start creating in seconds.
          </p>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
        <div className="flex gap-3 overflow-x-auto pb-3 no-scrollbar">
          {categories.map((c) => {
            const Icon = c.icon;
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

      {/* Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-20">
        {active === "all" && grouped ? (
          Object.entries(grouped).map(([key, { cat, items }]) => (
            <div key={key} className="mb-12">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl bg-gradient-to-br ${cat.gradient}`}>
                    <cat.icon className="w-5 h-5" />
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
              <CardGrid items={items} />
            </div>
          ))
        ) : (
          <CardGrid items={filtered} />
        )}

        {filtered.length === 0 && (
          <div className="text-center py-20 text-white/60">
            No cards found. Try a different search.
          </div>
        )}
      </section>

      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
    </div>
  );
}

function CardGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((card) => (
        <div
          key={card.id}
          className="group relative rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-fuchsia-400/40 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-fuchsia-500/10"
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
            <button className="absolute top-3 right-3 p-2 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 transition">
              <Heart className="w-4 h-4" />
            </button>
          </div>
          <div className="p-4">
            <h4 className="font-bold text-lg mb-1 truncate">{card.title}</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-amber-300 text-sm">
                <Star className="w-4 h-4 fill-amber-300" /> 4.9
              </div>
              <span className="font-bold text-fuchsia-300">{card.price}</span>
            </div>
            <button className="mt-4 w-full py-2.5 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 hover:from-fuchsia-400 hover:to-pink-400 font-semibold text-sm transition">
              Customize
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

import React, { useState } from "react";
import { useData } from "../../../context/DataContext";
import { Pencil, Trash2, Plus, X } from "lucide-react";

/**
 * DataAdminPanel
 * --------------
 * Admin surface to control the localStorage-backed "DB".
 *
 * - Seed:   copy the mock JSON into localStorage (overwrite).
 * - Reset:  remove the localStorage entry and rehydrate from mock.
 * - View:   peek the current stored JSON.
 * - Cards editor: add / edit / delete cards; changes persist in localStorage
 *   and reflect immediately on the public /cards page.
 */
export default function DataAdminPanel() {
  const { datasets, data, seedFromMock, reset } = useData();
  const [openKey, setOpenKey] = useState(null);
  const [toast, setToast] = useState("");
  const fileInputRef = React.useRef(null);

  const flash = (msg) => {
    setToast(msg);
    window.clearTimeout(flash._t);
    flash._t = window.setTimeout(() => setToast(""), 1800);
  };

  const handleExport = () => {
    const payload = {};
    datasets.forEach((n) => { payload[n] = data[n]; });
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wgen-storage-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    flash("Exported storage JSON");
  };

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        let count = 0;
        datasets.forEach((n) => {
          if (parsed[n] != null) {
            localStorage.setItem(`wgen:${n}`, JSON.stringify(parsed[n]));
            count++;
          }
        });
        flash(`Imported ${count} dataset(s). Reloading…`);
        setTimeout(() => window.location.reload(), 600);
      } catch (err) {
        flash("Invalid JSON file");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleClearAll = () => {
    if (!window.confirm("Clear ALL localStorage for this app? Data will re-seed from mock on next load.")) return;
    datasets.forEach((n) => {
      try { localStorage.removeItem(`wgen:${n}`); } catch { /* ignore */ }
    });
    flash("Cleared. Reloading…");
    setTimeout(() => window.location.reload(), 500);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Data Admin</h2>
          <p className="text-gray-600 text-sm mt-1">
            No database. Data lives in <code>localStorage</code> and is seeded
            from mock JSON files in <code>src/db/data/</code>.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { seedFromMock(); flash("All datasets seeded from mock"); }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Seed All
          </button>
          <button
            onClick={() => { reset(); flash("All datasets reset"); }}
            className="px-4 py-2 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700"
          >
            Reset All
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
          >
            Export JSON
          </button>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={handleImport}
          />
          <button
            onClick={handleClearAll}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Clear Storage
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {datasets.map((name) => {
          const current = data[name];
          const size = current ? JSON.stringify(current).length : 0;
          return (
            <div key={name} className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold capitalize text-gray-900">{name}</h3>
                <span className="text-xs text-gray-500">{(size / 1024).toFixed(1)} KB</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">key: <code>wgen:{name}</code></p>
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => { seedFromMock(name); flash(`${name}: seeded from mock`); }}
                  className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  Seed
                </button>
                <button
                  onClick={() => { reset(name); flash(`${name}: reset`); }}
                  className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                >
                  Reset
                </button>
                <button
                  onClick={() => setOpenKey((k) => (k === name ? null : name))}
                  className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-800 text-sm font-semibold hover:bg-gray-300"
                >
                  {openKey === name ? "Hide" : "View"}
                </button>
              </div>
              {openKey === name && (
                <pre className="mt-4 max-h-72 overflow-auto text-[11px] leading-tight bg-gray-900 text-green-200 p-3 rounded-lg">
                  {JSON.stringify(current, null, 2)}
                </pre>
              )}
            </div>
          );
        })}
      </div>

      <CardsEditor flash={flash} />

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ---------------- Cards Editor ---------------- */

const emptyCard = {
  id: null,
  title: "",
  category: "wedding",
  price: "",
  tag: "",
  img: "",
  rating: 4.8,
  description: "",
  features: [],
  pages: 8,
  deliveryDays: 1,
};

function CardsEditor({ flash }) {
  const { get, set } = useData();
  const store = get("cards") || { categories: [], cards: [] };
  const [editing, setEditing] = useState(null); // card object or null

  const updateCards = (nextCards) => {
    set("cards", { ...store, cards: nextCards });
  };

  const handleSave = (card) => {
    const features = Array.isArray(card.features)
      ? card.features
      : String(card.features || "")
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean);
    const clean = { ...card, features, rating: Number(card.rating) || 0, pages: Number(card.pages) || 0, deliveryDays: Number(card.deliveryDays) || 0 };
    if (clean.id == null) {
      const nextId = (store.cards.reduce((m, c) => Math.max(m, c.id || 0), 0) || 0) + 1;
      updateCards([...store.cards, { ...clean, id: nextId }]);
      flash("Card added");
    } else {
      updateCards(store.cards.map((c) => (c.id === clean.id ? clean : c)));
      flash("Card updated");
    }
    setEditing(null);
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this card?")) return;
    updateCards(store.cards.filter((c) => c.id !== id));
    flash("Card deleted");
  };

  return (
    <div className="border border-gray-200 rounded-2xl p-6 bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
        <div>
          <h3 className="text-2xl font-black text-gray-900">Cards Editor</h3>
          <p className="text-sm text-gray-500">
            Manage the cards shown on <code>/cards</code>. Changes save to
            localStorage immediately.
          </p>
        </div>
        <button
          onClick={() => setEditing({ ...emptyCard })}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700"
        >
          <Plus className="w-4 h-4" /> New Card
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="py-2 pr-3">Preview</th>
              <th className="py-2 pr-3">Title</th>
              <th className="py-2 pr-3">Category</th>
              <th className="py-2 pr-3">Price</th>
              <th className="py-2 pr-3">Tag</th>
              <th className="py-2 pr-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {store.cards.map((c) => (
              <tr key={c.id} className="border-b last:border-0 hover:bg-gray-50">
                <td className="py-2 pr-3">
                  <img src={c.img} alt="" className="w-12 h-12 rounded-lg object-cover" />
                </td>
                <td className="py-2 pr-3 font-semibold text-gray-900">{c.title}</td>
                <td className="py-2 pr-3 capitalize text-gray-600">{c.category}</td>
                <td className="py-2 pr-3 text-gray-800">{c.price}</td>
                <td className="py-2 pr-3 text-gray-500">{c.tag || "—"}</td>
                <td className="py-2 pr-3">
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setEditing({ ...c })}
                      className="p-2 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100"
                      aria-label="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="p-2 rounded-md bg-red-50 text-red-700 hover:bg-red-100"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {store.cards.length === 0 && (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-500">
                  No cards. Click "New Card" or "Seed" to load mock data.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <CardEditorModal
          card={editing}
          categories={store.categories || []}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function CardEditorModal({ card, categories, onClose, onSave }) {
  const [form, setForm] = useState({
    ...card,
    features: Array.isArray(card.features) ? card.features.join("\n") : (card.features || ""),
  });
  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <h4 className="text-xl font-bold text-gray-900">
            {card.id == null ? "New Card" : `Edit: ${card.title}`}
          </h4>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100" aria-label="Close">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 grid gap-4 sm:grid-cols-2">
          <Field label="Title" full>
            <input className={inputCls} value={form.title} onChange={(e) => update("title", e.target.value)} />
          </Field>
          <Field label="Category">
            <select className={inputCls} value={form.category} onChange={(e) => update("category", e.target.value)}>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </Field>
          <Field label="Price">
            <input className={inputCls} value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="₹999" />
          </Field>
          <Field label="Tag (optional)">
            <input className={inputCls} value={form.tag || ""} onChange={(e) => update("tag", e.target.value)} placeholder="Bestseller" />
          </Field>
          <Field label="Rating">
            <input type="number" step="0.1" min="0" max="5" className={inputCls} value={form.rating} onChange={(e) => update("rating", e.target.value)} />
          </Field>
          <Field label="Image URL" full>
            <input className={inputCls} value={form.img} onChange={(e) => update("img", e.target.value)} />
          </Field>
          <Field label="Pages">
            <input type="number" min="1" className={inputCls} value={form.pages} onChange={(e) => update("pages", e.target.value)} />
          </Field>
          <Field label="Delivery (days)">
            <input type="number" min="0" className={inputCls} value={form.deliveryDays} onChange={(e) => update("deliveryDays", e.target.value)} />
          </Field>
          <Field label="Description" full>
            <textarea rows={3} className={inputCls} value={form.description} onChange={(e) => update("description", e.target.value)} />
          </Field>
          <Field label="Features (one per line)" full>
            <textarea rows={4} className={inputCls} value={form.features} onChange={(e) => update("features", e.target.value)} />
          </Field>
        </div>

        <div className="flex justify-end gap-2 p-5 border-t bg-gray-50 rounded-b-2xl">
          <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 font-semibold hover:bg-gray-300">
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!form.title || !form.img}
            className="px-5 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 disabled:opacity-50"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-sm";

function Field({ label, children, full }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="block text-xs font-semibold text-gray-600 mb-1">{label}</span>
      {children}
    </label>
  );
}

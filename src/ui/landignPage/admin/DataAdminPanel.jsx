import React, { useState } from "react";
import { useData } from "../../../context/DataContext";

/**
 * DataAdminPanel
 * --------------
 * Admin surface to control the localStorage-backed "DB".
 *
 * Actions per dataset:
 *   - Seed:  copy the mock JSON into localStorage (overwrite).
 *   - Reset: remove the localStorage entry and rehydrate from mock.
 *   - View:  peek the current stored JSON.
 *
 * Also supports Seed All / Reset All.
 */
export default function DataAdminPanel() {
  const { datasets, data, seedFromMock, reset } = useData();
  const [openKey, setOpenKey] = useState(null);
  const [toast, setToast] = useState("");

  const flash = (msg) => {
    setToast(msg);
    window.clearTimeout(flash._t);
    flash._t = window.setTimeout(() => setToast(""), 1800);
  };

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900">Data Admin</h2>
          <p className="text-gray-600 text-sm mt-1">
            No database. Data lives in <code>localStorage</code> and is seeded
            from mock JSON files in <code>src/db/data/</code>.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              seedFromMock();
              flash("All datasets seeded from mock");
            }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            Seed All
          </button>
          <button
            onClick={() => {
              reset();
              flash("All datasets reset");
            }}
            className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700"
          >
            Reset All
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {datasets.map((name) => {
          const current = data[name];
          const size = current ? JSON.stringify(current).length : 0;
          return (
            <div
              key={name}
              className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold capitalize text-gray-900">
                  {name}
                </h3>
                <span className="text-xs text-gray-500">
                  {(size / 1024).toFixed(1)} KB
                </span>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                key: <code>wgen:{name}</code>
              </p>

              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => {
                    seedFromMock(name);
                    flash(`${name}: seeded from mock`);
                  }}
                  className="px-3 py-1.5 rounded-md bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                >
                  Seed
                </button>
                <button
                  onClick={() => {
                    reset(name);
                    flash(`${name}: reset`);
                  }}
                  className="px-3 py-1.5 rounded-md bg-red-600 text-white text-sm font-semibold hover:bg-red-700"
                >
                  Reset
                </button>
                <button
                  onClick={() =>
                    setOpenKey((k) => (k === name ? null : name))
                  }
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

      {toast && (
        <div className="fixed bottom-6 right-6 bg-gray-900 text-white text-sm px-4 py-2 rounded-lg shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

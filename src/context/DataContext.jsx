import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { DATASETS, MOCK_DATA, storageKey } from "./mockData";

/**
 * DataContext
 * -----------
 * A DB-free data layer.
 *
 *  - Source of truth on disk:  src/db/data/*.json  (imported via mockData.js)
 *  - Runtime "DB":             window.localStorage
 *
 * Flow:
 *   1. On first load, if localStorage is empty for a dataset, we lazily
 *      hydrate it from the mock JSON.
 *   2. Components read/write via useData() -> get(name) / set(name, value).
 *   3. The admin panel can seed (mock -> localStorage) or reset (clear
 *      localStorage and rehydrate from mock) any dataset at will.
 */

const DataContext = createContext(null);

const readFromStorage = (name) => {
  try {
    const raw = localStorage.getItem(storageKey(name));
    if (raw == null) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const writeToStorage = (name, value) => {
  try {
    localStorage.setItem(storageKey(name), JSON.stringify(value));
    return true;
  } catch (err) {
    console.error("localStorage write failed for", name, err);
    return false;
  }
};

const hydrateInitial = () => {
  const snapshot = {};
  for (const name of DATASETS) {
    const existing = readFromStorage(name);
    if (existing != null) {
      snapshot[name] = existing;
    } else {
      // Seed on first ever visit so the app is interactive immediately.
      writeToStorage(name, MOCK_DATA[name]);
      snapshot[name] = MOCK_DATA[name];
    }
  }
  return snapshot;
};

export function DataProvider({ children }) {
  const [store, setStore] = useState(() => hydrateInitial());

  // Keep tabs in sync if the admin panel edits data in another tab.
  useEffect(() => {
    const onStorage = (e) => {
      if (!e.key || !e.key.startsWith("wgen:")) return;
      const name = e.key.slice("wgen:".length);
      if (!DATASETS.includes(name)) return;
      setStore((prev) => ({ ...prev, [name]: readFromStorage(name) }));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const get = useCallback((name) => store[name] ?? null, [store]);

  const set = useCallback((name, value) => {
    if (!DATASETS.includes(name)) {
      console.warn("Unknown dataset:", name);
      return;
    }
    writeToStorage(name, value);
    setStore((prev) => ({ ...prev, [name]: value }));
  }, []);

  const seedFromMock = useCallback((name) => {
    const targets = name ? [name] : DATASETS;
    setStore((prev) => {
      const next = { ...prev };
      for (const key of targets) {
        writeToStorage(key, MOCK_DATA[key]);
        next[key] = MOCK_DATA[key];
      }
      return next;
    });
  }, []);

  const reset = useCallback((name) => {
    const targets = name ? [name] : DATASETS;
    setStore((prev) => {
      const next = { ...prev };
      for (const key of targets) {
        try {
          localStorage.removeItem(storageKey(key));
        } catch {
          /* ignore */
        }
        // Rehydrate from mock so the app never renders "empty".
        writeToStorage(key, MOCK_DATA[key]);
        next[key] = MOCK_DATA[key];
      }
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({
      data: store,
      datasets: DATASETS,
      mock: MOCK_DATA,
      get,
      set,
      seedFromMock,
      reset,
    }),
    [store, get, set, seedFromMock, reset]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData() must be used inside <DataProvider>");
  }
  return ctx;
}

// Convenience selectors for the three known datasets.
export const useWedding = () => useData().get("wedding");
export const useEngagement = () => useData().get("engagement");
export const useBiodata = () => useData().get("biodata");

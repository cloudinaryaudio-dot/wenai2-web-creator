/**
 * AdminService
 * ------------
 * Data maintenance workflows over the EXISTING storage infrastructure
 * (mock seed + localStorage adapter). Adds no new persistence.
 */
import { MOCK_DATA, DATASETS, storageKey } from "../../context/mockData";
import { loadEvents } from "../../domain/event";
import { ok, fail } from "../result";

function readDataset(name) {
  try {
    const raw = localStorage.getItem(storageKey(name));
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeDataset(name, value) {
  try {
    localStorage.setItem(storageKey(name), JSON.stringify(value));
    return true;
  } catch (err) {
    console.error("[AdminService] write failed", err);
    return false;
  }
}

export function listDatasets() {
  return ok(DATASETS);
}

/** Re-seed one dataset (or all) from the mock source. */
export function resetStorage(dataset) {
  const names = dataset ? [dataset] : DATASETS;
  const failed = names.filter((name) => !writeDataset(name, MOCK_DATA[name] ?? null));
  if (failed.length) return fail(`Could not reset: ${failed.join(", ")}`);
  loadEvents();
  return ok({ reset: names });
}

/** Remove datasets from storage without re-seeding. */
export function clearStorage(dataset) {
  const names = dataset ? [dataset] : [...DATASETS, "events"];
  try {
    names.forEach((name) => localStorage.removeItem(storageKey(name)));
  } catch (err) {
    return fail(err?.message || "Could not clear storage");
  }
  return ok({ cleared: names });
}

export function exportData(dataset) {
  const names = dataset ? [dataset] : [...DATASETS, "events"];
  const payload = names.reduce((acc, name) => {
    const value = readDataset(name);
    if (value != null) acc[name] = value;
    return acc;
  }, {});
  return ok({ version: 1, exportedAt: new Date().toISOString(), data: payload });
}

export function importData(payload, { merge = false } = {}) {
  const data = payload?.data || payload;
  if (!data || typeof data !== "object") return fail("Invalid import payload");
  const written = [];
  for (const [name, value] of Object.entries(data)) {
    const next = merge ? { ...(readDataset(name) || {}), ...value } : value;
    if (writeDataset(name, next)) written.push(name);
  }
  loadEvents();
  return written.length ? ok({ imported: written }) : fail("Nothing imported");
}

export default { listDatasets, resetStorage, clearStorage, exportData, importData };

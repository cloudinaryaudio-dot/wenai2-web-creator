/**
 * Ordering utility shared by the manager and the serializer (DRY, no cycles).
 */
export function sortSections(sections = []) {
  return [...sections]
    .map((s, i) => ({ s, i }))
    .sort((a, b) => (a.s.order ?? a.i) - (b.s.order ?? b.i) || a.i - b.i)
    .map(({ s }) => s);
}

/**
 * Localization
 * ------------
 * Extension point only. Resolves the locale-specific value of a block/section
 * without any UI or storage knowledge. Translation catalogues are NOT
 * implemented — the resolver falls back to the authored value.
 */

/**
 * Blocks may carry `metadata.translations = { [locale]: value }`.
 * @returns the value for `locale`, falling back to `defaultLocale`, then value.
 */
export function resolveLocalizedValue(node, locale, defaultLocale = "en") {
  const translations = node?.metadata?.translations;
  if (!translations || typeof translations !== "object") return node?.value;
  if (locale && locale in translations) return translations[locale];
  if (defaultLocale && defaultLocale in translations) return translations[defaultLocale];
  return node?.value;
}

/** Applies locale resolution across a document, non-mutating. */
export function localizeContent(document, locale) {
  if (!document) return document;
  const target = locale || document.locale;
  if (!target) return document;
  return {
    ...document,
    locale: target,
    sections: document.sections.map((section) => ({
      ...section,
      blocks: section.blocks.map((block) => ({
        ...block,
        value: resolveLocalizedValue(block, target, document.defaultLocale),
      })),
    })),
  };
}

/** Reserved: locale catalogue registration for a future translation module. */
export function listAvailableLocales(document) {
  const set = new Set([document?.defaultLocale || "en"]);
  document?.sections?.forEach((s) =>
    s.blocks?.forEach((b) => Object.keys(b?.metadata?.translations || {}).forEach((l) => set.add(l)))
  );
  return Array.from(set);
}

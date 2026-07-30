/**
 * Share Configuration
 * -------------------
 * Single source of truth for URLs, routes and message templates.
 * No hardcoded values anywhere else in the capability.
 */
export const SHARE_CONFIG = {
  /** Resolved at runtime; `null` -> window.location.origin. */
  baseUrl: null,
  /** Future white-label / custom domain support. */
  customDomain: null,
  routes: {
    public: "/invitation/:slug",
    preview: "/preview/:slug",
    canonical: "/invitation/:slug",
    qr: "/qr/:slug",
  },
  defaults: {
    locale: "en",
    utm: null, // { source, medium, campaign }
  },
  shortener: {
    provider: null,
    implemented: false,
  },
};

/** Message templates — configuration driven, per event type and locale. */
export const MESSAGE_TEMPLATES = {
  en: {
    default: "You're invited! {title}\n{date}{venue}\nView the invitation: {url}",
    wedding: "💍 {title}\nWe joyfully invite you to our wedding{date}{venue}.\nView the invitation: {url}",
    engagement: "💐 {title}\nJoin us for our engagement{date}{venue}.\nView the invitation: {url}",
    birthday: "🎉 {title}\nCome celebrate with us{date}{venue}.\nView the invitation: {url}",
  },
  hi: {
    default: "आपको सादर आमंत्रित किया जाता है! {title}\n{date}{venue}\nनिमंत्रण देखें: {url}",
  },
};

export const SUBJECT_TEMPLATES = {
  en: { default: "Invitation — {title}" },
  hi: { default: "निमंत्रण — {title}" },
};

let config = { ...SHARE_CONFIG };

export function getShareConfig() {
  return config;
}

/** Runtime override (tenant / white-label / tests). */
export function configureShare(partial = {}) {
  config = {
    ...config,
    ...partial,
    routes: { ...config.routes, ...(partial.routes || {}) },
    defaults: { ...config.defaults, ...(partial.defaults || {}) },
    shortener: { ...config.shortener, ...(partial.shortener || {}) },
  };
  return config;
}

export default { getShareConfig, configureShare, MESSAGE_TEMPLATES, SUBJECT_TEMPLATES };

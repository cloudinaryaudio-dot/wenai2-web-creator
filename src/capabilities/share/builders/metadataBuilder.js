/**
 * Social Metadata Builder
 * -----------------------
 * Produces OpenGraph / Twitter / WhatsApp / Telegram metadata contracts.
 * Server-side rendering of these tags is an extension point, not implemented.
 */
import { createSocialMetadata } from "../contracts/shareContract";

export function buildSocialMetadata({ title, description, image, url, locale = "en" } = {}) {
  return createSocialMetadata({
    openGraph: {
      "og:type": "website",
      "og:title": title || "",
      "og:description": description || "",
      "og:image": image || "",
      "og:url": url || "",
      "og:locale": locale,
    },
    twitter: {
      "twitter:card": image ? "summary_large_image" : "summary",
      "twitter:title": title || "",
      "twitter:description": description || "",
      "twitter:image": image || "",
    },
  });
}

/** Flatten to a tag list an SSR/head adapter can consume later. */
export function toMetaTags(socialMetadata) {
  const tags = [];
  Object.entries(socialMetadata?.openGraph || {}).forEach(([property, content]) =>
    tags.push({ property, content })
  );
  Object.entries(socialMetadata?.twitter || {}).forEach(([name, content]) =>
    tags.push({ name, content })
  );
  return tags.filter((t) => t.content);
}

export default { buildSocialMetadata, toMetaTags };

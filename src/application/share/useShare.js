/**
 * React binding for the Share capability.
 * Components consume sharing through this hook — never through builders.
 */
import { useCallback, useMemo } from "react";
import ShareService from "./ShareService";
import { SHARE_ACTION_KINDS } from "../../capabilities/share";

export function useShare(idOrSlug, options = {}) {
  const { locale, baseUrl } = options;

  const model = useMemo(() => {
    const result = ShareService.getShareModelFor(idOrSlug, { locale, baseUrl });
    return result.ok ? result.data : null;
  }, [idOrSlug, locale, baseUrl]);

  const providers = useMemo(() => ShareService.listProviders().data || [], []);

  /** Executes an action produced by the application layer. */
  const share = useCallback(
    async (providerId) => {
      const result = ShareService.getProviderAction(idOrSlug, providerId, { locale, baseUrl });
      if (!result.ok) return result;
      const action = result.data;
      if (typeof window === "undefined") return result;

      try {
        if (action.kind === SHARE_ACTION_KINDS.URL && action.url) {
          window.open(action.url, action.target || "_blank", "noopener,noreferrer");
        } else if (action.kind === SHARE_ACTION_KINDS.CLIPBOARD && action.payload) {
          await navigator.clipboard?.writeText(String(action.payload));
        } else if (action.kind === SHARE_ACTION_KINDS.NATIVE && navigator.share) {
          await navigator.share(action.payload);
        }
      } catch {
        /* user cancelled or unsupported — non fatal */
      }
      return result;
    },
    [idOrSlug, locale, baseUrl]
  );

  return { model, providers, share };
}

export default useShare;

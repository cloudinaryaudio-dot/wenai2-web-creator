/**
 * Thin React binding over InvitationService.
 * The only React-aware file in the application layer; services stay pure.
 */
import { useEffect, useState } from "react";
import { prepareRendererInput } from "./InvitationService";

export function useInvitationViewModel(idOrSlug = "default", options = {}) {
  const mode = options.mode || "published";
  const themeId = options.themeId;
  const [state, setState] = useState({ viewModel: null, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    const result = prepareRendererInput(idOrSlug, { mode, themeId });
    if (!alive) return () => {};
    setState({
      viewModel: result.ok ? result.data : null,
      loading: false,
      error: result.ok ? null : result.error,
    });
    return () => {
      alive = false;
    };
  }, [idOrSlug, mode, themeId]);

  return state;
}

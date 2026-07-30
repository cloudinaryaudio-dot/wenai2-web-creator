/**
 * React binding for the Event domain.
 * Components consume events through this hook — never through storage.
 */
import { useEffect, useState } from "react";
import { loadEvent, loadEvents } from "./eventLoader";

export function useEvent(idOrSlug = "default") {
  const [state, setState] = useState({ event: undefined, loading: true, error: null });

  useEffect(() => {
    let alive = true;
    try {
      const event = loadEvent(idOrSlug);
      if (alive) setState({ event: event || null, loading: false, error: null });
    } catch (err) {
      if (alive) setState({ event: null, loading: false, error: err?.message || "Load failed" });
    }
    return () => {
      alive = false;
    };
  }, [idOrSlug]);

  return state;
}

export function useEvents() {
  const [state, setState] = useState({ events: [], loading: true, error: null });

  useEffect(() => {
    try {
      setState({ events: loadEvents(), loading: false, error: null });
    } catch (err) {
      setState({ events: [], loading: false, error: err?.message || "Load failed" });
    }
  }, []);

  return state;
}

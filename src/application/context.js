/**
 * Application Context (Composition Root)
 * --------------------------------------
 * Application services are framework independent. Everything they depend on
 * (storage, clock, identity, notifications, …) is injected through this
 * context so future backends / auth / tenants require no service rewrites.
 */
import * as eventLoader from "../domain/event/eventLoader";

/** Extension points — declared, intentionally not implemented. */
const NOOP_EXTENSIONS = {
  /** Authentication + multi-user ownership */
  auth: {
    getCurrentUser: () => null,
    can: () => true,
  },
  /** SaaS tenant scoping */
  tenant: {
    getCurrentTenant: () => null,
  },
  /** Payments / entitlements */
  billing: {
    isEntitled: () => true,
  },
  /** AI generation */
  ai: {
    generate: async () => {
      throw new Error("AI generation not implemented");
    },
  },
  /** Notification engine */
  notifications: {
    emit: () => {},
  },
  /** Scheduling (publish scheduling extension point) */
  scheduler: {
    schedule: () => {
      throw new Error("Scheduling not implemented");
    },
  },
};

let context = {
  storage: eventLoader,
  now: () => Date.now(),
  ...NOOP_EXTENSIONS,
};

export function getAppContext() {
  return context;
}

/** Replace/extend infrastructure (e.g. a Supabase-backed storage adapter). */
export function configureApplication(partial = {}) {
  context = { ...context, ...partial };
  return context;
}

export { NOOP_EXTENSIONS };

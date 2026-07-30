/**
 * Share Engine
 * ------------
 * Capability entry point: model + providers + actions.
 * Framework independent; the Application layer is its only consumer.
 */
import { buildShareModel } from "./shareModelService";
import {
  listShareProviders,
  getShareProvider,
  registerShareProvider,
  registerShareProviders,
} from "../registry/providerRegistry";
import { BUILT_IN_SHARE_PROVIDERS } from "../providers/builtInProviders";
import { validateShareModel, validateShareability } from "../validators/shareValidator";

/** Idempotent bootstrap of the built-in strategies. */
registerShareProviders(BUILT_IN_SHARE_PROVIDERS);

export function getShareModel(event, options = {}) {
  return buildShareModel(event, options);
}

/** Provider descriptors for UI (no build functions leaked into components). */
export function getProviders(options = {}) {
  return listShareProviders(options).map(({ build, ...descriptor }) => descriptor);
}

/** Build one executable action. Returns null for unknown providers. */
export function getShareAction(event, providerId, options = {}) {
  const provider = getShareProvider(providerId);
  if (!provider) return null;
  const model = options.model || buildShareModel(event, options);
  return provider.build(model, options);
}

/** Build every action at once (menus, sheets). */
export function getShareActions(event, options = {}) {
  const model = options.model || buildShareModel(event, options);
  return listShareProviders(options).map((provider) => ({
    provider: { ...provider, build: undefined },
    action: provider.build(model, options),
  }));
}

export { registerShareProvider, registerShareProviders, validateShareModel, validateShareability };
export default { getShareModel, getProviders, getShareAction, getShareActions };

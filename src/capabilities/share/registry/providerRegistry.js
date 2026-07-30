/**
 * Share Provider Registry
 * -----------------------
 * Open/Closed: adding a channel = registering a provider. Core never changes.
 */
const registry = new Map();

export function registerShareProvider(provider) {
  if (!provider?.id) return null;
  registry.set(provider.id, provider);
  return provider;
}

export function registerShareProviders(list = []) {
  list.forEach(registerShareProvider);
  return listShareProviders();
}

export function getShareProvider(id) {
  return registry.get(id) || null;
}

export function hasShareProvider(id) {
  return registry.has(id);
}

export function listShareProviders({ channel, includeUnimplemented = true } = {}) {
  return Array.from(registry.values())
    .filter((p) => (channel ? p.channel === channel : true))
    .filter((p) => (includeUnimplemented ? true : p.implemented))
    .sort((a, b) => a.order - b.order || a.label.localeCompare(b.label));
}

export function listShareProviderIds(options) {
  return listShareProviders(options).map((p) => p.id);
}

export default { registerShareProvider, getShareProvider, listShareProviders };

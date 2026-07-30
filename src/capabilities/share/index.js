/**
 * Share Capability — public surface.
 * Only the Application layer imports from here.
 */
export {
  createShareModel,
  createSocialMetadata,
  createQrDescriptor,
  isShareModel,
  SHARE_MODEL_VERSION,
  SHARE_CHANNELS,
  QR_SCOPES,
} from "./contracts/shareContract";

export {
  defineShareProvider,
  createShareAction,
  SHARE_ACTION_KINDS,
} from "./contracts/providerContract";

export {
  registerShareProvider,
  registerShareProviders,
  getShareProvider,
  hasShareProvider,
  listShareProviders,
  listShareProviderIds,
} from "./registry/providerRegistry";

export { getShareConfig, configureShare } from "./registry/shareConfig";

export {
  buildUrl,
  buildPublicUrl,
  buildCanonicalUrl,
  buildPreviewUrl,
  buildQrTargetUrl,
  resolveBaseUrl,
} from "./builders/urlBuilder";

export {
  buildShareMessage,
  buildShareSubject,
  applyPlaceholders,
  buildMessageTokens,
} from "./builders/messageBuilder";

export { buildSocialMetadata, toMetaTags } from "./builders/metadataBuilder";
export { buildEventQr, buildGuestQr, buildTableQr, renderQr, setQrRenderer } from "./builders/qrBuilder";
export { validateShareModel, validateShareability } from "./validators/shareValidator";

export {
  getShareModel,
  getProviders,
  getShareAction,
  getShareActions,
} from "./services/shareEngine";

export { BUILT_IN_SHARE_PROVIDERS } from "./providers/builtInProviders";

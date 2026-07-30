/**
 * Built-in Share Providers
 * ------------------------
 * Pure strategies over web intents / deep links. No SDKs, no external APIs.
 * Adding a channel = adding a definition here (or registering from outside).
 */
import {
  defineShareProvider,
  createShareAction,
  SHARE_ACTION_KINDS,
  SHARE_CHANNELS,
} from "../contracts/providerContract";

const enc = encodeURIComponent;
const text = (m) => `${m.shareMessage || m.shareTitle || ""}`.trim();
const textWithUrl = (m) => [text(m), m.shortUrl || m.publicUrl].filter(Boolean).join("\n");

export const whatsappProvider = defineShareProvider({
  id: "whatsapp",
  label: "WhatsApp",
  channel: SHARE_CHANNELS.MESSAGING,
  order: 10,
  build: (model) =>
    createShareAction({
      providerId: "whatsapp",
      kind: SHARE_ACTION_KINDS.URL,
      url: `https://wa.me/?text=${enc(textWithUrl(model))}`,
    }),
});

export const facebookProvider = defineShareProvider({
  id: "facebook",
  label: "Facebook",
  channel: SHARE_CHANNELS.SOCIAL,
  supportsImage: true,
  order: 20,
  build: (model) =>
    createShareAction({
      providerId: "facebook",
      url: `https://www.facebook.com/sharer/sharer.php?u=${enc(model.shortUrl || model.publicUrl)}`,
    }),
});

export const xProvider = defineShareProvider({
  id: "x",
  label: "X",
  channel: SHARE_CHANNELS.SOCIAL,
  order: 30,
  build: (model) =>
    createShareAction({
      providerId: "x",
      url: `https://twitter.com/intent/tweet?text=${enc(text(model))}&url=${enc(
        model.shortUrl || model.publicUrl
      )}`,
    }),
});

export const telegramProvider = defineShareProvider({
  id: "telegram",
  label: "Telegram",
  channel: SHARE_CHANNELS.MESSAGING,
  order: 40,
  build: (model) =>
    createShareAction({
      providerId: "telegram",
      url: `https://t.me/share/url?url=${enc(model.shortUrl || model.publicUrl)}&text=${enc(text(model))}`,
    }),
});

export const emailProvider = defineShareProvider({
  id: "email",
  label: "Email",
  channel: SHARE_CHANNELS.DIRECT,
  order: 50,
  build: (model, options = {}) =>
    createShareAction({
      providerId: "email",
      url: `mailto:${options.to || ""}?subject=${enc(options.subject || model.shareTitle)}&body=${enc(
        textWithUrl(model)
      )}`,
      target: "_self",
    }),
});

export const smsProvider = defineShareProvider({
  id: "sms",
  label: "SMS",
  channel: SHARE_CHANNELS.DIRECT,
  order: 60,
  build: (model, options = {}) =>
    createShareAction({
      providerId: "sms",
      url: `sms:${options.to || ""}?&body=${enc(textWithUrl(model))}`,
      target: "_self",
    }),
});

export const copyLinkProvider = defineShareProvider({
  id: "copy-link",
  label: "Copy link",
  channel: SHARE_CHANNELS.DIRECT,
  supportsMessage: false,
  order: 5,
  build: (model) =>
    createShareAction({
      providerId: "copy-link",
      kind: SHARE_ACTION_KINDS.CLIPBOARD,
      payload: model.shortUrl || model.publicUrl,
    }),
});

export const qrProvider = defineShareProvider({
  id: "qr",
  label: "QR code",
  channel: SHARE_CHANNELS.OFFLINE,
  supportsMessage: false,
  implemented: false,
  order: 70,
  build: (model) =>
    createShareAction({
      providerId: "qr",
      kind: SHARE_ACTION_KINDS.RENDER,
      payload: model.qrCode,
      implemented: false,
    }),
});

/** Instagram has no public web share intent — declared, not implemented. */
export const instagramProvider = defineShareProvider({
  id: "instagram",
  label: "Instagram",
  channel: SHARE_CHANNELS.SOCIAL,
  supportsImage: true,
  implemented: false,
  order: 35,
  build: (model) =>
    createShareAction({
      providerId: "instagram",
      kind: SHARE_ACTION_KINDS.CLIPBOARD,
      payload: textWithUrl(model),
      implemented: false,
      meta: { reason: "No public web share intent; requires native app integration" },
    }),
});

export const nativeProvider = defineShareProvider({
  id: "native",
  label: "Share…",
  channel: SHARE_CHANNELS.DIRECT,
  order: 1,
  build: (model) =>
    createShareAction({
      providerId: "native",
      kind: SHARE_ACTION_KINDS.NATIVE,
      payload: {
        title: model.shareTitle,
        text: model.shareMessage,
        url: model.shortUrl || model.publicUrl,
      },
    }),
});

export const BUILT_IN_SHARE_PROVIDERS = [
  nativeProvider,
  copyLinkProvider,
  whatsappProvider,
  facebookProvider,
  xProvider,
  instagramProvider,
  telegramProvider,
  emailProvider,
  smsProvider,
  qrProvider,
];

export default BUILT_IN_SHARE_PROVIDERS;

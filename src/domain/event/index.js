/**
 * Event Domain — public surface.
 * Higher layers import from here only.
 */
export * from "./eventContract";
export * from "./eventTypeRegistry";
export * from "./eventLifecycle";
export * from "./eventSettings";
export * from "./eventNormalizer";
export * from "./eventValidator";
export * from "./eventFactory";
export * from "./eventRegistry";
export * from "./eventLoader";
export { toInvitationView } from "./adapters/invitationView";
export { useEvent, useEvents } from "./useEvent";

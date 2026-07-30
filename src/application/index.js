/**
 * Application Layer — public surface.
 * UI imports services from here only. Services orchestrate; they never render.
 */
export { getAppContext, configureApplication } from "./context";
export { ok, fail } from "./result";

export { default as EventService } from "./event/EventService";
export { default as InvitationService } from "./invitation/InvitationService";
export { default as ThemeService } from "./theme/ThemeService";
export { default as PublishService } from "./publish/PublishService";
export { default as PreviewService } from "./preview/PreviewService";
export { default as ShareService } from "./share/ShareService";
export { default as AdminService } from "./admin/AdminService";

export { buildInvitationViewModel } from "./invitation/viewModel";
export { useInvitationViewModel } from "./invitation/useInvitationViewModel";
export { useShare } from "./share/useShare";


/**
 * Share Validators
 * ----------------
 * Pure validation. Never throws; returns { valid, errors, warnings }.
 */
import { isShareModel } from "../contracts/shareContract";

export function validateShareModel(model) {
  const errors = [];
  const warnings = [];

  if (!isShareModel(model)) {
    return { valid: false, errors: ["Not a share model"], warnings };
  }
  if (!model.eventId) errors.push("eventId is required");
  if (!model.publicUrl) errors.push("publicUrl is required");
  if (!model.shareTitle) warnings.push("shareTitle is empty — previews will look bare");
  if (!model.previewImage) warnings.push("previewImage is empty — social previews will have no image");
  if (!model.shareMessage) warnings.push("shareMessage is empty");

  return { valid: errors.length === 0, errors, warnings };
}

export function validateShareability(event) {
  const errors = [];
  const warnings = [];
  if (!event) return { valid: false, errors: ["Event not found"], warnings };
  if (!event.slug && !event.id) errors.push("Event needs a slug or id to be shareable");
  if (event.visibility === "private") errors.push("Private events cannot be shared");
  if (event.status !== "published") warnings.push("Event is not published — recipients may see nothing");
  return { valid: errors.length === 0, errors, warnings };
}

export default { validateShareModel, validateShareability };

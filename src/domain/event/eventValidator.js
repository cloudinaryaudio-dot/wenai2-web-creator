/**
 * Event Validator
 * ---------------
 * Non-fatal validation. Returns findings; never throws, never mutates.
 */
import { EVENT_CORE_KEYS } from "./eventContract";
import { isValidStatus } from "./eventLifecycle";
import { hasEventType, supportsModule } from "./eventTypeRegistry";
import { SETTING_KEYS } from "./eventSettings";

const REQUIRED = ["id", "slug", "type", "title", "status"];

export function validateEvent(event) {
  const errors = [];
  const warnings = [];

  if (!event || typeof event !== "object") {
    return { valid: false, errors: ["Event is not an object"], warnings };
  }

  REQUIRED.forEach((key) => {
    if (!event[key]) errors.push(`Missing required field: ${key}`);
  });

  if (event.type && !hasEventType(event.type)) {
    warnings.push(`Unregistered event type "${event.type}" — falling back to default`);
  }
  if (event.status && !isValidStatus(event.status)) {
    errors.push(`Invalid lifecycle status: ${event.status}`);
  }

  ["schedule", "gallery", "family", "contacts"].forEach((key) => {
    if (event[key] != null && !Array.isArray(event[key])) {
      errors.push(`Module "${key}" must be an array`);
    }
    if (Array.isArray(event[key]) && event[key].length && !supportsModule(event.type, key)) {
      warnings.push(`Module "${key}" is not supported by event type "${event.type}"`);
    }
  });

  Object.keys(event.settings || {}).forEach((key) => {
    if (!SETTING_KEYS.includes(key)) warnings.push(`Unknown setting "${key}"`);
  });

  EVENT_CORE_KEYS.forEach((key) => {
    if (!(key in event)) warnings.push(`Core field "${key}" absent from event object`);
  });

  return { valid: errors.length === 0, errors, warnings };
}

export function assertValidEvent(event) {
  const result = validateEvent(event);
  if (!result.valid) console.warn("[eventValidator]", result.errors);
  return result.valid;
}

/**
 * Uniform application result envelope.
 * Application services never throw for expected failures.
 */
export function ok(data = null, meta = {}) {
  return { ok: true, data, error: null, ...meta };
}

export function fail(error, meta = {}) {
  return { ok: false, data: null, error: String(error || "Unknown error"), ...meta };
}

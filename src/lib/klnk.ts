/**
 * A KLNK address is usable only when it is an absolute http(s) URL.
 * The directory never invents one. Empty, relative, and non-http values
 * hide the booking control.
 */
export function bookingLink(url: string | null | undefined): string | null {
  if (typeof url !== "string") return null;
  const trimmed = url.trim();
  if (!trimmed) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
  if (!parsed.hostname || !parsed.hostname.includes(".")) return null;

  return parsed.toString();
}

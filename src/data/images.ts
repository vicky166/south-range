import type { Photo } from "./types";

/**
 * Editorial photography from Unsplash (`photo-…` ids) or Pexels (`pexels-…` ids),
 * both free to use without attribution. Alt text describes the picture as it
 * appears, not a booking claim.
 */
export function photo(id: string, alt: string): Photo {
  if (id.startsWith("pexels-")) {
    const number = id.slice("pexels-".length);
    return {
      src: `https://images.pexels.com/photos/${number}/pexels-photo-${number}.jpeg?auto=compress&cs=tinysrgb&w=1800`,
      alt,
    };
  }
  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1800&q=75`,
    alt,
  };
}

import type { Coordinates } from "@/data/types";

export function formatCoordinates({ lat, lng }: Coordinates): string {
  const ns = `${Math.abs(lat).toFixed(2)}°${lat >= 0 ? "N" : "S"}`;
  const ew = `${Math.abs(lng).toFixed(2)}°${lng >= 0 ? "E" : "W"}`;
  return `${ns} ${ew}`;
}

/** The index mark used across the site: N° 01, N° 02 … */
export function fieldNumber(position: number): string {
  return `N° ${String(position).padStart(2, "0")}`;
}

/** Bounding box for the atlas grid, in degrees. Covers the six launch countries. */
export const atlasBounds = { minLat: 4, maxLat: 38, minLng: 66, maxLng: 94 } as const;

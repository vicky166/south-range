import type { TourQuery, TourRecord } from "@/data/types";

export const durationOptions = [
  { value: "1-3", label: "1–3 days" },
  { value: "4-7", label: "4–7 days" },
  { value: "8-14", label: "8–14 days" },
  { value: "15+", label: "15 days or more" },
] as const;

export const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "title", label: "Name (A–Z)" },
  { value: "duration-asc", label: "Duration, shorter first" },
  { value: "duration-desc", label: "Duration, longer first" },
  { value: "newest", label: "Recently added" },
] as const;

export function oneParam(value: string | string[] | undefined): string | undefined {
  const raw = Array.isArray(value) ? value[0] : value;
  const trimmed = raw?.trim();
  return trimmed ? trimmed : undefined;
}

export function parseTourQuery(
  searchParams: Record<string, string | string[] | undefined>,
): TourQuery {
  const where = oneParam(searchParams.where);
  let country = oneParam(searchParams.country);
  let destination = oneParam(searchParams.destination);

  if (where?.startsWith("country:") && !country) {
    country = where.slice("country:".length);
  }
  if (where?.startsWith("destination:") && !destination) {
    destination = where.slice("destination:".length);
  }

  return {
    q: oneParam(searchParams.q),
    country,
    destination,
    category: oneParam(searchParams.category),
    activity: oneParam(searchParams.activity),
    duration: oneParam(searchParams.duration),
    operator: oneParam(searchParams.operator),
    price: oneParam(searchParams.price),
    sort: oneParam(searchParams.sort) ?? "featured",
  };
}

export function matchesDuration(days: number, bucket: string | undefined): boolean {
  if (!bucket) return true;
  switch (bucket) {
    case "1-3":
      return days >= 1 && days <= 3;
    case "4-7":
      return days >= 4 && days <= 7;
    case "8-14":
      return days >= 8 && days <= 14;
    case "15+":
      return days >= 15;
    default:
      return true;
  }
}

function haystack(tour: TourRecord): string {
  return [
    tour.title,
    tour.shortDescription,
    tour.description,
    tour.countryName,
    tour.destinationName,
    tour.categoryName,
    tour.operatorName,
    ...tour.highlights,
  ]
    .join(" ")
    .toLowerCase();
}

export function filterAndSortTours(tours: TourRecord[], query: TourQuery): TourRecord[] {
  const q = query.q?.toLowerCase();

  const filtered = tours.filter((tour) => {
    if (query.country && tour.country !== query.country) return false;
    if (query.destination && tour.destinationSlug !== query.destination) return false;
    if (query.category && tour.categorySlug !== query.category) return false;
    if (query.activity && !tour.activitySlugs.includes(query.activity)) return false;
    if (query.operator && tour.operatorId !== query.operator) return false;
    if (!matchesDuration(tour.durationDays, query.duration)) return false;
    if (query.price === "verified" && !(tour.priceVerified && tour.price != null)) {
      return false;
    }
    if (q && !haystack(tour).includes(q)) return false;
    return true;
  });

  const sort = query.sort ?? "featured";
  const copy = [...filtered];

  copy.sort((a, b) => {
    switch (sort) {
      case "title":
        return a.title.localeCompare(b.title);
      case "duration-asc":
        return a.durationDays - b.durationDays || a.title.localeCompare(b.title);
      case "duration-desc":
        return b.durationDays - a.durationDays || a.title.localeCompare(b.title);
      case "newest":
        return b.createdAt.localeCompare(a.createdAt) || a.title.localeCompare(b.title);
      case "featured":
      default:
        return Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title);
    }
  });

  return copy;
}

/** Directory URL for a saved query, e.g. a collection. */
export function tourQueryHref(query: TourQuery): string {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === "string" && value) params.set(key, value);
  }
  const qs = params.toString();
  return qs ? `/tours?${qs}` : "/tours";
}

export function hasActiveQuery(query: TourQuery): boolean {
  return Boolean(
    query.q ||
      query.country ||
      query.destination ||
      query.category ||
      query.activity ||
      query.duration ||
      query.operator ||
      query.price ||
      (query.sort && query.sort !== "featured"),
  );
}

export function formatDuration(days: number): string {
  return days === 1 ? "1 day" : `${days} days`;
}

export function formatVerifiedPrice(
  price: number | null,
  currency: string | null,
  priceVerified: boolean,
): string | null {
  if (!priceVerified || price == null || !currency) return null;
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(price);
  } catch {
    return null;
  }
}

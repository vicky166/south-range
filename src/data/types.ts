export type Photo = {
  src: string;
  alt: string;
};

export type ItineraryDay = {
  title: string;
  detail: string;
};

export type Country = {
  slug: string;
  name: string;
  summary: string;
};

export type Operator = {
  id: string;
  slug: string;
  name: string;
  description: string;
  sample: boolean;
};

/** Decimal degrees, north and east positive. */
export type Coordinates = {
  lat: number;
  lng: number;
};

export type Destination = {
  slug: string;
  name: string;
  country: string;
  summary: string;
  image: Photo;
  /** Approximate reference point for the region, used by the atlas and index labels. */
  coordinates: Coordinates;
  /** A few words for the window section. */
  tagline?: string;
  /** Commonly cited travel months, as a general guide only. */
  season?: string;
  featured: boolean;
};

/** An editorial grouping of published tours, defined by a directory query. */
export type Collection = {
  slug: string;
  title: string;
  dek: string;
  image: Photo;
  query: TourQuery;
};

export type FieldNoteSection = {
  heading?: string;
  paragraphs: string[];
};

/** Editorial guidance. Not a first-person trip report and not a tour listing. */
export type FieldNote = {
  slug: string;
  title: string;
  kicker: string;
  dek: string;
  image: Photo;
  body: FieldNoteSection[];
  pullQuote?: string;
  relatedQuery?: TourQuery;
  publishedAt: string;
};

export type Category = {
  slug: string;
  name: string;
  summary: string;
  image: Photo;
};

export type Activity = {
  slug: string;
  name: string;
};

/**
 * Stored tour record. Operator name and description live on the operator,
 * then the catalogue joins them so the UI never duplicates that copy.
 * Price stays null unless a verified figure is supplied.
 */
export type Tour = {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  country: string;
  destinationSlug: string;
  categorySlug: string;
  activitySlugs: string[];
  durationDays: number;
  price: number | null;
  currency: string | null;
  priceVerified: boolean;
  images: Photo[];
  highlights: string[];
  itinerary: ItineraryDay[] | null;
  includedServices: string[] | null;
  excludedServices: string[] | null;
  importantInformation: string[];
  operatorId: string;
  klnkUrl: string | null;
  featured: boolean;
  trending: boolean;
  published: boolean;
  sample: boolean;
  createdAt: string;
  updatedAt: string;
};

export type TourRecord = Tour & {
  countryName: string;
  destinationName: string;
  destinationCoordinates: Coordinates;
  categoryName: string;
  operatorName: string;
  operatorDescription: string;
  operatorSample: boolean;
};

export type TourQuery = {
  q?: string;
  country?: string;
  destination?: string;
  category?: string;
  activity?: string;
  duration?: string;
  operator?: string;
  price?: string;
  sort?: string;
};

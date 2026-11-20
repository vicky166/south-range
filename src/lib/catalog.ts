import { activities } from "../data/activities";
import { categories } from "../data/categories";
import { collections } from "../data/collections";
import { countries } from "../data/countries";
import { destinations } from "../data/destinations";
import { fieldNotes } from "../data/field-notes";
import { operators } from "../data/operators";
import { tours } from "../data/tours";
import type {
  Activity,
  Category,
  Collection,
  Country,
  Destination,
  FieldNote,
  Operator,
  Tour,
  TourQuery,
  TourRecord,
} from "../data/types";
import { filterAndSortTours } from "./filters";

function indexBy<T extends { slug: string }>(items: T[]): Map<string, T> {
  return new Map(items.map((item) => [item.slug, item]));
}

function assertCatalogue(records: Tour[]): void {
  const operatorIds = new Set(operators.map((operator) => operator.id));
  const destinationBySlug = indexBy(destinations);
  const categoryIds = new Set(categories.map((category) => category.slug));
  const activityIds = new Set(activities.map((activity) => activity.slug));
  const countryIds = new Set(countries.map((country) => country.slug));
  const ids = new Set<string>();
  const slugs = new Set<string>();

  for (const tour of records) {
    if (ids.has(tour.id)) throw new Error(`Duplicate tour id: ${tour.id}`);
    ids.add(tour.id);
    if (slugs.has(tour.slug)) throw new Error(`Duplicate tour slug: ${tour.slug}`);
    slugs.add(tour.slug);
    if (!operatorIds.has(tour.operatorId)) {
      throw new Error(`Tour ${tour.slug} points at an unknown operator: ${tour.operatorId}`);
    }
    const destination = destinationBySlug.get(tour.destinationSlug);
    if (!destination) {
      throw new Error(`Tour ${tour.slug} points at an unknown destination: ${tour.destinationSlug}`);
    }
    if (!countryIds.has(tour.country)) {
      throw new Error(`Tour ${tour.slug} points at an unknown country: ${tour.country}`);
    }
    if (destination.country !== tour.country) {
      throw new Error(`Tour ${tour.slug} country does not match ${destination.name}`);
    }
    if (!categoryIds.has(tour.categorySlug)) {
      throw new Error(`Tour ${tour.slug} points at an unknown category: ${tour.categorySlug}`);
    }
    for (const activity of tour.activitySlugs) {
      if (!activityIds.has(activity)) {
        throw new Error(`Tour ${tour.slug} points at an unknown activity: ${activity}`);
      }
    }
    if (tour.images.length === 0) {
      throw new Error(`Tour ${tour.slug} needs at least one image`);
    }
    if (tour.durationDays < 1) {
      throw new Error(`Tour ${tour.slug} needs a duration of at least one day`);
    }
  }
}

assertCatalogue(tours);

const countryBySlug = indexBy(countries);
const destinationBySlug = indexBy(destinations);
const categoryBySlug = indexBy(categories);
const operatorById = new Map(operators.map((operator) => [operator.id, operator]));

export function toTourRecord(tour: Tour): TourRecord {
  const country = countryBySlug.get(tour.country);
  const destination = destinationBySlug.get(tour.destinationSlug);
  const category = categoryBySlug.get(tour.categorySlug);
  const operator = operatorById.get(tour.operatorId);
  if (!country || !destination || !category || !operator) {
    throw new Error(`Tour ${tour.slug} is missing a related record`);
  }

  return {
    ...tour,
    countryName: country.name,
    destinationName: destination.name,
    destinationCoordinates: destination.coordinates,
    categoryName: category.name,
    operatorName: operator.name,
    operatorDescription: operator.description,
    operatorSample: operator.sample,
  };
}

export function getPublishedTours(): TourRecord[] {
  return tours.filter((tour) => tour.published).map(toTourRecord);
}

export function getTourBySlug(slug: string): TourRecord | undefined {
  const tour = tours.find((item) => item.slug === slug && item.published);
  return tour ? toTourRecord(tour) : undefined;
}

export function queryTours(query: TourQuery): TourRecord[] {
  return filterAndSortTours(getPublishedTours(), query);
}

export function getFeaturedTours(): TourRecord[] {
  return getPublishedTours().filter((tour) => tour.featured);
}

export function getTrendingTours(): TourRecord[] {
  return getPublishedTours().filter((tour) => tour.trending);
}

export function hasVerifiedPrices(): boolean {
  return getPublishedTours().some((tour) => tour.priceVerified && tour.price != null);
}

export function getRelatedTours(tour: TourRecord, limit = 3): TourRecord[] {
  const published = getPublishedTours().filter((item) => item.id !== tour.id);
  const sameDestination = published.filter((item) => item.destinationSlug === tour.destinationSlug);
  const sameCategory = published.filter(
    (item) =>
      item.categorySlug === tour.categorySlug && item.destinationSlug !== tour.destinationSlug,
  );
  const rest = published.filter(
    (item) =>
      item.destinationSlug !== tour.destinationSlug && item.categorySlug !== tour.categorySlug,
  );
  return [...sameDestination, ...sameCategory, ...rest].slice(0, limit);
}

export function getCountries(): Country[] {
  return countries;
}

export function getCountry(slug: string): Country | undefined {
  return countryBySlug.get(slug);
}

export function getOperators(): Operator[] {
  return operators;
}

export function getOperator(id: string): Operator | undefined {
  return operatorById.get(id);
}

export type DestinationWithCount = Destination & {
  countryName: string;
  tourCount: number;
};

export function getDestinations(): DestinationWithCount[] {
  const published = getPublishedTours();
  return destinations
    .map((destination) => ({
      ...destination,
      countryName: countryBySlug.get(destination.country)?.name ?? destination.country,
      tourCount: published.filter((tour) => tour.destinationSlug === destination.slug).length,
    }))
    .filter((destination) => destination.tourCount > 0);
}

export function getDestination(slug: string): DestinationWithCount | undefined {
  return getDestinations().find((destination) => destination.slug === slug);
}

export function getToursForDestination(slug: string): TourRecord[] {
  return getPublishedTours().filter((tour) => tour.destinationSlug === slug);
}

export type CategoryWithCount = Category & { tourCount: number };

export function getAllCategories(): Category[] {
  return categories;
}

export function getCategories(): CategoryWithCount[] {
  const published = getPublishedTours();
  return categories
    .map((category) => ({
      ...category,
      tourCount: published.filter((tour) => tour.categorySlug === category.slug).length,
    }))
    .filter((category) => category.tourCount > 0);
}

export function getCategory(slug: string): CategoryWithCount | undefined {
  const category = categoryBySlug.get(slug);
  if (!category) return undefined;
  const tourCount = getPublishedTours().filter((tour) => tour.categorySlug === slug).length;
  return { ...category, tourCount };
}

export function getToursForCategory(slug: string): TourRecord[] {
  return getPublishedTours().filter((tour) => tour.categorySlug === slug);
}

export function getActivities(): Activity[] {
  return activities;
}

export function catalogueHasSampleContent(): boolean {
  return getPublishedTours().some((tour) => tour.sample);
}

export function getDestinationGroups(): { country: Country; destinations: DestinationWithCount[] }[] {
  return countries
    .map((country) => ({
      country,
      destinations: getDestinations().filter((destination) => destination.country === country.slug),
    }))
    .filter((group) => group.destinations.length > 0);
}

export type CollectionWithTours = Collection & { tours: TourRecord[] };

/** Collections with no matching published tour are hidden. */
export function getCollections(): CollectionWithTours[] {
  return collections
    .map((collection) => ({ ...collection, tours: queryTours(collection.query) }))
    .filter((collection) => collection.tours.length > 0);
}

export function getFieldNotes(): FieldNote[] {
  return [...fieldNotes].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getFieldNote(slug: string): FieldNote | undefined {
  return fieldNotes.find((note) => note.slug === slug);
}

export function getCatalogueStats() {
  const published = getPublishedTours();
  return {
    tours: published.length,
    operators: new Set(published.map((tour) => tour.operatorId)).size,
    countries: new Set(published.map((tour) => tour.country)).size,
    destinations: getDestinations().length,
  };
}

import Link from "next/link";
import type { TourRecord } from "@/data/types";
import { TourCard } from "@/components/tours/TourCard";

export function TourGrid({
  tours,
  heading = "h2",
}: {
  tours: TourRecord[];
  heading?: "h2" | "h3";
}) {
  if (tours.length === 0) {
    return (
      <div className="border border-dashed border-ink/40 px-6 py-14 text-center md:px-12">
        <p className="fieldno">N° 404 · Off the map</p>
        <h2 className="display mt-4 text-4xl text-ink md:text-5xl">
          No journeys <span className="display-italic">here, yet.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-md text-ink-soft">
          Nothing in the published index fits every filter at once. Loosen one, or start again from the full list.
        </p>
        <Link href="/tours" className="btn-secondary mt-8">
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
      {tours.map((tour) => (
        <li key={tour.id}>
          <TourCard tour={tour} heading={heading} />
        </li>
      ))}
    </ul>
  );
}

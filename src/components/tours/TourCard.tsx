import Link from "next/link";
import type { TourRecord } from "@/data/types";
import { formatDuration, formatVerifiedPrice } from "@/lib/filters";
import { formatCoordinates } from "@/lib/geo";
import { MediaImage } from "@/components/ui/MediaImage";

export function TourCard({
  tour,
  heading = "h2",
  aspect = "aspect-[4/3]",
}: {
  tour: TourRecord;
  heading?: "h2" | "h3";
  aspect?: string;
}) {
  const Title = heading;
  const price = formatVerifiedPrice(tour.price, tour.currency, tour.priceVerified);
  const cover = tour.images[0];

  return (
    <article className="h-full">
      <Link href={`/tours/${tour.slug}`} className="group flex h-full flex-col">
        <div className={`frame relative bg-paper-deep ${aspect}`}>
          {cover ? (
            <MediaImage
              src={cover.src}
              alt={cover.alt}
              sizes="(min-width: 1280px) 400px, (min-width: 640px) 50vw, 100vw"
              className="transition duration-700 ease-out group-hover:scale-[1.04]"
            />
          ) : null}
          <span className="chip absolute left-3 top-3 bg-paper/90 text-ink backdrop-blur">{tour.categoryName}</span>
          {tour.sample ? <span className="chip absolute right-3 top-3 bg-ink/60 text-paper backdrop-blur">Sample</span> : null}
          <span className="chip absolute bottom-3 left-3 bg-ink/55 text-paper backdrop-blur">{formatDuration(tour.durationDays)}</span>
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <p className="meta flex flex-wrap justify-between gap-x-3 gap-y-1 text-ink-soft">
            <span>
              {tour.destinationName}, {tour.countryName}
            </span>
            <span className="opacity-70">{formatCoordinates(tour.destinationCoordinates)}</span>
          </p>
          <Title className="mt-2 font-serif text-[1.85rem] leading-[1.02] text-ink">
            <span className="link-line">{tour.title}</span>
          </Title>
          <p className="mt-2.5 line-clamp-2 text-sm leading-6 text-ink-soft">{tour.shortDescription}</p>
          <div className="mt-auto pt-4">
            <div className="flex items-center justify-between gap-4 border-t border-line pt-3">
              <p className="text-sm leading-5 text-ink">
                by {tour.operatorName}
                {tour.operatorSample ? <span className="text-ink-soft"> (sample)</span> : null}
              </p>
              <span className="flex shrink-0 items-center gap-3">
                {price ? <span className="meta text-ink">{price}</span> : null}
                <span className="sr-only">View details</span>
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-ink/5 text-ink transition group-hover:bg-clay group-hover:text-paper"
                >
                  <span className="arrow">→</span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
}

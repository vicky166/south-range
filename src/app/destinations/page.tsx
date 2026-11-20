import Link from "next/link";
import { AtlasMap } from "@/components/atlas/AtlasMap";
import { MediaImage } from "@/components/ui/MediaImage";
import { PageIntro } from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/seo";
import { getDestinationGroups, getDestinations } from "@/lib/catalog";
import { fieldNumber, formatCoordinates } from "@/lib/geo";

export const metadata = pageMetadata({
  title: "Destinations",
  description:
    "Explore adventure destinations across India, Nepal, Bhutan, Sri Lanka, Pakistan and Bangladesh.",
  path: "/destinations",
});

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

export default function DestinationsPage() {
  const groups = getDestinationGroups();
  const destinations = getDestinations();
  const order = new Map(destinations.map((destination, index) => [destination.slug, index + 1]));
  const points = destinations.map((destination) => ({
    slug: destination.slug,
    name: destination.name,
    lat: destination.coordinates.lat,
    lng: destination.coordinates.lng,
  }));

  return (
    <>
      <PageIntro
        number="01"
        kicker="The Explorer’s Atlas"
        aside="04°N – 38°N · 66°E – 94°E"
        title={
          <>
            Every place, <span className="display-italic">in order.</span>
          </>
        }
        dek="A place appears here only when at least one published journey is attached to it. Counts come straight from the listings."
      />

      <section aria-label="Atlas overview" className="bg-pine py-14 text-paper md:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center">
          <AtlasMap points={points} tone="dark" className="max-h-[78vh] w-full lg:col-span-7" />
          <div className="lg:col-span-5">
            <p className="meta text-paper/60">
              <span className="text-[#e08a62]">Legend</span> · Chapters in this atlas
            </p>
            <ol className="mt-5 border-t border-paper/20">
              {groups.map((group, index) => {
                const tourCount = group.destinations.reduce((sum, destination) => sum + destination.tourCount, 0);
                return (
                  <li key={group.country.slug} className="border-b border-paper/20">
                    <a
                      href={`#country-${group.country.slug}`}
                      className="group grid grid-cols-[2.6rem_minmax(0,1fr)_auto] items-baseline gap-3 py-3.5"
                    >
                      <span className="meta text-paper/50">{roman[index]}.</span>
                      <span className="font-serif text-2xl leading-tight transition-colors group-hover:italic group-hover:text-[#e08a62]">
                        {group.country.name}
                      </span>
                      <span className="meta text-paper/60">
                        {group.destinations.length} {group.destinations.length === 1 ? "place" : "places"} ·{" "}
                        {tourCount} {tourCount === 1 ? "journey" : "journeys"}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      <div className="container-page py-16 md:py-24">
        {groups.map((group, index) => (
          <section
            key={group.country.slug}
            id={`country-${group.country.slug}`}
            aria-labelledby={`country-${group.country.slug}-heading`}
            className="scroll-mt-24 grid gap-8 border-t border-ink py-12 first:pt-10 md:py-16 lg:grid-cols-12 lg:gap-10"
          >
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-24">
                <p className="meta text-clay">Chapter {roman[index]}</p>
                <h2 id={`country-${group.country.slug}-heading`} className="display mt-2 text-[clamp(2.6rem,6vw,4.6rem)] leading-[0.92]">
                  {group.country.name}
                </h2>
                <p className="mt-4 max-w-md leading-7 text-ink-soft">{group.country.summary}</p>
                <Link href={`/tours?country=${group.country.slug}`} className="meta link-line mt-5 inline-block text-ink">
                  Every journey in {group.country.name} <span aria-hidden="true" className="arrow text-clay">→</span>
                </Link>
              </div>
            </div>
            <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-8">
              {group.destinations.map((destination, position) => (
                <li
                  key={destination.slug}
                  className={group.destinations.length > 1 && position === 0 ? "sm:col-span-2" : undefined}
                >
                  <Link href={`/destinations/${destination.slug}`} className="group block">
                    <span
                      className={`frame relative block bg-paper-deep ${
                        group.destinations.length > 1 && position === 0 ? "aspect-[4/3] sm:aspect-[16/8]" : "aspect-[4/3]"
                      }`}
                    >
                      <MediaImage
                        src={destination.image.src}
                        alt={destination.image.alt}
                        sizes={
                          group.destinations.length > 1 && position === 0
                            ? "(min-width: 1024px) 60vw, 100vw"
                            : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                        }
                        className="transition duration-700 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="meta mt-4 flex justify-between gap-3 text-ink-soft">
                      <span className="text-clay">{fieldNumber(order.get(destination.slug) ?? 0)}</span>
                      <span>{formatCoordinates(destination.coordinates)}</span>
                    </span>
                    <span className="mt-2 flex items-baseline justify-between gap-4 border-b border-line pb-3">
                      <span className="font-serif text-3xl leading-tight text-ink transition-colors group-hover:italic group-hover:text-clay">
                        {destination.name}
                      </span>
                      <span className="meta shrink-0 text-ink">
                        {destination.tourCount === 1 ? "1 journey" : `${destination.tourCount} journeys`}{" "}
                        <span aria-hidden="true" className="arrow text-clay">→</span>
                      </span>
                    </span>
                    <span className="mt-3 line-clamp-2 block text-sm leading-6 text-ink-soft">{destination.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AtlasMap } from "@/components/atlas/AtlasMap";
import { TourCard } from "@/components/tours/TourCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaImage } from "@/components/ui/MediaImage";
import { getDestination, getDestinations, getToursForDestination } from "@/lib/catalog";
import { fieldNumber, formatCoordinates } from "@/lib/geo";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

type DestinationPageProps = {
  params: Promise<{ slug: string }>;
};

/** Every destination slug is prerendered, so this page never reads request data. */
export const instant = false;

export function generateStaticParams() {
  return getDestinations().map((destination) => ({ slug: destination.slug }));
}

export async function generateMetadata({ params }: DestinationPageProps): Promise<Metadata> {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) return { title: "Destination not found" };
  return pageMetadata({
    title: `${destination.name} tours`,
    description: destination.summary,
    path: `/destinations/${destination.slug}`,
    image: destination.image.src,
  });
}

export default async function DestinationPage({ params }: DestinationPageProps) {
  const { slug } = await params;
  const destination = getDestination(slug);
  if (!destination) notFound();
  const tours = getToursForDestination(destination.slug);
  const all = getDestinations();
  const position = all.findIndex((item) => item.slug === destination.slug) + 1;
  const coordinates = formatCoordinates(destination.coordinates);
  const neighbours = all.filter((item) => item.country === destination.country && item.slug !== destination.slug);
  const points = all.map((item) => ({
    slug: item.slug,
    name: item.name,
    lat: item.coordinates.lat,
    lng: item.coordinates.lng,
  }));

  return (
    <article>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Destinations", path: "/destinations" },
          { name: destination.name, path: `/destinations/${destination.slug}` },
        ])}
      />

      <header className="container-page pt-8 md:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Destinations", href: "/destinations" },
            { label: destination.name },
          ]}
        />
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink pt-4">
          <p className="meta flex gap-3 text-ink-soft">
            <span className="text-clay">{fieldNumber(position)}</span>
            <span>Atlas entry · {destination.countryName}</span>
          </p>
          <p className="meta text-ink-soft">{coordinates}</p>
        </div>
      </header>

      <div className="container-page mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <h1 className="display text-[clamp(3rem,11vw,8rem)] leading-[0.88]">{destination.name}</h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-ink-soft md:text-xl md:leading-9">{destination.summary}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link href={`/tours?destination=${destination.slug}`} className="btn-primary">
              Filter the index to {destination.name} <span aria-hidden="true" className="arrow">→</span>
            </Link>
            <p className="meta text-ink-soft">
              {tours.length === 1 ? "1 published journey" : `${tours.length} published journeys`}
            </p>
          </div>
        </div>
        <figure className="relative lg:col-span-5 lg:row-span-2">
          <div className="reveal-clip frame relative aspect-[4/5] bg-pine">
            <MediaImage src={destination.image.src} alt={destination.image.alt} sizes="(min-width: 1024px) 40vw, 100vw" priority />
          </div>
          <figcaption className="meta mt-3 text-[0.62rem] text-ink-soft">
            Fig. 01 — {destination.image.alt}
          </figcaption>
        </figure>
        <div className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[minmax(0,1fr)_13rem] sm:items-end lg:col-span-7 lg:self-end">
          <AtlasMap points={points} active={destination.slug} className="w-full max-w-md" />
          <div className="text-sm leading-6 text-ink-soft">
            <p className="field-label">Reference point</p>
            <p className="mt-1 font-mono text-[0.78rem] text-ink">{coordinates}</p>
            <p className="mt-2">Approximate centre of the region, used to plot it on the atlas.</p>
          </div>
        </div>
      </div>

      <section aria-labelledby="journeys-heading" className="container-page py-20 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-4">
          <h2 id="journeys-heading" className="display text-[clamp(2.2rem,5vw,4rem)] leading-none">
            Journeys in <span className="display-italic">{destination.name}.</span>
          </h2>
          <p className="meta text-ink-soft">Each with its own operator and link</p>
        </div>
        <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
          {tours.map((tour) => (
            <li key={tour.id}>
              <TourCard tour={tour} heading="h3" />
            </li>
          ))}
        </ul>
      </section>

      {neighbours.length > 0 ? (
        <section aria-labelledby="neighbours-heading" className="border-t border-line bg-paper-deep py-14 md:py-20">
          <div className="container-page">
            <p className="meta text-ink-soft">
              <span className="text-clay">Same chapter</span> · {destination.countryName}
            </p>
            <h2 id="neighbours-heading" className="sr-only">
              Other places in {destination.countryName}
            </h2>
            <ul className="mt-6 border-t border-ink">
              {neighbours.map((item) => (
                <li key={item.slug} className="border-b border-line">
                  <Link
                    href={`/destinations/${item.slug}`}
                    className="group flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4"
                  >
                    <span className="font-serif text-3xl leading-tight transition-colors group-hover:italic group-hover:text-clay">
                      {item.name}
                    </span>
                    <span className="meta text-ink-soft">
                      {formatCoordinates(item.coordinates)} · {item.tourCount === 1 ? "1 journey" : `${item.tourCount} journeys`}{" "}
                      <span aria-hidden="true" className="arrow text-clay">→</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}

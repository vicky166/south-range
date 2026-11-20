import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { AtlasIndex, type AtlasEntry } from "@/components/atlas/AtlasIndex";
import { HeroSearch } from "@/components/home/HeroSearch";
import { HeroWindow, type HeroPlace } from "@/components/home/HeroWindow";
import { NewsletterForm } from "@/components/home/NewsletterForm";
import { PathIndex } from "@/components/home/PathIndex";
import { TourCard } from "@/components/tours/TourCard";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaImage } from "@/components/ui/MediaImage";
import { Postmark } from "@/components/ui/Postmark";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Photo, TourRecord } from "@/data/types";
import { askExamples, askPlaceholder } from "@/lib/ask";
import {
  getCatalogueStats,
  getCategories,
  getCollections,
  getCountries,
  getDestinations,
  getFeaturedTours,
  getFieldNotes,
  getPublishedTours,
  getTrendingTours,
} from "@/lib/catalog";
import { formatDuration, tourQueryHref } from "@/lib/filters";
import { formatCoordinates } from "@/lib/geo";
import { websiteJsonLd } from "@/lib/seo";

const unsplash = (id: string, params: string) => `https://images.unsplash.com/${id}?auto=format&fit=crop&q=75&${params}`;

const shareImage = {
  src: unsplash("photo-1585409677983-0f6c41ca9c3b", "w=2400&h=1500&crop=focalpoint&fp-x=0.55&fp-y=0.5"),
  alt: "A range of snow peaks lit pink and gold at dusk above dark foothills",
};

const stampImage = {
  src: unsplash("photo-1454496522488-7a8e488e8606", "w=400&h=500&crop=focalpoint&fp-x=0.47&fp-y=0.42"),
  alt: "",
};

/** Places shown in the hero window, one per country. */
const heroSlugs = ["ladakh", "hunza", "pokhara", "paro", "sundarbans", "mirissa"];

const steps = [
  {
    title: "Wander the index",
    text: "Plot a route, describe a trip or open the atlas. Every listing is a separate journey from an independent operator.",
  },
  {
    title: "Read the field sheet",
    text: "Operator, route, inclusions, and a price only when it has been verified. Nothing invented to fill a gap.",
  },
  {
    title: "Leave by its own link",
    text: "Each tour carries its own KLNK address. No shared booking link, and no button when a link is missing.",
  },
];

export const metadata: Metadata = {
  openGraph: {
    images: [{ url: shareImage.src, width: 2400, height: 1500, alt: shareImage.alt }],
  },
};

/** Prefer one tour per operator so a selection never reads as one brand. */
function pickAcrossOperators(tours: TourRecord[], count: number): TourRecord[] {
  const seen = new Set<string>();
  const first: TourRecord[] = [];
  const rest: TourRecord[] = [];
  for (const tour of tours) {
    if (!seen.has(tour.operatorId) && first.length < count) {
      seen.add(tour.operatorId);
      first.push(tour);
    } else {
      rest.push(tour);
    }
  }
  return [...first, ...rest].slice(0, count);
}

export default function HomePage() {
  const stats = getCatalogueStats();
  const destinations = getDestinations();
  const published = getPublishedTours();

  const atlas: AtlasEntry[] = destinations.map((destination) => ({
    slug: destination.slug,
    name: destination.name,
    lat: destination.coordinates.lat,
    lng: destination.coordinates.lng,
    countryName: destination.countryName,
    coordinates: formatCoordinates(destination.coordinates),
    tourCount: destination.tourCount,
    image: destination.image,
  }));

  const heroPlaces: HeroPlace[] = heroSlugs.flatMap((slug) => {
    const destination = destinations.find((item) => item.slug === slug);
    return destination
      ? [
          {
            slug: destination.slug,
            name: destination.name,
            countryName: destination.countryName,
            coordinates: formatCoordinates(destination.coordinates),
            season: destination.season,
            tourCount: destination.tourCount,
            image: destination.image,
          },
        ]
      : [];
  });

  const usedImages = new Set(heroPlaces.map((place) => place.image.src));
  const stamps = getCountries().flatMap((country) => {
    const places = destinations.filter((destination) => destination.country === country.slug);
    const tourCount = places.reduce((sum, place) => sum + place.tourCount, 0);
    const candidates: Photo[] = [
      ...places.map((place) => place.image),
      ...published.filter((tour) => tour.country === country.slug).flatMap((tour) => tour.images),
    ];
    const image = candidates.find((candidate) => !usedImages.has(candidate.src)) ?? candidates[0];
    if (!image || places.length === 0) return [];
    usedImages.add(image.src);
    return [{ country, places, tourCount, image }];
  });

  const categories = getCategories();
  const featured = getFeaturedTours();
  const [lead] = pickAcrossOperators(featured, 1);
  const others = pickAcrossOperators(
    [...new Map([...featured, ...getTrendingTours(), ...published].map((tour) => [tour.id, tour])).values()].filter(
      (tour) => tour.id !== lead?.id,
    ),
    6,
  );
  const compact = others.slice(0, 2);
  const shelf = others.slice(2, 6);
  const collections = getCollections();
  const [leadNote, ...notes] = getFieldNotes();

  return (
    <>
      <JsonLd data={websiteJsonLd()} />

      {/* ——— Hero ——— */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        <Contours className="pointer-events-none absolute -right-48 -top-24 h-[54rem] w-[54rem] text-line md:-right-40 lg:-right-24 lg:top-0" />
        <div className="container-page relative grid gap-x-10 gap-y-12 pb-20 pt-8 md:pb-24 md:pt-12 lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12 lg:grid-rows-[1fr_auto] lg:gap-y-9 lg:pb-14 lg:pt-8">
          <div className="lg:col-span-7 lg:self-end">
            <p className="hero-fade meta flex items-center gap-3 text-ink-soft" style={{ "--d": -4 } as CSSProperties}>
              <span aria-hidden="true" className="h-px w-10 bg-clay" />
              The art of getting lost
            </p>
            <h1 id="hero-title" className="display mt-6 text-[clamp(3rem,7.6vw,6.9rem)] leading-[0.9] text-ink">
              <span className="hero-line" style={{ "--d": 0 } as CSSProperties}>
                <span>Somewhere</span>
              </span>{" "}
              <span className="hero-line" style={{ "--d": 1 } as CSSProperties}>
                <span>Between Here</span>
              </span>{" "}
              <span className="hero-line whitespace-nowrap" style={{ "--d": 2 } as CSSProperties}>
                <span>
                  <span className="display-italic text-[0.42em] text-ink-soft">and</span>{" "}
                  <span className="display-italic relative text-clay">
                    Extraordinary.
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 16"
                      preserveAspectRatio="none"
                      className="absolute -bottom-[0.1em] left-[2%] h-[0.16em] w-[92%] overflow-visible"
                    >
                      <path
                        d="M3 11C60 4 140 2 297 8"
                        pathLength={1}
                        className="swash"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </span>
              </span>
            </h1>
            <p className="hero-fade mt-7 max-w-md text-lg leading-8 text-ink-soft" style={{ "--d": 0 } as CSSProperties}>
              Discover journeys beyond the ordinary. Explore extraordinary experiences across South Asia.
            </p>
          </div>

          <div className="lg:col-span-5 lg:col-start-8 lg:row-span-2 lg:row-start-1 lg:self-center lg:pt-6">
            <HeroWindow places={heroPlaces} />
          </div>

          <div className="lg:col-span-7 lg:self-start">
            <div className="hero-fade max-w-2xl" style={{ "--d": 2 } as CSSProperties}>
              <HeroSearch />
            </div>
            <p
              className="hero-fade mt-5 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm text-ink-soft lg:max-w-2xl"
              style={{ "--d": 3 } as CSSProperties}
            >
              <a href="#ask" className="group inline-flex items-center gap-2 text-ink">
                <span className="link-line">Or write it in your own words</span>
                <span aria-hidden="true" className="arrow text-clay">
                  ↓
                </span>
              </a>
              <span className="meta">The world is bigger than your itinerary.</span>
            </p>
          </div>
        </div>
      </section>

      {/* ——— How the index works ——— */}
      <section aria-labelledby="how-heading" className="bg-pine text-paper">
        <div className="container-page py-20 md:py-28">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
            <div className="lg:col-span-7">
              <p className="meta text-paper/60">
                <span className="text-[#f0b48f]">N° 01</span> · How the index works
              </p>
              <h2 id="how-heading" className="display mt-6 text-[clamp(2.6rem,5.8vw,5.2rem)] leading-[0.96]">
                We don’t run tours. <span className="display-italic text-[#f3cdb0]">We point the way.</span>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-8 text-paper/75 lg:col-span-5">
              Independent operators across six countries, every journey with its own way to book. Three stops, no detours.
            </p>
          </div>

          <div className="route relative mt-14 md:mt-20">
            <svg
              aria-hidden="true"
              viewBox="0 0 1200 96"
              preserveAspectRatio="none"
              className="absolute inset-x-0 top-0 hidden h-24 w-full md:block"
            >
              <path
                d="M0 74C80 74 130 48 200 48S330 12 420 22 530 48 600 48 720 86 820 76 930 48 1000 48 1130 24 1200 30"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.28"
                strokeWidth="2"
                strokeDasharray="1 9"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d="M0 74C80 74 130 48 200 48S330 12 420 22 530 48 600 48 720 86 820 76 930 48 1000 48 1130 24 1200 30"
                pathLength={1}
                className="route-trail"
                fill="none"
                stroke="#e08a62"
                strokeWidth="1.5"
              />
            </svg>
            <ol className="relative grid gap-10 before:absolute before:bottom-6 before:left-6 before:top-6 before:border-l before:border-dashed before:border-paper/25 md:grid-cols-3 md:gap-0 md:before:hidden">
              {steps.map((step, index) => (
                <li key={step.title} className="relative pl-20 md:px-6 md:pl-6 md:text-center">
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-paper/35 bg-pine font-serif text-xl italic text-[#f3cdb0] md:relative md:mx-auto md:mt-6"
                  >
                    {["i", "ii", "iii"][index]}
                  </span>
                  <h3 className="font-serif text-3xl md:mt-8">{step.title}</h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-paper/75 md:mx-auto">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>

          <dl className="mt-16 flex flex-wrap gap-x-10 gap-y-5 border-t border-paper/15 pt-7 md:mt-20 md:justify-between">
            {[
              [stats.tours, "sample journeys"],
              [stats.operators, "operators"],
              [stats.countries, "countries"],
              [stats.destinations, "places on the atlas"],
            ].map(([value, label]) => (
              <div key={label} className="flex flex-row-reverse items-baseline justify-end gap-3">
                <dt className="meta text-paper/60">{label}</dt>
                <dd className="font-serif text-4xl leading-none md:text-5xl">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ——— Six countries, postmarked ——— */}
      <section aria-labelledby="countries-heading" className="overflow-hidden py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="countries-heading"
            number="02"
            kicker="Six countries"
            title={
              <>
                Collect the <span className="display-italic">whole set.</span>
              </>
            }
            dek="One stamp per country. Open one to see every journey listed there."
            action={{ href: "/destinations", label: "All destinations" }}
          />
          <ul className="mt-16 grid grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-14 lg:gap-y-20 lg:pb-14">
            {stamps.map(({ country, places, tourCount, image }, index) => (
              <li key={country.slug} className={index % 3 === 1 ? "lg:translate-y-14" : ""}>
                <Link href={`/tours?country=${country.slug}`} className="group mx-auto block lg:max-w-[19.5rem]">
                  <span className="relative block">
                    <span className="stamp-shadow block transition duration-500 ease-out group-hover:-translate-y-1.5">
                      <span className="stamp">
                        <span className="relative block aspect-[4/5] overflow-hidden bg-paper-deep">
                          <MediaImage
                            src={image.src}
                            alt={image.alt}
                            sizes="(min-width: 1024px) 26vw, 45vw"
                            className="transition duration-1000 ease-out group-hover:scale-[1.05]"
                          />
                        </span>
                        <span className="flex flex-col gap-1 pt-2.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3 sm:pt-3">
                          <span className="font-serif text-[1.45rem] leading-none text-ink sm:text-[1.9rem]">{country.name}</span>
                          <span className="meta text-clay">
                            {places.length === 1 ? "1 place" : `${places.length} places`}
                          </span>
                        </span>
                      </span>
                    </span>
                    <Postmark
                      id={`pm-${country.slug}`}
                      top={country.name}
                      bottom={tourCount === 1 ? "1 journey" : `${tourCount} journeys`}
                      className="absolute -right-1 top-2 w-[58%] -rotate-[10deg] group-hover:-rotate-[4deg] sm:-right-6 sm:top-4 sm:w-[54%]"
                    />
                  </span>
                  <span className="mt-5 line-clamp-3 text-sm leading-6 text-ink-soft sm:line-clamp-2">{country.summary}</span>
                  <span className="meta mt-2 hidden items-center gap-2 text-ink sm:flex">
                    <span className="link-line">{places.map((place) => place.name).join(" · ")}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ——— Choose Your Path ——— */}
      <section aria-labelledby="paths-heading" className="bg-paper-deep py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="paths-heading"
            number="03"
            kicker="Choose your path"
            title={
              <>
                Pick a way <span className="display-italic">to move.</span>
              </>
            }
            dek="On foot, by water, on two wheels or under canvas. Every way of travelling the index, with what is listed under it."
            action={{ href: "/experiences", label: "All experiences" }}
          />
          <div className="mt-12 md:mt-16">
            <PathIndex
              paths={categories.map((category) => ({
                slug: category.slug,
                name: category.name,
                summary: category.summary,
                tourCount: category.tourCount,
                image: category.image,
              }))}
            />
          </div>
        </div>
      </section>

      {/* ——— Journeys Worth Taking ——— */}
      {lead ? (
        <section aria-labelledby="journeys-heading" className="py-20 md:py-28">
          <div className="container-page">
            <SectionHeading
              id="journeys-heading"
              number="04"
              kicker="Journeys worth taking"
              title={
                <>
                  Journeys <span className="display-italic">worth taking.</span>
                </>
              }
              dek="One long read and a handful of shorter ones, chosen across different operators."
              action={{ href: "/tours", label: `All ${stats.tours} journeys` }}
            />

            <div className="mt-14 grid gap-x-8 gap-y-12 lg:grid-cols-12">
              <article className="lg:col-span-7">
                <Link href={`/tours/${lead.slug}`} className="frame group relative block aspect-[4/5] bg-pine text-paper sm:aspect-[5/4]">
                  <span className="parallax absolute inset-0 block">
                    <MediaImage
                      src={lead.images[0].src}
                      alt={lead.images[0].alt}
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="transition duration-1000 group-hover:scale-[1.03]"
                    />
                  </span>
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" />
                  <span className="absolute left-4 top-4 flex flex-wrap gap-2 md:left-6 md:top-6">
                    <span className="chip bg-paper/90 text-ink">{lead.categoryName}</span>
                    {lead.sample ? <span className="chip bg-ink/60 text-paper backdrop-blur">Sample</span> : null}
                  </span>
                  <span className="absolute inset-x-0 bottom-0 block p-5 md:p-8">
                    <span className="meta block text-paper/75">
                      {lead.destinationName}, {lead.countryName} · {formatDuration(lead.durationDays)}
                    </span>
                    <span className="display mt-3 block max-w-xl text-[clamp(2.3rem,4.6vw,4.2rem)] leading-[0.95]">
                      <span className="link-line">{lead.title}</span>
                    </span>
                    <span className="mt-4 hidden max-w-lg text-base leading-7 text-paper/80 sm:line-clamp-2">{lead.description}</span>
                    <span className="mt-5 flex items-center justify-between gap-4 border-t border-paper/20 pt-4 text-sm">
                      <span>
                        Listed by {lead.operatorName}
                        {lead.operatorSample ? <span className="text-paper/60"> (sample)</span> : null}
                      </span>
                      <span className="flex items-center gap-2 font-semibold">
                        Field sheet <span aria-hidden="true" className="arrow">→</span>
                      </span>
                    </span>
                  </span>
                </Link>
              </article>

              <div className="flex flex-col gap-8 lg:col-span-5">
                <p className="meta text-ink-soft">Also worth the trip</p>
                {compact.map((tour) => (
                  <article key={tour.id} className="border-t border-line pt-6 first-of-type:border-ink">
                    <Link
                      href={`/tours/${tour.slug}`}
                      className="group grid grid-cols-[5.5rem_minmax(0,1fr)] gap-4 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-5"
                    >
                      <span className="arch relative block aspect-[4/5] bg-paper-deep">
                        <MediaImage
                          src={tour.images[0].src}
                          alt={tour.images[0].alt}
                          sizes="160px"
                          className="transition duration-700 group-hover:scale-[1.05]"
                        />
                      </span>
                      <span className="flex min-w-0 flex-col">
                        <span className="meta text-ink-soft">
                          {tour.destinationName} · {formatDuration(tour.durationDays)}
                        </span>
                        <span className="mt-2 font-serif text-[1.45rem] leading-[1.05] text-ink sm:text-[1.7rem] sm:leading-[1.02]">
                          <span className="link-line">{tour.title}</span>
                        </span>
                        <span className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft">{tour.shortDescription}</span>
                        <span className="mt-auto pt-3 text-sm text-ink">
                          by {tour.operatorName}
                          {tour.operatorSample ? <span className="text-ink-soft"> (sample)</span> : null}
                        </span>
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>

            <ul className="mt-16 grid gap-x-6 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-4">
              {shelf.map((tour) => (
                <li key={tour.id}>
                  <TourCard tour={tour} heading="h3" aspect="aspect-[4/3] lg:aspect-[4/5]" />
                </li>
              ))}
            </ul>

            <div className="mt-14 flex justify-center">
              <Link href="/tours" className="btn-secondary">
                Browse all {stats.tours} journeys <span aria-hidden="true" className="arrow">→</span>
              </Link>
            </div>
          </div>
        </section>
      ) : null}

      {/* ——— The Explorer's Atlas ——— */}
      <section id="atlas" aria-labelledby="atlas-heading" className="scroll-mt-20 bg-paper-deep py-20 md:py-28">
        <div className="container-page">
          <SectionHeading
            id="atlas-heading"
            number="05"
            kicker="The Explorer’s Atlas"
            title={
              <>
                Every place, <span className="display-italic">plotted.</span>
              </>
            }
            dek="Each destination sits at its real coordinates. Hover a name to move the marker; open it to see who runs journeys there."
            action={{ href: "/destinations", label: "Open the full atlas" }}
          />
          <div className="mt-12">
            <AtlasIndex entries={atlas} />
          </div>
        </div>
      </section>

      {/* ——— Beyond the Ordinary ——— */}
      {collections.length > 0 ? (
        <section aria-labelledby="collections-heading" className="bg-pine py-20 text-paper md:py-28">
          <div className="container-page">
            <SectionHeading
              id="collections-heading"
              number="06"
              kicker="Curated collections"
              tone="dark"
              title={
                <>
                  Beyond the <span className="display-italic">ordinary.</span>
                </>
              }
              dek="Four ways through the index, each built from the same live listings."
            />
            <ul className="panels mt-12 grid gap-3 sm:grid-cols-2 lg:flex lg:gap-3">
              {collections.map((collection) => (
                <li key={collection.slug} className="panel frame relative h-[24rem] bg-ink lg:h-auto">
                  <Link href={tourQueryHref(collection.query)} className="group absolute inset-0 block">
                    <MediaImage
                      src={collection.image.src}
                      alt={collection.image.alt}
                      sizes="(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                      className="transition duration-1000 group-hover:scale-[1.04]"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-ink/10" />
                    <span
                      aria-hidden="true"
                      className="panel-closed-only display absolute bottom-6 left-5 whitespace-nowrap text-4xl text-paper [writing-mode:vertical-rl] rotate-180"
                    >
                      {collection.title}
                    </span>
                    <span className="panel-open-only absolute inset-x-0 bottom-0 block p-6 md:p-8">
                      <span className="display block text-4xl leading-[0.95] text-paper md:text-6xl">{collection.title}</span>
                      <span className="mt-3 block max-w-sm text-sm leading-6 text-paper/80">{collection.dek}</span>
                      <span className="mt-5 inline-flex flex-wrap items-center gap-3 rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink">
                        {collection.tours.length === 1 ? "1 journey" : `${collection.tours.length} journeys`}
                        <span aria-hidden="true" className="arrow text-clay">→</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ——— Field Notes ——— */}
      {leadNote ? (
        <section aria-labelledby="notes-heading" className="container-page py-20 md:py-28">
          <SectionHeading
            id="notes-heading"
            number="07"
            kicker="Field notes"
            title={
              <>
                Notes from <span className="display-italic">the margins.</span>
              </>
            }
            action={{ href: "/field-notes", label: "All field notes" }}
          />
          <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-12">
            <Link href={`/field-notes/${leadNote.slug}`} className="group block lg:col-span-7">
              <span className="reveal-clip frame relative block aspect-[4/3] bg-paper-deep lg:aspect-[5/6]">
                <span className="parallax absolute inset-0 block">
                  <MediaImage src={leadNote.image.src} alt={leadNote.image.alt} sizes="(min-width: 1024px) 58vw, 100vw" />
                </span>
              </span>
            </Link>
            <div className="flex flex-col lg:col-span-5">
              <p className="meta text-clay">{leadNote.kicker}</p>
              <h3 className="display mt-4 text-[clamp(2.4rem,4.6vw,4.2rem)] leading-[0.95]">
                <Link href={`/field-notes/${leadNote.slug}`} className="link-line">
                  {leadNote.title}
                </Link>
              </h3>
              <p className="mt-5 text-lg leading-8 text-ink-soft">{leadNote.dek}</p>
              {leadNote.pullQuote ? (
                <blockquote className="display-italic mt-8 border-l-2 border-clay pl-5 text-3xl leading-snug text-pine">
                  “{leadNote.pullQuote}”
                </blockquote>
              ) : null}
              <ul className="mt-10 lg:mt-auto">
                {notes.map((note) => (
                  <li key={note.slug} className="border-t border-line">
                    <Link href={`/field-notes/${note.slug}`} className="group grid grid-cols-[5rem_minmax(0,1fr)] gap-4 py-5">
                      <span className="relative block aspect-square overflow-hidden rounded-[0.8rem] bg-paper-deep">
                        <MediaImage src={note.image.src} alt="" sizes="80px" className="transition duration-700 group-hover:scale-105" />
                      </span>
                      <span>
                        <span className="meta block text-ink-soft">{note.kicker}</span>
                        <span className="mt-1 block font-serif text-[1.7rem] leading-tight text-ink group-hover:italic">
                          {note.title}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {/* ——— Go get lost: write to the index ——— */}
      <section id="ask" aria-labelledby="lost-heading" className="scroll-mt-20 bg-paper-deep py-20 md:py-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
          <div className="lg:col-span-5">
            <p className="meta text-ink-soft">
              <span className="text-clay">N° 08</span> · Last page
            </p>
            <h2 id="lost-heading" className="display mt-6 text-[clamp(4rem,12vw,9.5rem)] leading-[0.82]">
              Go get <span className="display-italic text-clay">lost.</span>
            </h2>
            <p className="mt-8 max-w-sm text-lg leading-8 text-ink-soft">
              On purpose, and with a good map. Or send the index a postcard and let it read between the lines.
            </p>
            <Link href="/tours" className="btn-secondary mt-8">
              Open the full index <span aria-hidden="true" className="arrow">→</span>
            </Link>
          </div>

          <form
            action="/tours"
            method="get"
            role="search"
            aria-label="Describe the journey you want"
            className="relative overflow-x-clip rounded-[0.9rem] bg-[#fbf8f1] shadow-[0_40px_70px_-45px_rgba(28,27,24,0.65)] ring-1 ring-ink/5 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:col-span-7"
          >
            <div className="p-5 pb-6 sm:p-7 md:p-8">
              <label htmlFor="ask-closing" className="display-italic block text-[2rem] leading-none text-ink">
                Dear index,
              </label>
              <textarea
                id="ask-closing"
                name="ask"
                rows={3}
                maxLength={200}
                placeholder={askPlaceholder}
                className="ruled mt-3 block w-full resize-none bg-transparent font-serif text-[1.35rem] text-ink outline-none placeholder:text-ink-soft/60"
              />
              <p className="mt-5 text-sm leading-6 text-ink-soft">
                <span className="meta mr-2 text-ink-soft">Or try</span>
                {askExamples.slice(0, 3).map((example, index) => (
                  <span key={example.text}>
                    {index > 0 ? <span aria-hidden="true"> · </span> : null}
                    <Link
                      href={`/tours?ask=${encodeURIComponent(example.text)}`}
                      className="font-serif text-[1.05rem] italic text-ink underline decoration-line underline-offset-4 transition hover:text-clay hover:decoration-clay"
                    >
                      {example.text.toLowerCase()}
                    </Link>
                  </span>
                ))}
              </p>
            </div>

            <div className="flex flex-col gap-6 border-t border-dashed border-ink/20 p-5 sm:p-7 md:border-l md:border-t-0 md:p-8">
              <div className="flex justify-end">
                <span className="relative shrink-0">
                  <span className="stamp-shadow block">
                    <span className="stamp w-[4.75rem] [--hole:3.5px]">
                      <span className="relative block aspect-[4/5] overflow-hidden bg-pine">
                        <MediaImage src={stampImage.src} alt={stampImage.alt} sizes="80px" />
                      </span>
                    </span>
                  </span>
                  <Postmark id="pm-postcard" top="South Asia" className="absolute -left-6 top-6 w-24 -rotate-[8deg] sm:-left-14 sm:w-28" />
                </span>
              </div>
              <div className="meta space-y-0 text-ink">
                {["The South Range index", "Six countries", "South Asia"].map((line) => (
                  <p key={line} className="border-b border-line py-2.5">
                    {line}
                  </p>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <p className="max-w-[13rem] text-xs leading-5 text-ink-soft">Read by word rules, not an AI. Every filter can be changed after.</p>
                <button type="submit" className="btn-primary shrink-0">
                  Send it <span aria-hidden="true" className="arrow">→</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="container-page mt-16">
          <div className="grid gap-6 border-t border-ink/15 pt-10 md:grid-cols-12 md:items-start">
            <div className="md:col-span-5">
              <p className="meta text-ink-soft">Dispatches</p>
              <p className="mt-2 font-serif text-3xl leading-tight">Occasional letters, once there is a list.</p>
            </div>
            <div id="newsletter" className="scroll-mt-24 md:col-span-6 md:col-start-7">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/** Loose topographic contours behind the hero. */
function Contours({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 600" fill="none" aria-hidden="true" className={className}>
      {Array.from({ length: 10 }, (_, index) => (
        <ellipse
          key={index}
          cx={300 + index * 7}
          cy={300 - index * 5}
          rx={290 - index * 27}
          ry={230 - index * 21}
          transform={`rotate(${-16 + index * 2.5} 300 300)`}
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={index % 3 === 2 ? "2 6" : undefined}
        />
      ))}
    </svg>
  );
}

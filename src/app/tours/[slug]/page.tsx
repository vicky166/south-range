import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AtlasMap } from "@/components/atlas/AtlasMap";
import { KlnkCta } from "@/components/tours/KlnkCta";
import { TourCard } from "@/components/tours/TourCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { JsonLd } from "@/components/ui/JsonLd";
import { MediaImage } from "@/components/ui/MediaImage";
import {
  getActivities,
  getDestinations,
  getPublishedTours,
  getRelatedTours,
  getTourBySlug,
} from "@/lib/catalog";
import { formatDuration, formatVerifiedPrice } from "@/lib/filters";
import { fieldNumber, formatCoordinates } from "@/lib/geo";
import { breadcrumbJsonLd, pageMetadata, tourJsonLd } from "@/lib/seo";

type TourPageProps = {
  params: Promise<{ slug: string }>;
};

/** Every published slug is prerendered, so this page never reads request data. */
export const instant = false;

export function generateStaticParams() {
  return getPublishedTours().map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({ params }: TourPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour not found" };
  return pageMetadata({
    title: tour.title,
    description: tour.shortDescription,
    path: `/tours/${tour.slug}`,
    image: tour.images[0]?.src,
  });
}

/** "Day 1 — Leh" becomes ["Day 1", "Leh"]; titles without a dash keep a blank label. */
function splitDayTitle(title: string): [string, string] {
  const [label, ...rest] = title.split(" — ");
  return rest.length > 0 ? [label, rest.join(" — ")] : ["", title];
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const related = getRelatedTours(tour);
  const price = formatVerifiedPrice(tour.price, tour.currency, tour.priceVerified);
  const [cover, second, ...rest] = tour.images;
  const position = getPublishedTours().findIndex((item) => item.id === tour.id) + 1;
  const coordinates = formatCoordinates(tour.destinationCoordinates);
  const activityNames = getActivities()
    .filter((activity) => tour.activitySlugs.includes(activity.slug))
    .map((activity) => activity.name);
  const atlasPoints = getDestinations().map((destination) => ({
    slug: destination.slug,
    name: destination.name,
    lat: destination.coordinates.lat,
    lng: destination.coordinates.lng,
  }));
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tours", path: "/tours" },
    { name: tour.title, path: `/tours/${tour.slug}` },
  ];

  const sections: { id: string; title: string }[] = [
    { id: "journey", title: "The journey" },
    { id: "highlights", title: "Highlights" },
    ...(tour.itinerary ? [{ id: "route", title: "The route" }] : []),
    ...(tour.includedServices || tour.excludedServices ? [{ id: "kit", title: "What is covered" }] : []),
    ...(tour.importantInformation.length > 0 ? [{ id: "before", title: "Before you go" }] : []),
    { id: "atlas", title: "On the atlas" },
  ];
  const number = (id: string) => String(sections.findIndex((section) => section.id === id) + 1).padStart(2, "0");

  return (
    <article>
      <JsonLd data={tourJsonLd(tour)} />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <header className="container-page pt-8 md:pt-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Tours", href: "/tours" },
            { label: tour.title },
          ]}
        />
        <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3 border-t border-ink pt-4">
          <p className="meta flex flex-wrap gap-x-3 gap-y-1 text-ink-soft">
            <span className="text-clay">{fieldNumber(position)}</span>
            <span>Field sheet</span>
            <span aria-hidden="true">·</span>
            <span>{tour.categoryName}</span>
            {tour.sample ? <span className="text-clay">Sample listing</span> : null}
          </p>
          <p className="meta text-ink-soft">{coordinates}</p>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="meta text-ink-soft">
              <Link href={`/destinations/${tour.destinationSlug}`} className="link-line">
                {tour.destinationName}
              </Link>
              , {tour.countryName} · {formatDuration(tour.durationDays)}
            </p>
            <h1 className="display mt-3 text-[clamp(2.6rem,8.4vw,6.6rem)] leading-[0.92] text-ink">{tour.title}</h1>
          </div>
          <p className="max-w-xl text-lg leading-8 text-ink-soft lg:col-span-4 lg:pb-3">{tour.shortDescription}</p>
        </div>
      </header>

      <div className="container-page mt-10 md:mt-14">
        <figure className="relative">
          <div className="reveal-clip frame relative aspect-[4/3] bg-pine sm:aspect-[16/9] lg:aspect-[21/9]">
            <MediaImage src={cover.src} alt={cover.alt} sizes="(min-width: 1320px) 1240px, 100vw" priority />
          </div>
          <figcaption className={`meta mt-3 flex flex-wrap justify-between gap-2 text-[0.62rem] text-ink-soft ${second ? "md:max-w-[60%] lg:max-w-[68%]" : ""}`}>
            <span>Fig. 01 — {cover.alt}</span>
            <span>{coordinates}</span>
          </figcaption>
          {second ? (
            <div className="relative -mt-4 ml-auto hidden w-[34%] max-w-sm -translate-y-1/3 border-[10px] border-paper bg-paper md:block lg:absolute lg:-bottom-24 lg:right-10 lg:mt-0 lg:w-[24%] lg:translate-y-0">
              <div className="frame relative aspect-[4/5] bg-pine">
                <MediaImage src={second.src} alt={second.alt} sizes="(min-width: 1024px) 24vw, 34vw" />
              </div>
              <p className="meta mt-2 text-[0.58rem] text-ink-soft">Fig. 02</p>
            </div>
          ) : null}
        </figure>
      </div>

      <div className="container-page grid gap-14 pb-20 pt-12 md:pt-16 lg:grid-cols-12 lg:gap-10 lg:pt-32">
        {/* The ticket comes first in source order so phones reach the operator and link early. */}
        <aside className="lg:col-span-4 lg:col-start-9 lg:row-start-1" aria-label="Field sheet for this listing">
          <div className="lg:sticky lg:top-24">
            <div className="bg-pine p-5 text-paper md:p-6">
              <p className="meta flex justify-between gap-3 text-paper/70">
                <span>Ticket · {fieldNumber(position)}</span>
                <span>{tour.sample ? "Sample" : "Listing"}</span>
              </p>
              <p className="display mt-4 text-3xl leading-[1.02]">{tour.title}</p>
              <dl className="mt-6 grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
                <TicketRow label="Where">
                  {tour.destinationName}, {tour.countryName}
                </TicketRow>
                <TicketRow label="Length">{formatDuration(tour.durationDays)}</TicketRow>
                <TicketRow label="Path">
                  <Link href={`/experiences/${tour.categorySlug}`} className="link-line">
                    {tour.categoryName}
                  </Link>
                </TicketRow>
                <TicketRow label="Price">{price ?? "Not verified"}</TicketRow>
                <div className="col-span-2">
                  <dt className="field-label !text-paper/55">Coordinates</dt>
                  <dd className="mt-1 font-mono text-[0.78rem]">{coordinates}</dd>
                </div>
              </dl>
            </div>
            <div className="perforated bg-pine" aria-hidden="true" />
            <div className="border border-t-0 border-line bg-paper p-5 md:p-6">
              <p className="field-label">Listed by</p>
              <p className="mt-1 font-serif text-2xl leading-tight">{tour.operatorName}</p>
              {tour.operatorSample ? <p className="meta mt-1 text-clay">Sample operator</p> : null}
              <p className="mt-3 text-sm leading-6 text-ink-soft">{tour.operatorDescription}</p>
              <Link href={`/tours?operator=${tour.operatorId}`} className="meta link-line mt-4 inline-block text-ink">
                Other journeys from {tour.operatorName} <span aria-hidden="true" className="arrow text-clay">→</span>
              </Link>
              <div className="mt-6 border-t border-line pt-5">
                <KlnkCta url={tour.klnkUrl} title={tour.title} />
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0 lg:col-span-7 lg:row-start-1">
          <nav aria-label="On this sheet" className="hidden border-y border-line py-3 md:block">
            <ol className="meta flex flex-wrap gap-x-6 gap-y-2 text-ink-soft">
              {sections.map((section, index) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="link-line">
                    <span className="text-clay">§ {String(index + 1).padStart(2, "0")}</span> {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <Section id="journey" number={number("journey")} title="The journey">
            <p className="dropcap text-lg leading-8 text-ink md:text-xl md:leading-9">{tour.description}</p>
            {activityNames.length > 0 ? (
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Activities">
                {activityNames.map((name) => (
                  <li key={name} className="meta border border-line px-2.5 py-1.5 text-ink-soft">
                    {name}
                  </li>
                ))}
              </ul>
            ) : null}
          </Section>

          <Section id="highlights" number={number("highlights")} title="Highlights">
            <ol className="border-t border-line">
              {tour.highlights.map((highlight, index) => (
                <li key={highlight} className="grid grid-cols-[2.5rem_minmax(0,1fr)] gap-3 border-b border-line py-4">
                  <span className="meta pt-1 text-clay">{String(index + 1).padStart(2, "0")}</span>
                  <span className="leading-7 text-ink">{highlight}</span>
                </li>
              ))}
            </ol>
          </Section>

          {tour.itinerary ? (
            <Section id="route" number={number("route")} title="The route">
              <ol className="relative ml-1.5 border-l border-dashed border-clay/60">
                {tour.itinerary.map((day, index) => {
                  const [label, place] = splitDayTitle(day.title);
                  const last = index === tour.itinerary!.length - 1;
                  return (
                    <li key={day.title} className="relative pb-9 pl-8 last:pb-0">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-clay ${index === 0 || last ? "bg-clay" : "bg-paper"}`}
                      />
                      {label ? <p className="meta text-clay">{label}</p> : null}
                      <h3 className="mt-1 font-serif text-2xl leading-tight">{place}</h3>
                      <p className="mt-2 max-w-2xl leading-7 text-ink-soft">{day.detail}</p>
                    </li>
                  );
                })}
              </ol>
            </Section>
          ) : null}

          {tour.includedServices || tour.excludedServices ? (
            <Section id="kit" number={number("kit")} title="What is covered">
              <div className="grid gap-8 sm:grid-cols-2">
                {tour.includedServices ? (
                  <div>
                    <h3 className="meta border-b border-ink pb-2 text-ink">Included</h3>
                    <ul className="mt-2">
                      {tour.includedServices.map((item) => (
                        <li key={item} className="flex gap-3 border-b border-line py-3 text-sm leading-6 text-ink-soft">
                          <span aria-hidden="true" className="text-pine-mid">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {tour.excludedServices ? (
                  <div>
                    <h3 className="meta border-b border-ink pb-2 text-ink">Not included</h3>
                    <ul className="mt-2">
                      {tour.excludedServices.map((item) => (
                        <li key={item} className="flex gap-3 border-b border-line py-3 text-sm leading-6 text-ink-soft">
                          <span aria-hidden="true" className="text-clay">−</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            </Section>
          ) : null}

          {tour.importantInformation.length > 0 ? (
            <Section id="before" number={number("before")} title="Before you go">
              <ul className="space-y-4 border-l-2 border-clay pl-5">
                {tour.importantInformation.map((item) => (
                  <li key={item} className="leading-7 text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          <Section id="atlas" number={number("atlas")} title="On the atlas">
            <div className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_12rem] sm:items-end">
              <AtlasMap points={atlasPoints} active={tour.destinationSlug} className="w-full max-w-lg" />
              <div className="text-sm leading-6 text-ink-soft">
                <p className="meta text-ink">{coordinates}</p>
                <p className="mt-2">A reference point for {tour.destinationName}, not the exact start of the route.</p>
                <Link href={`/destinations/${tour.destinationSlug}`} className="meta link-line mt-3 inline-block text-ink">
                  More in {tour.destinationName} <span aria-hidden="true" className="arrow text-clay">→</span>
                </Link>
              </div>
            </div>
          </Section>

          {rest.length > 0 ? (
            <ul className="mt-14 grid gap-3 sm:grid-cols-2" aria-label="More photographs">
              {rest.map((image, index) => (
                <li key={image.src}>
                  <div className="frame relative aspect-[3/2] bg-paper-deep">
                    <MediaImage src={image.src} alt={image.alt} sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 100vw" />
                  </div>
                  <p className="meta mt-2 text-[0.58rem] text-ink-soft">Fig. {String(index + 3).padStart(2, "0")}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-line bg-paper-deep py-16 md:py-24" aria-labelledby="related-heading">
          <div className="container-page">
            <p className="meta text-ink-soft">
              <span className="text-clay">Onward</span> · From the same corner of the index
            </p>
            <h2 id="related-heading" className="display mt-3 text-[clamp(2.2rem,5vw,4rem)] leading-none">
              Nearby <span className="display-italic">journeys.</span>
            </h2>
            <ul className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
              {related.map((item) => (
                <li key={item.id}>
                  <TourCard tour={item} heading="h3" />
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}
    </article>
  );
}

function Section({
  id,
  number,
  title,
  children,
}: {
  id: string;
  number: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 pt-12 first-of-type:pt-10 md:pt-14">
      <p className="meta text-clay">§ {number}</p>
      <h2 id={`${id}-heading`} className="display mt-2 text-[clamp(2rem,4vw,3rem)] leading-none">
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function TicketRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <dt className="field-label !text-paper/55">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

import { Suspense } from "react";
import { TourFilterForm } from "@/components/tours/TourFilterForm";
import { TourGrid } from "@/components/tours/TourGrid";
import { PageIntro } from "@/components/ui/PageIntro";
import { pageMetadata } from "@/lib/seo";
import {
  getActivities,
  getCategories,
  getCountries,
  getDestinationGroups,
  getOperators,
  hasVerifiedPrices,
  queryTours,
} from "@/lib/catalog";
import Link from "next/link";
import type { TourQuery } from "@/data/types";
import { readAsk, type AskReading } from "@/lib/ask";
import { hasActiveQuery, oneParam, parseTourQuery, tourQueryHref } from "@/lib/filters";

export const metadata = pageMetadata({
  title: "Explore tours",
  description:
    "Search and filter adventure tours across India, Nepal, Bhutan, Sri Lanka, Pakistan and Bangladesh.",
  path: "/tours",
});

type ToursPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function ToursPage({ searchParams }: ToursPageProps) {
  return (
    <Suspense fallback={<ToursFallback />}>
      <ToursExplorer searchParams={searchParams} />
    </Suspense>
  );
}

async function ToursExplorer({ searchParams }: ToursPageProps) {
  const params = await searchParams;
  const explicit = parseTourQuery(params);
  const ask = oneParam(params.ask);
  const reading = ask ? readAsk(ask) : null;
  const query: TourQuery = reading ? { ...reading.query, ...definedOnly(explicit) } : explicit;
  const tours = queryTours(query);
  const groups = getDestinationGroups();

  return (
    <>
      <ToursIntro />
      <div className="container-page pb-24">
        {reading ? <AskReadout reading={reading} query={query} resultCount={tours.length} /> : null}
        <TourFilterForm
          query={query}
          queryKey={JSON.stringify(query)}
          resultCount={tours.length}
          countries={getCountries().map((country) => ({ value: country.slug, label: country.name }))}
          destinationGroups={groups.map((group) => ({
            countryName: group.country.name,
            destinations: group.destinations.map((destination) => ({
              value: destination.slug,
              label: destination.name,
            })),
          }))}
          categories={getCategories().map((category) => ({ value: category.slug, label: category.name }))}
          activities={getActivities().map((activity) => ({ value: activity.slug, label: activity.name }))}
          operators={getOperators().map((operator) => ({
            value: operator.id,
            label: operator.sample ? `${operator.name} (sample)` : operator.name,
          }))}
          showPriceFilter={hasVerifiedPrices()}
          hasActiveQuery={hasActiveQuery(query)}
        >
          <TourGrid tours={tours} />
        </TourFilterForm>
      </div>
    </>
  );
}

function definedOnly(query: TourQuery): TourQuery {
  return Object.fromEntries(Object.entries(query).filter(([, value]) => value !== undefined)) as TourQuery;
}

/** Shows how a described journey was read, with each term removable. */
function AskReadout({ reading, query, resultCount }: { reading: AskReading; query: TourQuery; resultCount: number }) {
  return (
    <section aria-label="How your description was read" className="mb-10 rounded-[1.4rem] bg-paper-deep p-5 md:p-7">
      <p className="meta text-ink-soft">
        <span className="text-clay">You asked</span> · read with simple word rules, no AI
      </p>
      <p className="display mt-2 text-[clamp(1.7rem,3.6vw,2.6rem)] leading-tight">“{reading.text}”</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="meta mr-1 text-ink-soft">Read as</span>
        {reading.terms.map((term) => {
          const rest = { ...query, [term.key]: undefined };
          return (
            <Link
              key={term.key}
              href={tourQueryHref(rest)}
              className="group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-paper px-3.5 py-1.5 text-sm text-ink transition hover:border-clay"
            >
              {term.label}
              <span aria-hidden="true" className="text-ink-soft group-hover:text-clay">
                ×
              </span>
              <span className="sr-only">(remove this filter)</span>
            </Link>
          );
        })}
      </div>
      {resultCount === 0 ? (
        <p className="mt-4 text-sm leading-6 text-ink-soft">
          Nothing matches all of that yet. Remove a term above to widen the search.
        </p>
      ) : null}
    </section>
  );
}

function ToursIntro() {
  return (
    <PageIntro
      number="03"
      kicker="The index · every journey"
      title={
        <>
          Every journey, <span className="display-italic">on one page.</span>
        </>
      }
      dek="Each listing is a separate journey from an independent operator. Narrow it by place, path or length, then open one to find the booking link kept for that tour alone."
    />
  );
}

function ToursFallback() {
  return (
    <>
      <ToursIntro />
      <div className="container-page pb-24">
        <p className="meta text-ink-soft">Opening the index…</p>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="aspect-[4/3] bg-paper-deep" />
          ))}
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, type ReactNode, useState } from "react";
import { durationOptions, sortOptions } from "@/lib/filters";
import type { TourQuery } from "@/data/types";

type Option = { value: string; label: string };

type DestinationGroup = {
  countryName: string;
  destinations: Option[];
};

type TourFilterFormProps = {
  query: TourQuery;
  queryKey: string;
  resultCount: number;
  countries: Option[];
  destinationGroups: DestinationGroup[];
  categories: Option[];
  activities: Option[];
  operators: Option[];
  showPriceFilter: boolean;
  hasActiveQuery: boolean;
  children: ReactNode;
};

const filterKeys = ["q", "country", "destination", "category", "activity", "duration", "operator", "price"] as const;

export function TourFilterForm({
  query,
  queryKey,
  resultCount,
  countries,
  destinationGroups,
  categories,
  activities,
  operators,
  showPriceFilter,
  hasActiveQuery,
  children,
}: TourFilterFormProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const activeCount = filterKeys.filter((key) => query[key]).length;

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const [key, value] of data.entries()) {
      if (typeof value === "string" && value.trim()) params.set(key, value.trim());
    }
    const qs = params.toString();
    setOpen(false);
    router.push(qs ? `/tours?${qs}` : "/tours");
  }

  return (
    <form
      key={queryKey}
      method="get"
      action="/tours"
      onSubmit={onSubmit}
      className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)] lg:gap-14"
    >
      <div className="lg:sticky lg:top-24 lg:self-start">
        <button
          type="button"
          className="flex w-full items-center justify-between border-y border-ink py-4 text-left lg:hidden"
          aria-expanded={open}
          aria-controls="tour-filters"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="meta">
            <span className="text-clay">Refine</span> · {activeCount === 0 ? "No filters" : activeCount === 1 ? "1 filter" : `${activeCount} filters`}
          </span>
          <span className="meta text-ink-soft">{open ? "Close −" : "Open +"}</span>
        </button>

        <fieldset id="tour-filters" className={`${open ? "block" : "hidden"} space-y-5 pt-6 lg:block lg:pt-0`}>
          <legend className="meta hidden w-full border-b border-ink pb-3 lg:block">
            <span className="text-clay">Refine</span> the index
          </legend>
          <label className="block">
            <span className="field-label">Search</span>
            <input className="field" type="search" name="q" defaultValue={query.q ?? ""} placeholder="Name, place or operator" />
          </label>
          <Select label="Country" name="country" value={query.country} options={countries} anyLabel="Any country" />
          <label className="block">
            <span className="field-label">Destination</span>
            <select className="field" name="destination" defaultValue={query.destination ?? ""}>
              <option value="">Any destination</option>
              {destinationGroups.map((group) => (
                <optgroup key={group.countryName} label={group.countryName}>
                  {group.destinations.map((destination) => (
                    <option key={destination.value} value={destination.value}>
                      {destination.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <Select label="Category" name="category" value={query.category} options={categories} anyLabel="Any category" />
          <Select label="Activity" name="activity" value={query.activity} options={activities} anyLabel="Any activity" />
          <Select
            label="Duration"
            name="duration"
            value={query.duration}
            options={durationOptions.map((option) => ({ value: option.value, label: option.label }))}
            anyLabel="Any length"
          />
          <Select label="Operator" name="operator" value={query.operator} options={operators} anyLabel="Any operator" />
          {showPriceFilter ? (
            <Select
              label="Price"
              name="price"
              value={query.price}
              options={[{ value: "verified", label: "Verified price listed" }]}
              anyLabel="Any"
            />
          ) : (
            <p className="border-l-2 border-sand pl-3 text-sm leading-6 text-ink-soft">
              Price filters stay hidden until a tour has a verified price. None do in this catalogue.
            </p>
          )}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 pt-2">
            <button type="submit" className="btn-primary">
              Show journeys <span aria-hidden="true" className="arrow">→</span>
            </button>
            {hasActiveQuery ? (
              <Link href="/tours" className="meta link-line text-ink">
                Clear filters
              </Link>
            ) : null}
          </div>
        </fieldset>
      </div>

      <div className="min-w-0">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-ink pb-3">
          <p className="flex items-baseline gap-3" aria-live="polite">
            <span className="display text-4xl leading-none md:text-5xl">{resultCount}</span>{" "}
            <span className="meta text-ink-soft">{resultCount === 1 ? "journey found" : "journeys found"}</span>
          </p>
          <label className="flex items-center gap-3">
            <span className="field-label">Sort</span>
            <select
              className="field w-auto py-1.5"
              name="sort"
              defaultValue={query.sort ?? "featured"}
              onChange={(event) => event.currentTarget.form?.requestSubmit()}
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        {children}
      </div>
    </form>
  );
}

function Select({
  label,
  name,
  value,
  options,
  anyLabel,
}: {
  label: string;
  name: string;
  value?: string;
  options: Option[];
  anyLabel: string;
}) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      <select className="field" name={name} defaultValue={value ?? ""}>
        <option value="">{anyLabel}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

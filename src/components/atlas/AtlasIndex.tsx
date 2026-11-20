"use client";

import Link from "next/link";
import { useState } from "react";
import { AtlasMap, type AtlasPoint } from "@/components/atlas/AtlasMap";
import { MediaImage } from "@/components/ui/MediaImage";
import type { Photo } from "@/data/types";

export type AtlasEntry = AtlasPoint & {
  countryName: string;
  coordinates: string;
  tourCount: number;
  image: Photo;
};

/**
 * The Explorer's Atlas. Hovering or focusing a row moves the photograph and
 * the marker on the grid. Every row is a plain link, so the index still
 * works as a list before (or without) hydration.
 */
export function AtlasIndex({ entries }: { entries: AtlasEntry[] }) {
  const [activeSlug, setActiveSlug] = useState(entries[0]?.slug);
  const active = entries.find((entry) => entry.slug === activeSlug) ?? entries[0];
  if (!active) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <figure className="frame relative hidden aspect-[4/5] bg-paper-deep lg:block">
            <div key={active.slug} className="atlas-photo absolute inset-0">
              <MediaImage src={active.image.src} alt={active.image.alt} sizes="(min-width: 1320px) 520px, 40vw" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-ink/75 to-transparent p-5 pt-16 text-paper">
              <span>
                <span className="meta block text-paper/70">{active.countryName}</span>
                <span className="mt-1 block font-serif text-3xl">{active.name}</span>
              </span>
              <span className="meta text-right text-paper/80">{active.coordinates}</span>
            </figcaption>
          </figure>
          <AtlasMap
            points={entries}
            active={active.slug}
            className="mx-auto mt-0 w-full max-w-[22rem] lg:mt-6 lg:max-w-none"
          />
        </div>
      </div>

      <ol className="border-t border-ink lg:col-span-7">
        {entries.map((entry, index) => {
          const isActive = entry.slug === active.slug;
          return (
            <li key={entry.slug} className="border-b border-line">
              <Link
                href={`/destinations/${entry.slug}`}
                onMouseEnter={() => setActiveSlug(entry.slug)}
                onFocus={() => setActiveSlug(entry.slug)}
                className="group grid grid-cols-[3.25rem_minmax(0,1fr)_auto] items-center gap-x-3 py-3.5 sm:grid-cols-[3.5rem_4rem_minmax(0,1fr)_auto] sm:gap-x-5 lg:grid-cols-[3.5rem_minmax(0,1fr)_auto_auto]"
              >
                <span className={`meta tabular-nums ${isActive ? "text-clay" : "text-ink-soft"}`}>
                  N° {String(index + 1).padStart(2, "0")}
                </span>
                <span className="relative hidden aspect-square overflow-hidden rounded-[0.8rem] bg-paper-deep sm:block lg:hidden">
                  <MediaImage src={entry.image.src} alt="" sizes="64px" />
                </span>
                <span className="min-w-0">
                  <span
                    className={`block truncate font-serif text-2xl leading-tight transition-all duration-300 sm:text-3xl lg:text-[2.1rem] ${
                      isActive ? "display-italic text-clay lg:translate-x-2" : "text-ink"
                    }`}
                  >
                    {entry.name}
                  </span>
                  <span className="meta mt-1 block text-ink-soft lg:hidden">
                    {entry.countryName} · {entry.coordinates}
                  </span>
                </span>
                <span className="meta hidden text-right text-ink-soft lg:block">
                  {entry.countryName}
                  <span className="block text-ink-soft/70">{entry.coordinates}</span>
                </span>
                <span className="meta whitespace-nowrap text-right text-ink">
                  {entry.tourCount === 1 ? "1 tour" : `${entry.tourCount} tours`}
                  <span aria-hidden="true" className="arrow ml-2 text-clay">
                    →
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

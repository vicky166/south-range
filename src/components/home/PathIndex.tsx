"use client";

import Link from "next/link";
import { useState } from "react";
import type { Photo } from "@/data/types";
import { MediaImage } from "@/components/ui/MediaImage";

export type PathEntry = {
  slug: string;
  name: string;
  summary: string;
  tourCount: number;
  image: Photo;
};

/**
 * Ways of travelling as a ruled index. On desktop the arched window beside
 * the list follows whichever row is hovered or focused; below 1024px each
 * row carries its own thumbnail and summary instead.
 */
export function PathIndex({ paths }: { paths: PathEntry[] }) {
  const [active, setActive] = useState(0);
  const current = paths[active];

  if (!current) return null;

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-28 max-w-[27rem]">
          <div className="arch-frame">
            <div className="arch relative aspect-[4/5] bg-pine">
              {paths.map((path, index) => (
                <div key={path.slug} className={`window-slide${index === active ? " is-active" : ""}`} aria-hidden="true">
                  <MediaImage src={path.image.src} alt="" sizes="(min-width: 1320px) 30rem, 38vw" className="window-zoom" />
                </div>
              ))}
            </div>
          </div>
          <p key={current.slug} className="swap-in mt-6 max-w-sm text-base leading-7 text-ink-soft">
            <span className="display-italic mr-2 text-2xl text-ink">{current.name}.</span>
            {current.summary}
          </p>
        </div>
      </div>

      <ul className="lg:col-span-7">
        {paths.map((path, index) => (
          <li key={path.slug} className="border-t border-line last:border-b">
            <Link
              href={`/experiences/${path.slug}`}
              onPointerEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              data-active={index === active ? "true" : undefined}
              className="group grid grid-cols-[3.25rem_minmax(0,1fr)_2.5rem] items-center gap-3 py-5 sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:py-6"
            >
              <span className="arch relative block aspect-[4/5] bg-sand/60 lg:hidden">
                <MediaImage src={path.image.src} alt="" sizes="72px" />
              </span>
              <span className="min-w-0">
                <span className="block font-serif text-[clamp(1.45rem,5.4vw,3.7rem)] leading-[0.98] text-ink transition duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] lg:group-data-[active=true]:translate-x-4 lg:group-data-[active=true]:italic lg:group-data-[active=true]:text-clay">
                  {path.name}
                </span>
                <span className="mt-2 line-clamp-2 text-sm leading-6 text-ink-soft lg:hidden">{path.summary}</span>
                <span className="meta mt-1.5 block text-ink-soft sm:hidden">
                  {path.tourCount === 1 ? "1 journey" : `${path.tourCount} journeys`}
                </span>
              </span>
              <span className="flex items-center gap-4">
                <span className="meta hidden whitespace-nowrap text-ink-soft sm:inline">
                  {path.tourCount === 1 ? "1 journey" : `${path.tourCount} journeys`}
                </span>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition duration-300 group-hover:border-clay group-hover:bg-clay group-hover:text-paper lg:group-data-[active=true]:border-clay lg:group-data-[active=true]:text-clay lg:group-data-[active=true]:group-hover:text-paper"
                >
                  <span className="arrow">→</span>
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

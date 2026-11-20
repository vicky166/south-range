"use client";

import Link from "next/link";
import { useState } from "react";
import type { Photo } from "@/data/types";
import { MediaImage } from "@/components/ui/MediaImage";

export type HeroPlace = {
  slug: string;
  name: string;
  countryName: string;
  coordinates: string;
  season?: string;
  tourCount: number;
  image: Photo;
};

/**
 * The hero's arched window. Places change when the progress line under the
 * active thumbnail finishes its CSS animation, so hovering or focusing the
 * window pauses it mid-way and reduced motion (no animation) leaves it still.
 */
export function HeroWindow({ places }: { places: HeroPlace[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const place = places[active];

  if (!place) return null;

  const advance = () => setActive((index) => (index + 1) % places.length);

  return (
    <div
      className="relative mx-auto w-full max-w-[22rem] sm:max-w-[25rem] lg:max-w-[26rem]"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="hero-window arch-frame relative">
        <Seal />
        <div className="arch relative aspect-[4/5] bg-pine lg:aspect-[3/4]">
          {places.map((item, index) => (
            <div key={item.slug} className={`window-slide${index === active ? " is-active" : ""}`} aria-hidden={index !== active}>
              <MediaImage
                src={item.image.src}
                alt={item.image.alt}
                sizes="(min-width: 1024px) 26rem, (min-width: 640px) 25rem, 90vw"
                priority={index === 0}
                className="window-zoom"
              />
            </div>
          ))}
          <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink/45 to-transparent" />
        </div>

        <div key={place.slug} className="tag swap-in absolute -bottom-6 left-3 right-3 z-10 sm:-bottom-7 sm:left-auto sm:-right-6 sm:w-[min(15.5rem,78%)] lg:-right-8">
          <p className="meta truncate text-ink-soft">
            {place.countryName} · {place.coordinates}
          </p>
          <p className="mt-1.5 font-serif text-[1.7rem] leading-none text-ink sm:text-[1.9rem]">{place.name}</p>
          <p className="mt-3 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-t border-dashed border-ink/20 pt-2.5 text-xs text-ink-soft">
            {place.season ? <span>Best {place.season}</span> : <span>Open the place</span>}
            <Link href={`/destinations/${place.slug}`} className="group meta shrink-0 text-clay">
              <span className="link-line">{place.tourCount === 1 ? "1 journey" : `${place.tourCount} journeys`}</span>{" "}
              <span aria-hidden="true" className="arrow">
                →
              </span>
            </Link>
          </p>
        </div>
      </div>

      <div role="group" aria-label="Choose a place to look at" className="mt-12">
        <div className="flex items-center gap-2 sm:gap-2.5">
          {places.map((item, index) => {
            const current = index === active;
            return (
              <button
                key={item.slug}
                type="button"
                aria-pressed={current}
                aria-label={`Show ${item.name}, ${item.countryName}`}
                onClick={() => setActive(index)}
                className={`relative h-9 w-9 shrink-0 overflow-hidden rounded-full ring-offset-2 ring-offset-paper transition duration-300 sm:h-10 sm:w-10 ${
                  current ? "ring-2 ring-clay" : "opacity-70 ring-1 ring-ink/15 hover:opacity-100"
                }`}
              >
                <MediaImage src={item.image.src} alt="" sizes="40px" />
              </button>
            );
          })}
          <span aria-hidden="true" className="ml-2 hidden h-px min-w-[2.5rem] flex-1 overflow-hidden bg-ink/15 sm:block">
            {places.length > 1 ? (
              <span
                key={`desk-${active}`}
                className="window-progress block h-full bg-clay"
                data-paused={paused ? "true" : undefined}
                onAnimationEnd={advance}
              />
            ) : null}
          </span>
        </div>
        {places.length > 1 ? (
          <span aria-hidden="true" className="mt-3 block h-px overflow-hidden bg-ink/15 sm:hidden">
            <span
              key={`mob-${active}`}
              className="window-progress block h-full bg-clay"
              data-paused={paused ? "true" : undefined}
              onAnimationEnd={advance}
            />
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** A rotating seal carrying the hero's small line. Decorative; the line also appears as text. */
function Seal() {
  return (
    <span
      aria-hidden="true"
      className="seal absolute left-2 top-[12%] z-10 block h-[4.75rem] w-[4.75rem] sm:-left-10 sm:top-[14%] sm:h-28 sm:w-28 lg:-left-14 lg:h-32 lg:w-32"
    >
      <svg viewBox="0 0 120 120" className="seal-ring h-full w-full">
        <defs>
          <path id="seal-circle" d="M60 60m-45 0a45 45 0 1 1 90 0a45 45 0 1 1-90 0" />
        </defs>
        <circle cx="60" cy="60" r="59" fill="var(--color-clay)" />
        <circle cx="60" cy="60" r="53.5" fill="none" stroke="#f6e7da" strokeOpacity="0.35" strokeWidth="0.8" />
        <text fill="#f6e7da" fontSize="7.4" letterSpacing="1.6" style={{ fontFamily: "var(--font-mono)" }}>
          <textPath href="#seal-circle" textLength="280" lengthAdjust="spacing">
            THE WORLD IS BIGGER THAN YOUR ITINERARY ·
          </textPath>
        </text>
      </svg>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
        <path d="M60 36 64 56 84 60 64 64 60 84 56 64 36 60 56 56Z" fill="#f6e7da" />
        <circle cx="60" cy="60" r="2.4" fill="var(--color-clay)" />
      </svg>
    </span>
  );
}

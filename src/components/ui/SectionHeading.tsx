import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Chapter opener used on the homepage: index number, kicker, oversized title.
 * The number system (N° 01, N° 02 …) runs through every chapter of the site.
 */
export function SectionHeading({
  id,
  number,
  kicker,
  title,
  dek,
  action,
  tone = "light",
}: {
  id: string;
  number: string;
  kicker: string;
  title: ReactNode;
  dek?: string;
  action?: { href: string; label: string };
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className={`grid gap-6 border-t pt-5 lg:grid-cols-12 ${dark ? "border-paper/25" : "border-ink"}`}>
      <p className={`meta flex gap-3 lg:col-span-3 ${dark ? "text-paper/60" : "text-ink-soft"}`}>
        <span className={dark ? "text-[#e08a62]" : "text-clay"}>N° {number}</span>
        <span>{kicker}</span>
      </p>
      <div className="lg:col-span-9">
        <h2
          id={id}
          className={`display text-[clamp(2.6rem,7vw,5.6rem)] leading-[0.92] ${dark ? "text-paper" : "text-ink"}`}
        >
          {title}
        </h2>
        {dek || action ? (
          <div className="mt-6 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            {dek ? (
              <p className={`max-w-xl text-lg leading-8 ${dark ? "text-paper/75" : "text-ink-soft"}`}>{dek}</p>
            ) : null}
            {action ? (
              <Link
                href={action.href}
                className={`meta flex shrink-0 items-center gap-2 ${dark ? "text-paper" : "text-ink"}`}
              >
                <span className="link-line">{action.label}</span>
                <span aria-hidden="true" className="arrow text-clay">
                  →
                </span>
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

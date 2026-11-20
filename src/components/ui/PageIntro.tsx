import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";

/**
 * Opener for inner pages. Title sits left and large; the supporting text
 * drops to the right columns so the page starts asymmetrically.
 */
export function PageIntro({
  number,
  kicker,
  title,
  dek,
  aside,
  crumbs,
  children,
}: {
  number: string;
  kicker: string;
  title: ReactNode;
  dek?: ReactNode;
  aside?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <header className="container-page pb-10 pt-8 md:pb-14 md:pt-12">
      {crumbs ? <Breadcrumbs items={crumbs} /> : null}
      <div className={`flex flex-wrap items-baseline justify-between gap-3 border-t border-ink pt-4 ${crumbs ? "mt-6" : ""}`}>
        <p className="meta flex gap-3 text-ink-soft">
          <span className="text-clay">N° {number}</span>
          <span>{kicker}</span>
        </p>
        {aside ? <div className="meta text-ink-soft">{aside}</div> : null}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:items-end">
        <h1 className="display text-[clamp(2.9rem,10vw,7.4rem)] leading-[0.9] text-ink lg:col-span-8">{title}</h1>
        {dek ? (
          <div className="max-w-xl text-lg leading-8 text-ink-soft lg:col-span-4 lg:pb-3">{dek}</div>
        ) : null}
      </div>
      {children}
    </header>
  );
}

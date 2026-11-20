import Link from "next/link";
import type { ReactNode } from "react";
import { primaryNav } from "@/config/navigation";
import { site } from "@/config/site";
import { catalogueHasSampleContent, getCountries } from "@/lib/catalog";

export function SiteFooter() {
  const countries = getCountries();

  return (
    <footer className="overflow-hidden bg-pine text-paper">
      <div className="container-page grid gap-12 pb-10 pt-16 md:grid-cols-12 md:pt-20">
        <div className="md:col-span-4">
          <p className="meta text-paper/50">N° ∞ · The index</p>
          <p className="mt-4 max-w-xs font-serif text-2xl leading-snug">
            A directory of journeys across South Asia, from independent operators, each with its own booking link.
          </p>
        </div>
        <FooterList title="Explore" className="md:col-span-2 md:col-start-6">
          {primaryNav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="link-line">
                {item.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="link-line">
              Contact
            </Link>
          </li>
        </FooterList>
        <FooterList title="Countries" className="md:col-span-2">
          {countries.map((country) => (
            <li key={country.slug}>
              <Link href={`/tours?country=${country.slug}`} className="link-line">
                {country.name}
              </Link>
            </li>
          ))}
        </FooterList>
        <FooterList title="Legal" className="md:col-span-2">
          <li>
            <Link href="/privacy" className="link-line">
              Privacy
            </Link>
          </li>
          <li>
            <Link href="/terms" className="link-line">
              Terms
            </Link>
          </li>
          <li>
            <a href={`mailto:${site.email}`} className="link-line break-all">
              {site.email}
            </a>
          </li>
        </FooterList>
      </div>

      <div className="container-page" aria-hidden="true">
        <p className="display select-none whitespace-nowrap text-[17.5vw] leading-[0.78] text-paper/[0.09] md:text-[15.5vw] xl:text-[13.4rem]">
          South<span className="display-italic">Range</span>
        </p>
      </div>

      <div className="border-t border-paper/10">
        <div className="container-page flex flex-col gap-2 py-5 md:flex-row md:items-center md:justify-between">
          <p className="meta text-paper/50">04°N – 38°N · 66°E – 94°E</p>
          <p className="max-w-2xl text-xs leading-5 text-paper/60">
            {catalogueHasSampleContent()
              ? "This is a sample catalogue: operators, tours and KLNK links marked “Sample” are placeholders, not live bookings. "
              : null}
            South Range does not sell tours or take payment. A booking button leaves this site for the KLNK address stored on that tour.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterList({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <p className="meta text-paper/50">{title}</p>
      <ul className="mt-4 space-y-1 text-sm text-paper/90 [&>li>a]:inline-block [&>li>a]:py-1.5">{children}</ul>
    </div>
  );
}

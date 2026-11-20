import Link from "next/link";
import { Suspense } from "react";
import { HeaderNav, NavLinks } from "@/components/layout/HeaderNav";
import { MobileMenu } from "@/components/layout/MobileMenu";

export function Wordmark({ tone = "ink" }: { tone?: "ink" | "paper" }) {
  return (
    <span className={`font-serif text-[1.65rem] leading-none tracking-[-0.02em] ${tone === "paper" ? "text-paper" : "text-ink"}`}>
      South<span className="display-italic text-clay">Range</span>
    </span>
  );
}

/** A compass needle that swings round to point the way on hover. */
export function CompassNeedle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d="M12 3 15 12H9Z" fill="currentColor" />
      <path d="M12 21 15 12H9Z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header relative sticky top-0 z-40">
      <div className="container-page flex h-16 min-w-0 items-center justify-between gap-4 md:h-[4.5rem] md:gap-6 lg:grid lg:grid-cols-[1fr_auto_1fr]">
        <Link href="/" aria-label="South Range, home" className="shrink-0 justify-self-start">
          <Wordmark />
        </Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <Suspense fallback={<NavLinks />}>
            <HeaderNav />
          </Suspense>
        </nav>
        <div className="flex shrink-0 items-center gap-1 justify-self-end">
          <Link href="/tours" className="group hidden items-center gap-3 py-2 pl-2 text-sm font-semibold text-ink sm:inline-flex">
            <span className="link-line">Find a journey</span>
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/20 transition duration-300 group-hover:border-clay group-hover:bg-clay group-hover:text-paper">
              <CompassNeedle className="h-4 w-4 rotate-45 transition-transform duration-500 ease-[cubic-bezier(0.3,1.4,0.5,1)] group-hover:rotate-90" />
            </span>
          </Link>
          <Suspense
            fallback={
              <details className="lg:hidden">
                <summary className="meta cursor-pointer px-3 py-3 text-ink">Menu</summary>
              </details>
            }
          >
            <MobileMenu />
          </Suspense>
        </div>
      </div>
      <span aria-hidden="true" className="trail-progress" />
    </header>
  );
}

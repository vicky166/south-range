"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CSSProperties } from "react";
import { primaryNav } from "@/config/navigation";

const items = [...primaryNav, { href: "/contact", label: "Contact" }];

export function MobileMenu() {
  const pathname = usePathname();

  return (
    <details key={pathname} className="group lg:hidden">
      <summary className="meta flex cursor-pointer items-center gap-2 rounded-full px-3 py-3 text-ink transition hover:bg-ink/5">
        <span className="group-open:hidden">Menu</span>
        <span className="hidden group-open:inline">Close</span>
        <span aria-hidden="true" className="flex w-4 flex-col gap-[3px]">
          <span className="h-px bg-ink transition-transform group-open:translate-y-[2px] group-open:rotate-45" />
          <span className="h-px bg-ink transition-transform group-open:-translate-y-[2px] group-open:-rotate-45" />
        </span>
      </summary>
      <nav
        aria-label="Mobile"
        className="absolute inset-x-0 top-full z-50 max-h-[calc(100svh-4rem)] overflow-y-auto border-b border-ink/10 bg-paper shadow-[0_30px_50px_-30px_rgba(28,27,24,0.45)]"
      >
        <ul className="container-page pt-2">
          {items.map((item, index) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <li key={item.href} className="menu-item border-b border-line" style={{ "--i": index } as CSSProperties}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className="group/item flex items-center justify-between gap-4 py-4"
                >
                  <span className={`font-serif text-[2.1rem] leading-none ${active ? "italic text-clay" : "text-ink"}`}>{item.label}</span>
                  <span aria-hidden="true" className="arrow text-clay">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="container-page pb-8 pt-6">
          <Link href="/tours" className="btn-primary w-full">
            Find a journey <span aria-hidden="true" className="arrow">→</span>
          </Link>
        </div>
      </nav>
    </details>
  );
}

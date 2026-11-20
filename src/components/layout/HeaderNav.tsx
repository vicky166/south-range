"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { primaryNav } from "@/config/navigation";

export function HeaderNav() {
  const pathname = usePathname();
  return <NavLinks current={pathname} />;
}

export function NavLinks({ current }: { current?: string }) {
  return (
    <ul className="flex items-center gap-7 xl:gap-10">
      {primaryNav.map((item) => {
        const active = current ? current === item.href || current.startsWith(`${item.href}/`) : false;
        return (
          <li key={item.href}>
            <Link href={item.href} aria-current={active ? "page" : undefined} className="nav-link">
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

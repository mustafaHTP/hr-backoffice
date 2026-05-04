"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        isActive
          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
          : "text-zinc-300 hover:bg-white/10"
      }`}
    >
      {label}
    </Link>
  );
}

"use client";

import { IconKey, iconMap } from "@/config/route-access";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  label: string;
  icon?: IconKey;
}

export function NavItem({ href, label, icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const Icon = icon ? iconMap[icon] : null;

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
        isActive
          ? "bg-violet-600 text-white shadow-lg shadow-violet-500/20"
          : "text-zinc-300 hover:bg-white/10"
      }`}
    >
      {Icon && <Icon size={16} />}

      <span>{label}</span>
    </Link>
  );
}

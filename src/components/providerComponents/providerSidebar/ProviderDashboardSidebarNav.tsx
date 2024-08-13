"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import { Dispatch, SetStateAction } from "react";

interface DashboardNavProps {
  items: NavItem[];
  setOpen?: Dispatch<SetStateAction<boolean>>;
  isMobileNav?: boolean;
}

export function ProviderDashboardSidebarNav({
  items,
  setOpen,
  isMobileNav = false,
}: DashboardNavProps) {
  const path = usePathname();

  if (!items?.length) {
    return null;
  }

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => {
        const Icon = Icons[item.icon] || SpaceDashboardIcon;
        const isActive = (itemHref: string) => {
          if (itemHref === "/provider/dashboard-provider") {
            return path === itemHref;
          }
          return path.startsWith(itemHref);
        };
        return (
          item.href && (
            <Link
              key={index}
              href={item.href}
              onClick={() => {
                if (setOpen) setOpen(false);
              }}
            >
              <span
                className={cn(
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                  isActive(item.href) ? "bg-accent" : "transparent"
                )}
              >
                <Icon
                  className="mr-2 h-4 w-4"
                  style={{ width: "16px", height: "16px" }}
                />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        );
      })}
    </nav>
  );
}

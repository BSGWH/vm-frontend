"use client";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { useTheme } from "next-themes";
import { LogicAutoLogo } from "@/components/logo/LALogoForBright";
import { LALogo } from "@/components/logo/LALogoForDark";
import { UserDashBoardMobileSidebar } from "./UserDashboardMobileSidebar";

export default function Header() {
  const { theme } = useTheme();
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/"} className="w-40 text-xl flex">
            {theme === "dark" ? <LALogo /> : <LogicAutoLogo />}
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <UserDashBoardMobileSidebar />
        </div>
        <div className="block lg:hidden">
          <Link href={"/"} className="w-40 text-xl flex">
            {theme === "dark" ? <LALogo /> : <LogicAutoLogo />}
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle className={undefined} />
        </div>
      </nav>
    </div>
  );
}

"use client";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Logo } from "../../logo/Logo";

export default function Header() {
  const { theme } = useTheme();
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/"} className="w-40 text-xl flex">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}

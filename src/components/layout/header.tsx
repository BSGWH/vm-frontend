"use client";
// import { MobileSidebar } from "./mobile-sidebar";
// import { UserNav } from "./user-nav";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export default function Header() {
  const { theme } = useTheme();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/"}>
            <img
              src={
                theme === "dark"
                  ? "/logos/oneRowWhite.png"
                  : "/logos/oneRowBlack.png"
              }
              alt="Logo"
              className="w-40 h-auto object-cover"
            />
          </Link>
        </div>
        {/* <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div> */}

        <div className="flex items-center gap-2">
          {/* <UserNav /> */}
          <Button asChild>
            <Link href={"/signin"}>Dashoboard</Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}

"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/provider/nav/theme-toggle";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/logo/Logo";
import { ProviderAvatar } from "./ProviderAvatar";
import { ProviderMobileSidebar } from "../providerSidebar/ProviderMobileSidebar";

export default function ProviderDashboardHeader() {

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/"} className="w-40 text-xl flex">
            <Logo />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <ProviderMobileSidebar />
        </div>
        <div className="block lg:hidden">
          <Link href={"/"} className="w-40 text-xl flex">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ProviderAvatar />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}


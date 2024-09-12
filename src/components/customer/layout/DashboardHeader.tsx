"use client";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { UserNav } from "./user-nav";
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/logo/Logo";
import { UserDashBoardMobileSidebar } from "./UserDashboardMobileSidebar";

export default function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={"/"} className="w-40 text-xl flex">
            <Logo />
          </Link>
        </div>
        <div className={cn("block lg:!hidden")}>
          <UserDashBoardMobileSidebar />
        </div>
        <div className="block lg:hidden">
          <Link href={"/"} className="w-40 text-xl flex">
            <Logo />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Button variant={"customerDefault"}><Link href="/customer/book/select-vehicle" >New Service</Link></Button>
          <UserNav />
          <ThemeToggle/>
        </div>
      </nav>
    </div>
  );
}


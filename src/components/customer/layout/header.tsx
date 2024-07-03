"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "../../logo/Logo";

export default function Header() {

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <Link href={"/"} className="w-40 text-xl flex">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <Button variant="link" asChild>
            <Link href={"/provider"}>I'm a Provider </Link>
          </Button>
          <Button variant="customerDefault" asChild>
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
          <Button variant="customerOutline" asChild>
            <Link href={"/signin"}>Sign In</Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}

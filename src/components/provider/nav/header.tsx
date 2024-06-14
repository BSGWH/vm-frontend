"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/provider/nav/theme-toggle";
import { Button } from "@/components/ui/button";
// import { useTheme } from "next-themes";
import { Logo } from "@/components/logo/Logo";

export default function Header() {
  // const { theme } = useTheme();

  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <Link href={"/"} className="w-40 text-xl flex">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <Button asChild variant="link">
            <Link href={"/"}>I'm a Customer</Link>
          </Button>
          <Button variant="providerDefault" asChild>
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
          <Button variant="providerOutline" asChild>
            <Link href={"/login"}>Log In</Link>
          </Button>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}

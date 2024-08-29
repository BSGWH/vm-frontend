"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "../../logo/Logo";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { buttonVariants } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [iconColor, setIconColor] = useState("#000000");

  return (
    <div className="fixed top-0 left-0 right-0 bg-background border-b z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <Link href={"/"} className="w-40 text-xl flex">
          <Logo />
        </Link>

        <div className="hidden sm:flex w-full items-center gap-2 justify-end">
          <Button variant="link" asChild>
            <Link href={"/provider"}>Become a Provider </Link>
          </Button>
          <Button variant="customerDefault" asChild>
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
          <Button variant="customerOutline" asChild>
            <Link href={"/signin"}>Sign In</Link>
          </Button>
          <ThemeToggle/>
        </div>
        <div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex items-center p-4"
          >
            <MenuIcon className="text-gray-500" />
          </button>
        </div>

        <div
          className={`fixed top-0 right-0 w-full h-screen z-30 bg-white dark:bg-gray-900 transform transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex justify-end p-4 pb-0">
            <button onClick={() => setMenuOpen(false)}>
              <CloseIcon className="text-gray-500" />
            </button>
          </div>
          <div className="flex flex-col items-center pt-4 px-4 gap-2">
            <Button variant="link" asChild>
              <Link href={"/signup"}>Sign Up</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href={"/signin"}>Sign In</Link>
            </Button>
            <Button variant="link" asChild>
              <Link href={"/provider"}>I'm a Provider </Link>
            </Button>
            <ThemeToggle/>
            <hr className="w-11/12 mx-auto my-4" />
          </div>
          <div className="flex flex-row justify-center p-4">
            <a
              key={"X icon"}
              href={"https://twitter.com/vehicle_manager"}
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">{"X icon"}</span>
              <XIcon style={{ color: iconColor }} />
            </a>
            <a
              key={"Linkedin icon"}
              href={"https://www.linkedin.com/company/vehiclemanager/"}
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">{"Linkedin icon"}</span>
              <LinkedInIcon style={{ color: iconColor, fontSize: 30 }} />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

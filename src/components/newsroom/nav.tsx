"use client";
import Link from "next/link";
import { ThemeToggle } from "@/components/newsroom/theme-toggle";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo/Logo";
import { useState, useEffect } from "react";
import { useTheme } from 'next-themes';
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { buttonVariants } from "@/components/ui/button";

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { theme, setTheme } = useTheme();
  const [iconColor, setIconColor] = useState("#000000");

  useEffect(() => {
    // Set initial icon color based on theme
    setIconColor(theme === "dark" ? "#FFFFFF" : "#000000");
  }, [theme]);

  return (
    <div className="fixed top-0 left-0 right-0 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between">
        <Link href={"/newsroom"} className="w-40 text-xl flex">
          <Logo />
          <span className="pt-7 text-gray-800 dark:text-gray-200 font-semibold">
            Newsroom
          </span>
        </Link>

        <div className="relative flex items-center w-full justify-end ">
          {!searchOpen && (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="newsroomNav" className="p-2 text-base" asChild>
                <Link href={"/signin"}>Sign In</Link>
              </Button>
              <Button
                variant="newsroomNav"
                onClick={() => setSearchOpen(true)}
                className="flex items-center p-2 text-base"
              >
                <SearchIcon />
                Search
              </Button>
              <ThemeToggle />
            </div>
          )}
          <div
            className={`absolute right-0 flex items-center justify-end p-4 z-10 w-full max-w-lg transition-transform duration-500 ease-in-out ${
              searchOpen ? "scale-x-100" : "scale-x-0 invisible"
            }`}
            style={{ transformOrigin: "right" }}
          >
            <input
              type="text"
              className="border rounded-full py-1 pl-4 w-96 transition-all duration-300 ease-in-out"
              placeholder="What are you looking for?"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="ml-2 flex items-center pl-2"
            >
              <CloseIcon className="text-gray-500" />
            </button>
          </div>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="sm:hidden flex items-center p-4"
          >
            <MenuIcon className="text-gray-500" />
          </button>
        </div>
      </nav>

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
        <div className="flex flex-col items-center pt-4 px-4">
          <div className="flex flex-row w-full justify-center my-2 relative">
            <SearchIcon className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              className="border rounded-sm h-10 pl-10 mx-4 w-full max-w-lg"
              placeholder="What are you looking for?"
            />
          </div>
          <Button variant="newsroomNav" className="py-6 text-base" asChild>
            <Link href={"/signin"}>Sign In</Link>
          </Button>
          <ThemeToggle/>
        </div>
        <hr className="w-11/12 mx-auto my-4" />
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
            <XIcon style={{ color: iconColor }}/>
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
            <LinkedInIcon style={{ color: iconColor, fontSize: 30}}/>
          </a>
        </div>
      </div>
    </div>
  );
}

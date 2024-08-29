"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    console.log(`Switching theme to: ${newTheme}`);
    setTheme(newTheme);
  };

  return (
    <Button
      variant="outline"
      size="icon"
      className="focus-visible:outline-none focus-visible:ring-0 rounded-full p-0 inline-flex items-center justify-center relative border-primaryCustomer"
      onClick={changeTheme}
    >
      <Sun className={`h-[1.2rem] w-[1.2rem] transition-transform duration-500 ease-in-out transform ${theme === "dark" ? "rotate-90 scale-0" : "rotate-0 scale-100"}`} />
      <Moon className={`absolute h-[1.2rem] w-[1.2rem] transition-transform duration-500 ease-in-out transform ${theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"}`} />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}


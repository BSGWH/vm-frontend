"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  // make sure overflow is auto so that the scrollbar won't disappear
  React.useEffect(() => {
    const handleOverflow = () => {
      document.documentElement.style.overflowY = "auto";
      document.documentElement.style.overflowX = "auto";
    };

    handleOverflow();
    window.addEventListener("resize", handleOverflow);

    return () => {
      window.removeEventListener("resize", handleOverflow);
    };
  }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

"use client"
import { Button, buttonVariants } from "@/components/ui/button";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  return (
    <section className="container flex items-center justify-center py-20 md:py-32 min-h-screen">
      <div className="flex flex-col items-center space-y-6 text-center">
        <main className="text-3xl md:text-7xl font-bold">
          <h1 className="inline leading-relaxed text-black dark:text-white">
            Join Logic Auto
            <br />
            As a <span className="static-provider text-primaryProvider">Provider</span>
          </h1>
        </main>

        <p
          className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto"
          style={{ marginTop: "0rem" }}
        >
          Gain customers and grow your business
        </p>

        <div className="flex space-x-4">
          <Button
            variant="providerDefault"
            className="w-full md:w-auto px-6 py-3 min-w-[200px]"
          >
            <Link href={"/provider/signup"}>Get Started</Link>
          </Button>
        </div>

        <div className="w-1/2 shadow-lg">
          <img
            src= { isDarkMode ? "/images/provider-dashboard-dark.png" : "/images/provider-dashboard.jpg"}
            alt="Provider Dashboard"
            className="w-full mt-4"
          />
        </div>
      </div>
    </section>
  );
};

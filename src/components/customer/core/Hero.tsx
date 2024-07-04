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
          <h1 className="inline from-primary/60 to-primary leading-relaxed">
            Auto Service
            <br />
            Made <span className="text-primaryCustomer">Simple</span>
          </h1>
        </main>

        <p
          className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto"
          style={{ marginTop: "0rem" }}
        >
          The All in One Platform for Managing Vehicles & Fleets.
        </p>

        <div className="flex space-x-4">
          <Button variant="customerDefault" className="w-full md:w-auto px-6 py-4 min-w-[200px]">
            <Link href={"/signup"}>Get Started</Link>
          </Button>
        </div>

        <div className="w-1/2 shadow-lg">
          <img
            src= { isDarkMode ? "/images/customer-dashboard-dark.png" : "/images/customer-dashboard.png"}
            alt="Customer Dashboard"
            className="w-full mt-4"
          />
        </div>
      </div>
    </section>
  );
};

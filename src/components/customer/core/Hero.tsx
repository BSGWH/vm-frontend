"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const texts = ["Auto Service", "Oil Changes", "Inspections", "Maintenance", "Vehicle Care"];
  const [currentTexts, setCurrentTexts] = useState(texts);
  const textsRef = useRef(currentTexts);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    textsRef.current = currentTexts;
  }, [currentTexts]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const handleAnim = useCallback(() => {
    if (!wrapperRef.current) return;

    wrapperRef.current.style.transition = '0.5s';
    wrapperRef.current.style.top = '-1.2em';

    setTimeout(() => {
      const copyTexts = [...textsRef.current];
      const firstElem = copyTexts.shift();
      if (firstElem !== undefined) {
        copyTexts.push(firstElem);
      }

      requestAnimationFrame(() => {
        setCurrentTexts(copyTexts);

        requestAnimationFrame(() => {
          if (wrapperRef.current) {
            wrapperRef.current.style.transition = 'none';
            wrapperRef.current.style.top = '0px';
          }
        });
      });
    }, 500);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleAnim();
    }, 2000);
    return () => clearInterval(interval);
  }, [handleAnim]);

  return (
    <section className="container flex items-start justify-start py-16 md:pt-36 md:pb-24">
      <div className="items-center space-y-6 text-center flex flex-wrap flex-col md:flex-row">
        <div className="md:w-1/2 p-8 pt-16">
          <main className="text-4xl sm:text-5xl lg:text-7xl font-bold">
            <h1 className="inline from-primary/60 to-primary leading-tight">
              <div className="text-container-word">
                <div ref={wrapperRef} className="text-container-word-wrapper">
                  {currentTexts.map((text, index) => (
                    <span key={index} className="text-word">{text}</span>
                  ))}
                </div>
              </div>
              <br />
              <span style={{ whiteSpace: "nowrap" }}>Made <span className="text-primaryCustomer">Simple</span></span>
            </h1>
          </main>

          <p
            className="text-sm md:text-lg text-muted-foreground max-w-2xl mx-auto"
            style={{ marginTop: "1rem" }}
          >
            The Easiest Way to Service Your Vehicles.
          </p>

          <Button
            variant="customerDefault"
            className="w-1/3 px-6 py-4 mt-6 lg:my-4 min-w-[150px]"
          >
            <Link href={"/signup"}>Get Started</Link>
          </Button>
        </div>

        <div className="w-5/6 md:w-1/2 shadow-xl">
          <img
            src={
              isDarkMode
                ? "/images/customer-dashboard-dark.png"
                : "/images/customer-dashboard.png"
            }
            alt="Customer Dashboard"
            className="w-full md:mt-4"
          />
        </div>
      </div>
    </section>
  );
};

const styles = `
  .text-container-word {
    position: relative;
    width: auto;
    height: 1.2em;
    overflow: hidden;
    display: inline-block;
    margin-top: -0.5em;
    will-change: top;
  }
  .text-container-word-wrapper {
    position: relative;
    top: 0;
  }
  .text-word {
    display: block;
    line-height: 1.2em;
    font-size: inherit;
    font-weight: bold;
    white-space: nowrap;
  }
`;

export default Hero;

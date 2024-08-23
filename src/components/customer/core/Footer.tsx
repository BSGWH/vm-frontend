"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Logo } from "../../logo/Logo";
import { buttonVariants } from "@/components/ui/button";

interface CommunityProps {
  name: string;
  link: string;
  icon: JSX.Element;
}

export const Footer = () => {
  const { theme, setTheme } = useTheme();
  const [iconColor, setIconColor] = useState("#000000");

  useEffect(() => {
    // Set initial icon color based on theme
    setIconColor(theme === "dark" ? "#FFFFFF" : "#000000");
  }, [theme]);

  const communities: CommunityProps[] = [
    {
      name: "X icon",
      link: "https://twitter.com/vehicle_manager",
      icon: <XIcon style={{ color: iconColor }} />,
    },
    {
      name: "Linkedin icon",
      link: "https://www.linkedin.com/company/vehiclemanager/",
      icon: (
        <LinkedInIcon
          style={{
            fontSize: 30,
            color: iconColor,
          }}
        />
      ),
    },
  ];

  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="py-10 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl flex flex-row sm:flex-row justify-center items-stretch sm:gap-8">
          {/* Left Column: Logo and Community */}
          <div className="w-1/3 flex flex-col items-center sm:items-end justify-center pr-6 sm:pr-8">
            <a href="/" className="font-bold text-xl">
              <Logo />
            </a>
            <div className="flex flex-row items-center sm:hidden">
              {communities.map(({ name, link, icon }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  <span className="sr-only">{name}</span>
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* About */}
          <div className="w-2/5 sm:w-1/5 flex flex-col gap-2 items-start text-left text-sm sm:text-base border-l-2 pl-6 sm:pl-8 pt-6 sm:pt-0">
            <h3 className="font-bold text-lg sm:text-xl">About</h3>
            <a href="#features" className="opacity-60 hover:opacity-100 ">
              Features
            </a>
            <a href="#pricing" className="opacity-60 hover:opacity-100">
              Pricing
            </a>
            <a href="/legal/terms-and-conditions" className="opacity-60 hover:opacity-100">
              Terms & Conditions
            </a>
            <a href="/legal/privacy-policy" className="opacity-60 hover:opacity-100">
              Privacy Policy
            </a>
          </div>

          {/* Community */}
          <div className="hidden sm:flex w-full sm:w-1/5 flex-col gap-2 items-center sm:items-start text-center sm:text-left">
            <h3 className="font-bold text-lg sm:text-xl hidden sm:block">Community</h3>
            <div className="hidden sm:flex sm:space-x-4">
              {communities.map(({ name, link, icon }) => (
                <a
                  key={name}
                  href={link}
                  target="_blank"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  })}
                >
                  <span className="sr-only">{name}</span>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
};

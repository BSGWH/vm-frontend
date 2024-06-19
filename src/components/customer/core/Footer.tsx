"use client";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
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
      icon: (
        <XIcon
          style={{ color: iconColor }}
        />
      ),
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

      <section className="container py-20 flex flex-wrap justify-center gap-8">
        {/* Logo */}
        <div className="flex w-1/4 border-r items-center">
          <a href="/" className="font-bold text-xl">
            <Logo />
          </a>
        </div>

        {/* About */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">About</h3>
          <div>
            <a href="#features" className="opacity-60 hover:opacity-100">
              Features
            </a>
          </div>
          <div>
            <a href="#pricing" className="opacity-60 hover:opacity-100">
              Pricing
            </a>
          </div>
          <div>
            <a href="#" className="opacity-60 hover:opacity-100">
              Terms & Conditions
            </a>
          </div>
          <div>
            <a href="#" className="opacity-60 hover:opacity-100">
              Privacy Policy
            </a>
          </div>
        </div>

        {/* Community */}
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          <div className="flex">
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
      </section>
    </footer>
  );
};

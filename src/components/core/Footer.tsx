"use client";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import YouTubeIcon from "@mui/icons-material/YouTube";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

interface CommunityProps {
  name: string;
  link: string;
  icon: JSX.Element;
}

const communities: CommunityProps[] = [
  // {
  //   name: "Youtube icon",
  //   link: "",
  //   icon: <YouTubeIcon />,
  // },
  {
    name: "X icon",
    link: "https://twitter.com/vehicle_manager",
    icon: <XIcon />,
  },
  {
    name: "Linkedin icon",
    link: "https://www.linkedin.com/company/vehiclemanager/",
    icon: <LinkedInIcon style={{ fontSize: 30 }}/>,
  },
];

export const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
        <div className="col-span-full xl:col-span-2">
          <a href="/" className="font-bold text-xl flex">
            <img
              src={
                theme === "dark"
                  ? "/logos/oneRowWhite.png"
                  : "/logos/oneRowBlack.png"
              }
              alt="Logo"
              className="w-6/12 object-cover object-top"
            />
          </a>
        </div>

        <div className="flex flex-col gap-2"></div>
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

        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-lg">Community</h3>
          <div className="flex">
            {communities.map(({ name, link, icon }) => (
              <a
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

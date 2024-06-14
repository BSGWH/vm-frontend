"use client";
import { buttonVariants } from "@/components/ui/button";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Logo } from "../../logo/Logo";

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

  return (
    <footer id="footer">
      <hr className="w-11/12 mx-auto" />

      <section className="container py-20 grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8 justify-center">
        <div className="col-span-full xl:col-span-2">
          <a href="/" className="font-bold text-xl flex w-6/12">
						<Logo  />						
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

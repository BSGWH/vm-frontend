"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { useTheme } from "next-themes";

interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
  imageSrc: string;
}

const serviceList: ServiceProps[] = [
  {
    title: "Grow Your Business",
    description: "Join Logic Auto to reach more local customers looking for auto repair services. Increase your business visibility and attract new clients.",
    icon: <QueryStatsIcon className="w-8 h-8 fill-primaryProvider" />,
    imageSrc: "/images/provider-services/Revenue_Growth.png",
  },
  {
    title: "Manage Requests Easily",
    description: "Effortlessly manage customer requests with our platform. Accept or reschedule bookings based on your availability, ensuring a seamless experience for both you and your customers.",
    icon: <MiscellaneousServicesIcon className="w-8 h-8 fill-primaryProvider" />,
    imageSrc: "/images/provider-services/Message_Board.png",
  },
  {
    title: "Promote Your Services",
    description: "Drive more business by creating and managing promotions directly through our platform. Attract new customers with special offers and retain existing ones with exclusive deals.",
    icon: <LeaderboardIcon className="w-8 h-8 fill-primaryProvider" />,
    imageSrc: "/images/provider-services/New_Requests.png",
  },
  {
    title: "Monitor Performance",
    description: "Use our comprehensive dashboard to track your earnings, monitor key performance metrics, and gain valuable insights into your business operations.",
    icon: <LeaderboardIcon className="w-8 h-8 fill-primaryProvider" />,
    imageSrc: "/images/provider-services/Earning.png",
  },
];

export const HowItWorks = () => {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  return (
    <section id="howItWorks" className="container text-center py-10 lg:py-16">
      <h2 className="text-3xl md:text-4xl font-bold leading-loose">
        How It{" "}
        <span className="bg-gradient-to-b text-primaryProvider bg-clip-text">
          Works{" "}
        </span>
      </h2>
      <div className="mt-6 flex flex-col">
        {serviceList.map((service, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={service.title}
              className={`flex flex-col md:flex-row ${
                isEven ? "md:flex-row-reverse" : ""
              } items-center md:space-x-8 rounded-lg border-b border-gray-100 py-6`}
            >
              <div
                className={`flex w-full md:w-1/2 px-1 sm:px-10 md:px-16 ${
                  isEven ? "md:pl-8" : "md:pr-8"
                } text-left flex flex-col justify-center items-center`}
              >
                <div className={`text-left ${isEven ? "" : "md:ml-8"}`}>
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    {service.title}
                  </h3>
                  <p>{service.description}</p>
                </div>
              </div>
              <div className="flex w-full md:w-1/2 h-4/5 justify-center items-center overflow-hidden">
                <img
                  src={isDarkMode ? service.imageSrc.replace(".png", "-dark.png") : service.imageSrc}
                  alt={service.title}
                  className="object-contain py-4 md:py-0"
                />
              </div>
            </div>
          );
        })}
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

export default HowItWorks;

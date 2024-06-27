"use client";
import React, { useEffect, useState } from "react";
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

export const Services = () => {
  const { resolvedTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    setIsDarkMode(resolvedTheme === "dark");
  }, [resolvedTheme]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <section className="py-10 sm:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4 text-center text-black dark:text-white">
            <span className="bg-gradient-to-b text-primaryProvider bg-clip-text">
              Fix{" "}
            </span>
            More
          </h2>
          <Typography className="text-center mb-6 text-black dark:text-gray-300">
            Logic Auto Business Suite delivers many ways to help you grow.
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            centered
            className="w-full"
            sx={{
              "& .Mui-selected": {
                color: "hsl(var(--primaryProvider)) !important",
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "hsl(var(--primaryProvider))",
              },
            }}
          >
            {serviceList.map((service, index) => (
              <Tab key={index} label={service.title} className="dark:text-gray-100" sx={{
                "&.Mui-selected": {
                  color: "hsl(var(--primaryProvider)) !important",
                },
              }} />
            ))}
          </Tabs>
        </div>
        <div className="mt-6 flex justify-center items-center">
          <Box
            className="p-4 bg-white dark:bg-[hsl(222.2,84%,4.9%)] dark:text-white rounded-lg flex flex-col w-2/3"
          >
            <div className="w-full flex justify-center m-4">
              <img
                src={isDarkMode ? serviceList[selectedTab].imageSrc.replace(".png", "-dark.png") : serviceList[selectedTab].imageSrc}
                alt={serviceList[selectedTab].title}
                className="w-auto max-h-60 rounded-lg"
              />
            </div>
            <Box className="w-full text-center">
              <Typography variant="h5" className="mb-2 text-black dark:text-gray-300">
                {serviceList[selectedTab].title}
              </Typography>
              <Typography className="text-sm text-black dark:text-gray-300">
                {serviceList[selectedTab].description}
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
    </section>
  );
};

export default Services;

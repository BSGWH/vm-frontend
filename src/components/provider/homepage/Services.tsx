"use client";
import React, { useState } from "react";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

// Define the interface for service properties
interface ServiceProps {
  title: string;
  description: string;
  icon: JSX.Element;
}

// Define the list of services
const serviceList: ServiceProps[] = [
  {
    title: "Full Business Suite",
    description: "Get a complete suite of business tools for success.",
    icon: <QueryStatsIcon className="w-14 h-14 fill-primaryProvider" />,
  },
  {
    title: "Customer Acquisition",
    description: "Acquire new customers with our unique strategies.",
    icon: <MiscellaneousServicesIcon className="w-14 h-14 fill-primaryProvider" />,
  },
  {
    title: "Optimize Operations",
    description: "Optimize your business operations for better efficiency.",
    icon: <LeaderboardIcon className="w-14 h-14 fill-primaryProvider" />,
  },
];

export const Services = () => {
  // State to track the selected tab
  const [selectedTab, setSelectedTab] = useState(0);

  // Handle tab change
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <section
      className="py-12 sm:py-24"
    >
      <div className="container grid lg:grid-cols-[1.5fr,1fr] gap-8 place-items-center">
        <Box sx={{ display: "flex", width: "100%", height: "400px" }}>
          {/* Pic Box */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: 2,
              backgroundColor: "white",
              boxShadow: 3,
              borderRadius: 2,
              height: "100%", // Ensures that the box takes the full height of its container
              overflow: "hidden", // Prevents overflow of content
            }}
          >
            <img
              src={`/images/overview/${selectedTab + 1}.png`} // pic name: 1.png and so on
              alt={serviceList[selectedTab].title}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
              }}
            />
          </Box>
          {/* Right Tabs */}
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleChange}
            sx={{
              width: "30%", // Adjust width as needed
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around", // Evenly distribute space around items
              height: "100%", // Ensure that the tabs take the full height of the container
              borderRight: 1,
              borderColor: "divider",
            }}
          >
            {serviceList.map((service, index) => (
              <Tab
                key={index}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    {service.icon}
                    <Typography>{service.title}</Typography>
                  </Box>
                }
                sx={{
                  flexGrow: 1, // Ensure each tab takes up equal vertical space
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "calc(100% / 3)", // Ensure each Tab takes up one-third of the container height
                }}
              />
            ))}
          </Tabs>
        </Box>
        <div className="w-full max-w-md mx-auto"> {/* Adjust the max-width to control the width of the right section */}
          <h2 className="text-5xl font-bold">
            A full overview,{" "}
            <span className="bg-gradient-to-b from-[#2FA16D]/20 to-[#2FA16D] text-transparent bg-clip-text">
              simplified.
            </span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Services;

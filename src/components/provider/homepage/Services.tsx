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
    title: "Grow Your Business",
    description: "Join Logic Auto to reach more local customers looking for auto repair services. Increase your business visibility and attract new clients.",
    icon: <QueryStatsIcon className="w-8 h-8 fill-primaryProvider" />,
  },
  {
    title: "Manage Requests Easily",
    description: "Effortlessly manage customer requests with our platform. Accept or reschedule bookings based on your availability, ensuring a seamless experience for both you and your customers.",
    icon: <MiscellaneousServicesIcon className="w-8 h-8 fill-primaryProvider" />,
  },
  {
    title: "Promote Your Services",
    description: "Drive more business by creating and managing promotions directly through our platform. Attract new customers with special offers and retain existing ones with exclusive deals.",
    icon: <LeaderboardIcon className="w-8 h-8 fill-primaryProvider" />,
  },
  {
    title: "Monitor Performance",
    description: "Use our comprehensive dashboard to track your earnings, monitor key performance metrics, and gain valuable insights into your business operations.",
    icon: <LeaderboardIcon className="w-8 h-8 fill-primaryProvider" />,
  },
];

export const Services = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <section className="py-10 sm:py-20">
      <div className="container mx-auto">
        <div className="flex flex-col items-center">
          <h2 className="text-4xl font-bold mb-4 text-center text-black dark:text-white"> {/* Ensure text color changes in dark mode */}
            Fix more
          </h2>
          <Typography className="text-center mb-6 text-black dark:text-gray-300"> {/* Adjust text color for dark mode */}
            Logic Auto Merchant Suite delivers many ways to help you grow.
          </Typography>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            centered
            sx={{
              flexWrap: 'wrap',
              paddingX: '16px',
              gap: '8px',
              justifyContent: 'center',
              mb: '12px',
              '& .MuiTabs-indicator': {
                backgroundColor: 'hsl(154, 70%, 45%)',
              },
            }}
          >
            {serviceList.map((service, index) => (
              <Tab
                key={index}
                label={service.title}
                className="text-center text-black dark:text-gray-300"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  fontSize: '0.875rem',
                  minHeight: '48px',
                  padding: '6px 12px',
                  whiteSpace: 'normal',
                  textAlign: 'center',
                  flexBasis: 'calc(25% - 16px)',
                  textTransform: 'none',
                  minWidth: '210px',
                }}
                sx={{
                  '&.Mui-selected': {
                    color: 'hsl(154, 70%, 45%)',
                  },
                }}
              />
            ))}
          </Tabs>
        </div>
        <div className="mt-0 p-6 bg-white dark:bg-[hsl(222.2,84%,4.9%)] dark:text-white rounded-lg flex flex-col lg:flex-row items-center lg:items-start"> {/* Set background color for dark mode */}
          <Box className="w-full lg:w-1/3 p-4 text-center lg:text-left">
            <Typography variant="h5" className="mt-4 mb-2 text-black dark:text-gray-300"> {/* Adjust text color for dark mode */}
              {serviceList[selectedTab].title}
            </Typography>
            <Typography className="text-black dark:text-gray-300"> {/* Adjust text color for dark mode */}
              {serviceList[selectedTab].description}
            </Typography>
          </Box>
          <Box className="w-full lg:w-2/3 p-4 flex justify-center lg:justify-end bg-white dark:bg-[hsl(222.2,84%,4.9%)] rounded-lg"> {/* Ensure background color for dark mode */}
            <img
              src={'/images/provider-Dashboard.jpg'}
              alt={serviceList[selectedTab].title}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "800px",
                objectFit: "contain",
              }}
            />
          </Box>
        </div>
      </div>
    </section>
  );
};

export default Services;

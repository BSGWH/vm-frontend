"use client";
import UpcomingTomorrowTable from "../serviceTable/UpcomgingTomorrow";
import UpcomingTodayTable from "../serviceTable/UpcomingToday";
import UpcomingServiceFilter from "./upcomingServiceFilter";
import { useState } from "react";

export default function UpcomingService() {
  const [selectedFilter, setSelectedFilter] = useState("today");

  const renderComponent = () => {
    switch (selectedFilter) {
      case "today":
        return <UpcomingTodayTable />;
      case "tomorrow":
        return <UpcomingTomorrowTable />;
      case "week":

      case "month":

      case "All":

      default:
        return <UpcomingTodayTable />;
    }
  };

  return (
    <div className="w-full">
      <UpcomingServiceFilter setSelectedFilter={setSelectedFilter} />
      {renderComponent()}
    </div>
  );
}

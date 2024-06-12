import DemoPage from "./serviceTable/tablePage";
import UpcomingServiceFilter from "./upcomingServiceFilter";

export default function UpcomingService() {
  return (
    <div className="w-full">
      <UpcomingServiceFilter />
      <DemoPage />
    </div>
  );
}


import DashboardBreadcrumb from "@/components/dashboardComponents/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import NewVehicleOptions from "@/components/dashboardComponents/NewVehicleOptions";
import { CarMakeWithModels } from "@/types/car";
import { getAllModelsByMake } from "@/lib/fetch_util_server";


const breadcrumbItems = [
  { title: "My Vehicles", link: "/dashboard/vehicles" },
  { title: "New Vehicles", link: "/dashboard/vehicles/new_vehicles" },
];

export default async function page() {

  const carModelData = await getAllModelsByMake();
  const allCarMakes: CarMakeWithModels[] = Object.values(carModelData);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems} />
        <Heading title="Add Vehicles" description="Please select one of the options to add your car" />
        <Separator />
        <NewVehicleOptions makesWithModels={allCarMakes}/>
      </div>
    </ScrollArea>
  );
}

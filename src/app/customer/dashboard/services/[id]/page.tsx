import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { fetchRailsData } from "@/lib/fetch_util_server";
import VehicleOverview from "@/components/customer/dashboard/vehicleDetailComponents/VehicleOverview";
import VehicleServices from "@/components/customer/dashboard/vehicleDetailComponents/VehicleServices";
import VehicleDocuments from "@/components/customer/dashboard/vehicleDetailComponents/VehicleDocuments";

export default async function page({ params }: { params: { id: number } }) {
  const breadcrumbItems = [
    { title: "My Services", link: "/customer/dashboard/services" },
    { title: "View Service", link: `/customer/dashboard/services/${params.id}` },
  ];

  const service = await fetchRailsData(`/services/${params.id}`);
  console.log(service);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems} />
        <div className="flex justify-between">
          <Heading title="Service Details" description="" />
        </div>
        <Separator />

        <VehicleOverview />
        <VehicleServices />
        <VehicleDocuments />
      </div>
    </ScrollArea>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import UpcomingService from "@/components/providerComponents/providerService/upcomingService";

const breadcrumbItems = [
  { title: "Service", link: "/provider/dashboard-provider/provider-service" },
];

export default function ProviderService() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb
          items={breadcrumbItems}
          basePath="/provider/dashboard-provider"
        />
        <Heading
          title="Service"
          description="Manage account service schedule"
        />

        <Tabs defaultValue="Request" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="Request">Request</TabsTrigger>
            <TabsTrigger value="Upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="Ongoing">Ongoing</TabsTrigger>
            <TabsTrigger value="Completed">Completed</TabsTrigger>
            <TabsTrigger value="Denied">Denied</TabsTrigger>
          </TabsList>
          <Separator className="my-4 border-t border-gray-200 w-full" />
          <TabsContent value="Upcoming">
            <UpcomingService />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

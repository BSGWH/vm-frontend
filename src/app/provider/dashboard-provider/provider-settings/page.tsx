import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";

const breadcrumbItems = [
  { title: "Settings", link: "/provider/dashboard-provider/provider-settings" },
];

export default function ProviderSettings() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb
          items={breadcrumbItems}
          basePath="/provider/dashboard-provider"
        />
        <div className="mt-4">
          <Heading title="Settings" description="Manage account settings" />
        </div>
        Add more setting
      </div>
      <div>da</div>
      <div>da</div>
      <div>da</div>
      <div>da</div>
      <div>da</div>
      <div>da</div>
    </ScrollArea>
  );
}

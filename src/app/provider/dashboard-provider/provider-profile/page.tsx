import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";

import { BusinessInfo } from "@/components/providerComponents/providerProfile/businessInfo";

const breadcrumbItems = [
  { title: "Profile", link: "/provider/dashboard-provider/provider-profile" },
];

export default function ProviderProfile() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb
          items={breadcrumbItems}
          basePath="/provider/dashboard-provider"
        />
        <div className="mt-4">
          <Heading title="Profile" description="Manage your company profile" />
        </div>
        <BusinessInfo />
      </div>
    </ScrollArea>
  );
}

import { useState } from "react";
import Link from "next/link";
import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { CompanyBasicInfo } from "@/components/providerComponents/providerProfile/CompanybasicInfo";
import { AddressInfo } from "@/components/providerComponents/providerProfile/AddressInfo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NormalOperationTime } from "@/components/providerComponents/providerProfile/NormalOperationTime";

const breadcrumbItems = [
  { title: "Profile", link: "/provider/dashboard-provider/provider-profile" },
];

export default function ProviderProfile() {
  return (
    <div className="flex-1 space-y-4 px-4 md:px-8">
      <CompanyBasicInfo />
      <AddressInfo />
    </div>
  );
}

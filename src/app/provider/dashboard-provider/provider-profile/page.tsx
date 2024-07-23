"use client";
import { useState } from "react";
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
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb
          items={breadcrumbItems}
          basePath="/provider/dashboard-provider"
        />
        <div className="mt-4">
          <Heading title="Profile" description="Manage your company profile" />
        </div>

        <Tabs defaultValue="Business Details" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="Business Details">Business Details</TabsTrigger>
            <TabsTrigger value="Operations">Operations</TabsTrigger>
            <TabsTrigger value="Offered Services">Offered Services</TabsTrigger>
            <TabsTrigger value="Payments">Payments</TabsTrigger>
          </TabsList>
          {/* <Separator className="my-4 border-t border-gray-200 w-full" /> */}
          <TabsContent value="Business Details">
            <CompanyBasicInfo />
            <AddressInfo />
          </TabsContent>
          <TabsContent value="Operations">
            <NormalOperationTime />
          </TabsContent>
        </Tabs>
      </div>
    </ScrollArea>
  );
}

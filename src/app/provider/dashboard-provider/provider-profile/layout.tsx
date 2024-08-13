"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { Heading } from "@/components/ui/heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@radix-ui/react-scroll-area";

const breadcrumbItems = [
  { title: "Profile", link: "/provider/dashboard-provider/provider-profile" },
];

const tabConfig = [
  {
    value: "Business Details",
    href: "/provider/dashboard-provider/provider-profile",
  },
  {
    value: "Operations",
    href: "/provider/dashboard-provider/provider-profile/operations",
  },
  {
    value: "Offered Services",
    href: "/provider/dashboard-provider/provider-profile/offered-services",
  },
  {
    value: "Payments",
    href: "/provider/dashboard-provider/provider-profile/payments",
  },
];

export default function ProviderProfile({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("Business Details");

  useEffect(() => {
    const currentTab = tabConfig.find((tab) => tab.href === pathname);

    if (currentTab) {
      setActiveTab(currentTab.value);
    }
  }, [pathname]);

  return (
    <div className="flex-grow overflow-y-auto h-full">
      <div className="space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb
          items={breadcrumbItems}
          basePath="/provider/dashboard-provider"
        />
        <div className="mt-4">
          <Heading title="Profile" description="Manage your company profile" />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            {tabConfig.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value} asChild>
                <Link href={tab.href} className="w-full h-full">
                  {tab.value}
                </Link>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      {children}
    </div>
  );
}

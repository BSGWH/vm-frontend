import DashboardBreadcrumb from "@/components/dashboardComponents/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const breadcrumbItems = [{ title: "My Vehicles", link: "/dashboard/vehicles" }];

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems} />
        <Heading title="My Vecicles" description="Manage my vehicles" />
        <Separator />
        <Button>
          <Link href="/dashboard/vehicles/new_vehicles">Add a vehicle</Link>
        </Button>
      </div>
    </ScrollArea>
  );
}

import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Service } from "@/types/service";
import ServiceCard from "@/components/customer/dashboard/serviceComponents/ServiceCard";
// import { ServiceForm } from "@/components/forms/ServiceForm";

const breadcrumbItems = [{ title: "Services", link: "/dashboard/services" }];

const services: Service[] = [
  {
    service_id: 1,
    vehicle: "vehicle 2",
    service_type: "fluid change",
    provider: "test provider",
    service_date: "2024-05-01",
    service_time: "",
    is_completed: true,
  },
  {
    service_id: 2,
    vehicle: "vehicle 1",
    service_type: "Wheel Alignments",
    provider: "test provider",
    service_date: "2024-07-01",
    service_time: "",
    is_completed: false,
  },
];

export default async function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems} />
        <div className="flex justify-between">
          <Heading title="My Services" description="Manage my services" />
          <Button>
            <Link href="/dashboard/services/new_services">Add a service</Link>
          </Button>
        </div>
        <Separator />
        <div className="pt-2">
          {services.map((service: Service) => (
            <div className="mt-6">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

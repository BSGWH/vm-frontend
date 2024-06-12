
import DashboardBreadcrumb from "@/components/dashboardComponents/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { NewServiceForm} from "@/components/forms/NewServiceForm";
import { useRouter } from "next/router";


const breadcrumbItems = [
  { title: "My Services", link: "/dashboard/services" },
  { title: "New Services", link: "/dashboard/services/new_services" },
];

export default async function page() {

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems} />
        <Heading title="Add New Services" description="Please select one of the options to add your service." />
        <Separator />
        <NewServiceForm/>
      </div>
    </ScrollArea>
  );
}

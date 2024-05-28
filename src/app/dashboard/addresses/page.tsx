import DashboardBreadcrumb from "@/components/dashboardComponents/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { AddressesForm } from "@/components/forms/AddressesForm";

const breadcrumbItems = [{ title: "Addresses", link: "/dashboard/addresses" }]

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems}/>
        <Heading title="Addresses" description="Manage addresses"/>
        <Separator />
				<AddressesForm />
      </div>
    </ScrollArea>
  )
}
import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
{/* import { SwitchForm } from "@/components/customer/forms/SettingForm"; */}
import { ProfileForm } from "@/components/customer/forms/ProfileForm";

const breadcrumbItems = [{ title: "Profile", link: "/dashboard/profile" }]

export default function page() {
  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems}/>
        <Heading title="Profile" description="Manage profile"/>
        <Separator />
				<ProfileForm />
      </div>
    </ScrollArea>
  )
}

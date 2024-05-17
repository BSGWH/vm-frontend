import DashboardBreadcrumb from "@/components/dashboardComponents/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { fetchRailsData } from "@/lib/fetch_util_server";
import { VehicleAction } from "@/components/dashboardComponents/vehicleDetailComponents/VehicleAction";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VinForm2 } from "@/components/forms/VinForm";

export default async function page({ params }: { params: { id: number } }) {
  const breadcrumbItems = [
    { title: "My Vehicles", link: "/dashboard/vehicles" },
    { title: "View Vehicle", link: `/dashboard/vehicles/${params.id}` },
    { title: "Edit Vehicle", link: `/dashboard/vehicles/${params.id}/edit` },
  ];

  const vehicle = await fetchRailsData(`/vehicles/${params.id}`);
  console.log(vehicle);

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems} />
        <div className="flex justify-between">
          <Heading title="Edit Vehicle" description="" />
          <VehicleAction row={"string"} />
        </div>
        <Separator />

        {/* {JSON.stringify(vehicle)} */}

        <Card>
          <CardHeader>
            <CardTitle>Add your VIN number</CardTitle>
            <CardDescription>
              Add a VIN number allows vehicle details to be populated
              automatically. VIN update is not currently supported. If you need
              to update your VIN number, create a new vehicle intead.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <VinForm2 />
          </CardContent>
          {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>VIN number added!</CardTitle>
            <CardDescription>
              Vehicle details are automatically populated with your VIN number.
              Update the details below if there is any incorrect details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-x-4 flex">
            <div className="font-semibold">VIN</div>
            <div className="font-light text-muted-foreground">2HJHK234HB843901</div>
          </CardContent>
          {/* <CardFooter>
            <Button>Save password</Button>
          </CardFooter> */}
        </Card>
        <Card className="">
          <CardHeader>
            <CardTitle>Edit Vehicle Details</CardTitle>
            <CardDescription>
              Update your vehicle details. Click save when you're done. We
              recommend adding a vin number first before mannually update the
              vehicle.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Make</Label>
              <Input id="name" defaultValue="Ford" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Model</Label>
              <Input id="username" defaultValue="Explorer" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save changes</Button>
          </CardFooter>
        </Card>
      </div>
    </ScrollArea>
  );
}

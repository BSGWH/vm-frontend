"use client"
import DashboardBreadcrumb from "@/components/customer/dashboard/DashboardBreadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Vehicle } from "@/types/car";
import * as React from "react";
import { fetchRailsData } from "@/lib/fetch_util_server";

import VehicleCard from "@/components/customer/dashboard/vehicleComponents/VehicleCard";

const breadcrumbItems = [{ title: "My Vehicles", link: "/dashboard/vehicles" }];

const vehicle: Vehicle = {
  vehicle_id: 1,
  make_id: 1,
  make_name: "Ford",
  model_id: 1,
  model_name: "Explorer",
  color: "white",
  year: "2023",
  lisence_plate: "DEF456",
  vin: "2HJHK234HB843901",
  created_at: "2024-05-14T19:41:18.210Z",
};

const vehicles: Vehicle[] = [
  {
    vehicle_id: 1,
    make_id: 1,
    make_name: "Toyota",
    model_id: 1,
    model_name: "Explorer",
    color: "white",
    year: "2023",
    lisence_plate: "DEF456",
    vin: "2HJHK234HB843901",
    created_at: "2024-05-14T19:41:18.210Z",
  },
  {
    vehicle_id: 1,
    make_id: 1,
    make_name: "Ford",
    model_id: 1,
    model_name: "Explorer",
    color: "white",
    year: "2023",
    lisence_plate: "DEF456",
    vin: "2HJHK234HB843901",
    created_at: "2024-05-14T19:41:18.210Z",
  },
];

const handleEdit = (vehicle: Vehicle) => {
  console.log("Editing vehicle:", vehicle);
};

const handleBook = (vehicle: Vehicle) => {
  console.log("Booking service for vehicle:", vehicle);
};

export default async function page() {
  // const vehicles = await fetchRailsData("/vehicles");

  return (
    <ScrollArea className="h-full">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <DashboardBreadcrumb items={breadcrumbItems} />
        <div className="flex justify-between">
          <Heading title="My Vecicles" description="Manage my vehicles" />
          <Button>
            <Link href="/customer/dashboard/vehicles/new_vehicles">Add a vehicle</Link>
          </Button>
        </div>
        <Separator />
        <div className="pt-2">
          {vehicles.map((vehicle: Vehicle) => (
            <div className="mt-6">
              <VehicleCard vehicle={vehicle} 
                onEdit={handleEdit}
                onBook={handleBook} />
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}

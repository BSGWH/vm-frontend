"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Vehicle } from "@/types/car";
import VehicleCard from "@/components/customer/dashboard/vehicleComponents/VehicleCard";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { useState } from "react";

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

const services = [
  {
    service_id: 1,
    vehicle: "Ford Explorer",
    type: "Oil Change",
    location: "Auto Zone, Aurora Ave, Boston",
    date: "2024-08-15",
    time: "9:30 am",
    day: "Thursday",
    make_name: "Ford",
  },
  {
    service_id: 2,
    vehicle: "Toyota Camry",
    type: "Brake Pad Replacement",
    location: "Manny's Auto Repair, Main Street, Los Angeles",
    date: "2024-08-15",
    time: "11:00 am",
    day: "Thursday",
    make_name: "Toyota",
  },
  {
    service_id: 3,
    vehicle: "Chevrolet Silverado",
    type: "Tire Rotation",
    location: "Speedy Lube, Elm Street, Chicago",
    date: "2024-08-15",
    time: "12:00 pm",
    day: "Thursday",
    make_name: "Chevrolet",
  },
  {
    service_id: 4,
    vehicle: "Ford Explorer",
    type: "Oil Change",
    location: "Auto Zone, Aurora Ave, Boston",
    date: "2024-08-16",
    time: "11:00 am",
    day: "Friday",
    make_name: "Ford",
  },
  {
    service_id: 5,
    vehicle: "Toyota Camry",
    type: "Brake Pad Replacement",
    location: "Manny's Auto Repair, Main Street, Los Angeles",
    date: "2024-08-16",
    time: "11:00 am",
    day: "Friday",
    make_name: "Toyota",
  },
];

export default function Page() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const filteredServices = selectedDate
    ? services.filter(
        (service) =>
          new Date(service.date).toISOString().split("T")[0] ===
          new Date(selectedDate).toISOString().split("T")[0]
      )
    : services;

  return (
    <ScrollArea className="h-full">
      <div className="flex space-x-4 p-4 md:p-8 pt-6">
        {/* 第一列：日历和服务列表 */}
        <div className="w-1/2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Services</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                markedDates={services.map((service) =>
                  new Date(service.date).toISOString().split("T")[0]
                )} // 传入有日程的日期
                onSelectDate={(date) =>
                  setSelectedDate(new Date(date).toISOString().split("T")[0])
                } // 设置选择日期
              />
              <Separator className="my-4" />
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div key={service.service_id} className="flex items-center">
                    <div className="flex items-center flex w-[32px] h-[32px] px-1 bg-white rounded-full">
                      <img
                        src={`/car_make_logos/${service.make_name.replace(
                          /\s+/g,
                          "_"
                        ).toLowerCase()}.png`}
                        alt={`${service.make_name} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <div className="ml-4 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {service.type} for {service.vehicle}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {service.location}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <p className="text-sm font-medium leading-none">
                        {service.day}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {service.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 第二列：车辆列表 */}
        <div className="w-1/2 space-y-4">
          <Card>
            <div className="flex justify-between items-center">
              <Heading title="My Vehicles" description="Manage my vehicles" />
              <Button>
                <Link href="/customer/dashboard/vehicles/new_vehicles">
                  Add a vehicle
                </Link>
              </Button>
            </div>
            <Separator className="my-4" />
            <div className="space-y-6">
              {vehicles.map((vehicle: Vehicle) => (
                <VehicleCard key={vehicle.vehicle_id} vehicle={vehicle}>
                  <button>Edit</button>
                  <button>Book</button>
                </VehicleCard>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}


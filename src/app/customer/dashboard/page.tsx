"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { Vehicle } from "@/types/car";
import { motion, AnimatePresence } from "framer-motion"; // 引入Framer Motion用于动画效果
import { ChevronDown, ChevronUp, Edit, Plus, BookOpen } from "lucide-react"; // 使用Lucide图标库
import { Separator } from "@/components/ui/separator";
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
    vehicle_id: 2,
    make_id: 2,
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
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);
  const [expandedVehicleId, setExpandedVehicleId] = useState<number | null>(null);

  const filteredServices = selectedDate
    ? services.filter(
        (service) =>
          new Date(service.date).toISOString().split("T")[0] ===
          new Date(selectedDate).toISOString().split("T")[0]
      )
    : services;

  const toggleServiceDetails = (serviceId: number) => {
    setExpandedServiceId(serviceId === expandedServiceId ? null : serviceId);
  };

  const toggleVehicleDetails = (vehicleId: number) => {
    setExpandedVehicleId(vehicleId === expandedVehicleId ? null : vehicleId);
  };

  const handleEdit = (vehicle: Vehicle) => {
    console.log("Editing vehicle:", vehicle);
  };

  const handleBook = (vehicle: Vehicle) => {
    console.log("Booking service for vehicle:", vehicle);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex space-x-4 p-4 md:p-8 pt-6">
        

        {/* Vehicles Lists */}
        <div className="w-2/3 space-y-4">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>My Vehicles</CardTitle>
              <Button variant="outline" size="sm">
                <Plus size={16} className="mr-2" />
                Add Vehicle
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {vehicles.map((vehicle) => (
                  <div key={vehicle.vehicle_id} className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex items-center flex w-[32px] h-[32px] px-1 bg-white rounded-full">
                        <img
                          src={`/car_make_logos/${vehicle.make_name
                            .replace(/\s+/g, "_")
                            .toLowerCase()}.png`}
                          alt={`${vehicle.make_name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <p className="text-sm font-medium leading-none">
                          {vehicle.lisence_plate}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="link" size="sm" onClick={() => handleEdit(vehicle)}>
                          <Edit size={16} />
                        </Button>
                        <Button variant="link" size="sm" onClick={() => handleBook(vehicle)}>
                          <BookOpen size={16} />
                        </Button>
                        <Button
                          variant="link"
                          size="sm"
                          onClick={() => toggleVehicleDetails(vehicle.vehicle_id)}
                        >
                          {expandedVehicleId === vehicle.vehicle_id ? (
                            <ChevronUp size={16} />
                          ) : (
                            <ChevronDown size={16} />
                          )}
                        </Button>
                      </div>
                    </div>
                    <AnimatePresence>
                      {expandedVehicleId === vehicle.vehicle_id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-gray-100 p-4 rounded"
                        >
                          <div className="pl-3 space-y-2">
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Make:
                              </p>
                              <p className="text-sm">{vehicle.make_name}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Model:
                              </p>
                              <p className="text-sm">{vehicle.model_name}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Year:
                              </p>
                              <p className="text-sm">{vehicle.year}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Color:
                              </p>
                              <p className="text-sm">{vehicle.color}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                VIN:
                              </p>
                              <p className="text-sm">{vehicle.vin}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Separator className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Calendar and Upcoming Services */}
        <div className="w-1/3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Services</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar />
              <Separator className="my-4" />
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div key={service.service_id} className="space-y-2">
                    <div className="flex items-center">
                      <div className="flex items-center flex w-[32px] h-[32px] px-1 bg-white rounded-full">
                        <img
                          src={`/car_make_logos/${service.make_name
                            .replace(/\s+/g, "_")
                            .toLowerCase()}.png`}
                          alt={`${service.make_name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 ml-4">
                        <p className="text-sm font-medium leading-none">
                          {service.type}
                        </p>
                      </div>
                      <div className="ml-auto text-right">
                        <p className="text-sm font-medium leading-none">
                          {service.date}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.time}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => toggleServiceDetails(service.service_id)}
                      >
                        {expandedServiceId === service.service_id ? (
                          <ChevronUp size={16} />
                        ) : (
                          <ChevronDown size={16} />
                        )}
                      </Button>
                    </div>
                    <AnimatePresence>
                      {expandedServiceId === service.service_id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden bg-gray-100 p-4 rounded"
                        >
                          <div className="pl-3 space-y-2">
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Vehicle:
                              </p>
                              <p className="text-sm">{service.vehicle}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Location:
                              </p>
                              <p className="text-sm">{service.location}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Date:
                              </p>
                              <p className="text-sm">{service.date}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                Time:
                              </p>
                              <p className="text-sm">{service.time}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28">
                                License Plate:
                              </p>
                              <p className="text-sm">{service.vehicle}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <Separator className="mt-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
}

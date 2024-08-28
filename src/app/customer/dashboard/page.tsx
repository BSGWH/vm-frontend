"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MyVehicles } from "@/components/customer/dashboard/myvehicles";
import { Messages } from "@/components/customer/dashboard/messages";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [expandedServiceId, setExpandedServiceId] = useState<number | null>(null);

  const serviceDates = services.map((service) => new Date(service.date));

  const filteredServices = selectedDate
    ? services.filter(
        (service) =>
          new Date(service.date).toLocaleDateString() ===
          new Date(selectedDate).toLocaleDateString()
      )
    : services;

  const toggleServiceDetails = (serviceId: number) => {
    setExpandedServiceId(serviceId === expandedServiceId ? null : serviceId);
  };

  const handleDayClick = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  return (
    <ScrollArea className="h-full">
      <div className="flex space-x-4 p-4 md:p-8 pt-6 h-[calc(100vh-4rem)]">
        {/* My Vehicles and Messages */}
        <div className="flex flex-col w-2/3 space-y-4 h-full">
          <MyVehicles />
          <Messages />
        </div>

        {/* Upcoming Services */}
        <div className="w-1/3 h-full">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Upcoming Services</CardTitle>
            </CardHeader>
            <CardContent
              className="overflow-y-auto h-full max-h-[calc(100vh-14rem)]"
              style={{ scrollbarGutter: "stable" }}
            >
              {/* Calendar */}
              <Calendar
                selectedDate={selectedDate}
                onDateSelect={handleDayClick}
                serviceDates={serviceDates}
              />
              <Separator className="my-4" />
              <div className="space-y-2">
                {filteredServices.map((service) => (
                  <div
                    key={service.service_id}
                    className="space-y-2 cursor-pointer"
                    onClick={() => toggleServiceDetails(service.service_id)}
                  >
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
                          {new Date(service.date).toLocaleDateString("en-US", {
                            month: "numeric",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {service.time}
                        </p>
                      </div>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleServiceDetails(service.service_id);
                        }}
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
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-100 p-4 rounded"
                          style={{ willChange: "transform" }}
                        >
                          <div className="pl-3 space-y-2">
                            <div className="flex">
                              <p className="text-sm font-medium w-28 flex-shrink-0">
                                Vehicle:
                              </p>
                              <p className="text-sm">{service.vehicle}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28 flex-shrink-0">
                                Location:
                              </p>
                              <p className="text-sm">{service.location}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28 flex-shrink-0">
                                Date:
                              </p>
                              <p className="text-sm">{service.date}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28 flex-shrink-0">
                                Time:
                              </p>
                              <p className="text-sm">{service.time}</p>
                            </div>
                            <div className="flex">
                              <p className="text-sm font-medium w-28 flex-shrink-0">
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

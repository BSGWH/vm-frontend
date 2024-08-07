"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";

interface Service {
  service_name: string;
  description: string;
}

interface SelectedService {
  service: string;
  price: string;
  duration: number;
}

const services: Service[] = [
  {
    service_name: "Oil Change",
    description:
      "Regular oil change service to keep your engine running smoothly.",
  },
  {
    service_name: "Vehicle Inspection",
    description:
      "Comprehensive vehicle inspection to ensure safety and performance.",
  },
  {
    service_name: "Vehicle Diagnosis",
    description:
      "Detailed diagnostics to identify and troubleshoot vehicle issues.",
  },
  {
    service_name: "Auto Detailing",
    description:
      "Professional auto detailing to maintain and restore the vehicle's appearance.",
  },
  {
    service_name: "Interior Cleaning",
    description:
      "Thorough interior cleaning to keep the vehicle's cabin fresh and clean.",
  },
];

const durations: number[] = [15, 30, 45, 60, 75, 90, 105, 120];

export function OfferedServices() {
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );

  const addService = () => {
    setSelectedServices([
      ...selectedServices,
      { service: "", price: "", duration: 15 },
    ]);
  };

  const updateService = (
    index: number,
    field: keyof SelectedService,
    value: string | number
  ) => {
    const updatedServices = [...selectedServices];
    updatedServices[index][field] = value;
    setSelectedServices(updatedServices);
  };

  const deleteService = (index: number) => {
    const updateServices = selectedServices.filter((_, i) => i != index);
    setSelectedServices(updateServices);
  };

  return (
    <div>
      <h1 className="text-lg font-bold mt-6 mb-2">Service Setup</h1>
      <Separator />
      {selectedServices.map((service, index) => (
        <Card key={index} className="mb-8">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Add new service</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => deleteService(index)}
            >
              Cancel
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Select
                value={service.service}
                onValueChange={(value: string) =>
                  updateService(index, "service", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((s) => (
                    <SelectItem key={s.service_name} value={s.service_name}>
                      {s.service_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Input
                type="number"
                placeholder="Price"
                value={service.price}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateService(index, "price", e.target.value)
                }
              />

              <Select
                value={service.duration.toString()}
                onValueChange={(value: string) =>
                  updateService(index, "duration", parseInt(value))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  {durations.map((d) => (
                    <SelectItem key={d} value={d.toString()}>
                      {d === 60
                        ? "1 hour"
                        : d === 120
                        ? "2 hours"
                        : `${d} mins`}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      ))}

      <Button variant="providerDefault" className="mt-5" onClick={addService}>
        Add Service
        <Plus className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

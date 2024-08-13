"use client";

import React, { useState } from "react";
import ServiceDetails from "./ServiceDetails";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface Service {
  name: string;
  questions: string[];
}

const LeadSettings: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [newServiceName, setNewServiceName] = useState("");
  const [open, setOpen] = useState(false);

  const addService = () => {
    if (newServiceName.trim()) {
      const newService: Service = {
        name: newServiceName.trim(),
        questions: [
          "How likely are you to make a hiring decision?",
          "What type of property needs servicing?",
          "How often do you need this service?",
          "When are the best days for service?",
          "Will you be supplying materials and equipment?",
        ],
      };
      setServices([...services, newService]);
      setNewServiceName("");
      setOpen(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-1/3 p-6 ml-6">
        <h2 className="text-2xl font-bold mb-4">Service setting</h2>
        <p className="text-gray-400 mb-6">Service you want to setup</p>

        <h3 className="text-xl font-semibold mb-2">Your services</h3>
        <p className="text-gray-400 mb-4">Tailor your service starting here.</p>

        {services.map((service) => (
          <div
            key={service.name}
            onClick={() => setSelectedService(service)}
            className={`p-3 mb-2 rounded cursor-pointer ${
              selectedService === service
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {service.name}
          </div>
        ))}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="text-blue-600 hover:text-blue-800 hover:underline p-0 mb-6">
              + Add a service
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add a Service</DialogTitle>
              <DialogDescription>
                Enter the name of the new service you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          View leads
        </button>
      </div>

      <div className="w-2/3 p-6">
        {services.length === 0 ? (
          <div className="text-center">
            <h2 className="text-lg font-medium mb-4">
              What service you want to add?
            </h2>
            <p className="text-gray-600 mb-4">
              Specify which details you want to see for customers using
              LogicAuto:
            </p>
            <ul className="list-disc list-inside mb-6 text-gray-600">
              <li>Add or remove services</li>
              <li>Specify details for each service</li>
            </ul>
            {/* Add illustration here */}
          </div>
        ) : selectedService ? (
          <ServiceDetails service={selectedService} />
        ) : (
          <div className="text-center text-gray-600">
            Select a service to view details
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadSettings;

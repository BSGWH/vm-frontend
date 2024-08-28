"use client";

import React, { useEffect, useState } from "react";
import ServiceDetails from "./OfferedService/ServiceDetails";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import {
  fetchServiceOptions,
  getServiceNames,
  fetchProviderServices,
} from "./OfferedService/ServiceFetching";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface ServiceOption {
  id: number;
  service_name: string;
  description: string;
}

interface ProviderService {
  id: number;
  provider_id: number;
  default_service_id: number;
  provider_service_name: string;
  product_id: string;
  is_mobile: boolean;
  created_at: string;
  updated_at: string;
}

const OfferedService: React.FC = () => {
  // services are the services that a provider has in the provider service table
  const [services, setServices] = useState<ProviderService[]>([]);
  const [selectedService, setSelectedService] =
    useState<ProviderService | null>(null);
  // serviceOptions are the service options object list fetched from default service table
  const [serviceOptions, setServiceOptions] = useState<ServiceOption[]>([]);
  // selectedServiceOption is one service option object that is selected by the user
  const [selectedServiceOption, setSelectedServiceOption] =
    useState<ServiceOption | null>(null);
  // The state of the dialog
  const [open, setOpen] = useState(false);
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      setIsLoading(true);
      try {
        const fetchedServices = await fetchProviderServices();
        const fetchedServicesOptions = await fetchServiceOptions();
        setServices(fetchedServices);
        setServiceOptions(fetchedServicesOptions);
      } catch (error) {
        console.error("Error loading services", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadServices();
  }, []);

  const addService = async () => {
    if (selectedServiceOption) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "/api/provider/profile/offered-service/create_stripe_product",
          {
            service_name: selectedServiceOption.service_name,
            id: selectedServiceOption.id,
          }
        );

        const newService: ProviderService = response.data;
        setServices([...services, newService]);

        // Update the serviceOptions state
        setServiceOptions(
          serviceOptions.filter(
            (option) => option.id !== selectedServiceOption.id
          )
        );
        setSelectedServiceOption(null);
        setOpen(false);
      } catch (error) {
        console.error("Error adding service", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 p-6 ml-6 ">
        <h2 className="text-2xl font-bold mb-4">Service setting</h2>
        <p className="text-gray-400 mb-6">Service you want to setup</p>

        <h3 className="text-xl font-semibold mb-2">Your services</h3>
        <p className="text-gray-400 mb-4">Tailor your service starting here.</p>

        {isLoading ? (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ) : (
          services.map((service) => (
            <div
              key={service.id}
              onClick={() => setSelectedService(service)}
              className={`p-3 mb-2 rounded cursor-pointer ${
                selectedService === service
                  ? "bg-primaryProviderBackground"
                  : "bg-muted hover:bg-primaryProviderBackground"
              }`}
            >
              {service.provider_service_name}
            </div>
          ))
        )}

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
                Select the name of the new service you want to add.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row items-center space-x-8 py-4">
              <Label htmlFor="name" className="text-right">
                Name:
              </Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full flex justify-between items-center"
                  >
                    <span>
                      {selectedServiceOption
                        ? selectedServiceOption.service_name
                        : "Select a service"}
                    </span>
                    <ChevronDown size={16} className="ml-2" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  {serviceOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.id}
                      onClick={() => {
                        setSelectedServiceOption(option);
                      }}
                    >
                      {option.service_name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="secondary"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button
                variant="providerDefault"
                onClick={addService}
                disabled={isLoading}
                className={isLoading ? "relative" : ""}
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-4"></div>
                ) : (
                  "Add Service"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-3/4 p-6">
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

export default OfferedService;

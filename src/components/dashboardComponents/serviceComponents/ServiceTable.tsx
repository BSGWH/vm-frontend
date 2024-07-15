"use client"
import * as React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {Service} from "@/types/service"
import Link from "next/link"
  
const services: Service[] = [
  {
    service_id: 1,
    vehicle: "vehicle 2",
    service_type: "fluid change",
    provider: "test provider",
    service_date: "2024-05-01",
    service_time: "",
    status: "completed",
  },
  {
    service_id: 2,
    vehicle: "vehicle 1",
    service_type: "Wheel Alignments",
    provider: "test provider",
    service_date: "2024-07-01",
    service_time: "",
    status: "upcoming",
  },
  {
      service_id: 3,
      vehicle: "vehicle 1",
      service_type: "Wheel Alignments",
      provider: "test provider",
      service_date: "2024-07-01",
      service_time: "",
      status: "in progress",
    },
];
  export function ServiceTable() {
    const [statusFilter, setStatusFilter] = React.useState("");
    const [vehicleFilter, setVehicleFilter] = React.useState("");
    const [typeFilter, setTypeFilter] = React.useState("");
  
    const filteredServices = services.filter((service) =>
      service.status.toLowerCase().includes(statusFilter.toLowerCase())&&
      service.vehicle.toLowerCase().includes(vehicleFilter.toLowerCase())&&
      service.service_type.toLowerCase().includes(typeFilter.toLowerCase())
    );
  
    return (
      <div className="pt-6 pb-8">
        <div className="flex space-x-4 mb-4">
        <div className="grid w-full max-w-sm items-center gap-1.5"> 
        <Label>Status Filter</Label>
        <Input
          type="text"
          placeholder="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Vehicle Filter</Label>
        <Input
          type="text"
          placeholder="Filter by Vehicle"
          value={vehicleFilter}
          onChange={(e) => setVehicleFilter(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        /></div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label>Service Type Filter</Label>
        <Input
          type="text"
          placeholder="Filter by Service Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        /></div>
      </div>
      
        <Table>
          <TableCaption>A list of service records.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ServiceID</TableHead>
              <TableHead>Vehicle</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Service Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredServices.map((service) => (
              <TableRow key={service.service_id}>
                <TableCell className="font-medium">{service.service_id}</TableCell>
                <TableCell>{service.vehicle}</TableCell>
                <TableCell>{service.service_type}</TableCell>
                <TableCell>{service.service_date}</TableCell>
                <TableCell>{service.status}</TableCell>
                <TableCell>
                  <Link href="/dashboard/services/${params.id}">Details</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
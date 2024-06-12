"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Appointments = {
  appointment_id: string;
  provider_service_id: string;
  customer_id: string;
  appointment_date: string;
  start_time: string;
  end_time: string;
  status: "requested" | "confirmed" | "ongoing" | "completed" | "failed";
};

export const columns: ColumnDef<Appointments>[] = [
  {
    accessorKey: "appointment_date",
    header: "Date",
  },
  {
    accessorKey: "start_time",
    header: "Time",
  },
  {
    accessorKey: "provider_service_id",
    header: "Service",
  },
  {
    accessorKey: "customer_id",
    header: "Customer",
  },
  {
    accessorKey: "appointment_id",
    header: "Price",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

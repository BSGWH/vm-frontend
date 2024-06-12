import { Appointments, columns } from "./columnsDefinition";
import { DataTable } from "./service-data-table";

async function getData(): Promise<Appointments[]> {
  // Fetch data from your API here.
  return [
    {
      appointment_id: "100$",
      provider_service_id: "Oil change",
      customer_id: "Nick Brown",
      appointment_date: "6.12",
      start_time: "11am-12pm",
      end_time: "1",
      status: "confirmed",
    },

    {
      appointment_id: "150$",
      provider_service_id: "Vehicle Inspection",
      customer_id: "Bill Brown",
      appointment_date: "6.12",
      start_time: "2pm-2:45pm",
      end_time: "1",
      status: "confirmed",
    },
    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}

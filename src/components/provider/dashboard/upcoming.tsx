import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Upcoming() {
  const upcomingEvents = [
    {
      name: "Jacob Newman",
      day: "Monday",
      service: "Oil Change",
      time: "9:30 am",
    },
    {
      name: "Bella Holt",
      day: "Tuesday",
      service: "Vehicle Diagnosis",
      time: "3:00 pm",
    },
    {
      name: "Jared Li",
      day: "Thursday",
      service: "Vehicle Inspection",
      time: "11:45 am",
    },
  ];

  return (
    <div className="space-y-5 xlg:space-y-8">
      {upcomingEvents.slice(0, 3).map((event, index) => (
        <UpcomingItem
          key={index}
          name={event.name}
          day={event.day}
          service={event.service}
          time={event.time}
        />
      ))}
    </div>
  );
}

function UpcomingItem({ name, day, service, time }: { name: string; day: string; service: string; time: string; }) {
  return (
    <div className="flex items-center gap-4">
      <Avatar className="flex h-9 w-9 border">
        <AvatarFallback />
      </Avatar>
      <div className="grid grid-cols-3 gap-x-4 gap-y-1">
        <div className="col-span-2 w-[150px]">
          <p className="text-md font-medium leading-none">{name}</p>
        </div>
        <div className="col-span-1 w-[100px] hidden xlg:block">
          <p className="text-md font-medium leading-none text-primaryProvider">{day}</p>
        </div>
        <div className="col-span-2">
          <p className="text-sm text-muted-foreground">{service}</p>
        </div>
        <div className="col-span-1 hidden xlg:block">
          <p className="text-sm text-muted-foreground">{time}</p>
        </div>
      </div>
    </div>
  );
}

export default Upcoming;

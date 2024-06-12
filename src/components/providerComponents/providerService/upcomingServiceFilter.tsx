"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function UpcomingServiceFilter() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="grid w-[600px] grid-cols-5 gap-x-4">
      <Button variant="outline" className="rounded-xl">
        Today
      </Button>

      <Button variant="outline" className="rounded-xl">
        Tomorrow
      </Button>

      <Button variant="outline" className="rounded-xl">
        Week
      </Button>
      <Button variant="outline" className="rounded-xl">
        Month
      </Button>

      {/* <DateRangePicker /> */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="rounded-xl">
            Select date
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

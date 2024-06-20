"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

interface UpcomingServiceFilterProps {
  setSelectedFilter: (filter: string) => void;
}

export default function UpcomingServiceFilter({
  setSelectedFilter,
}: UpcomingServiceFilterProps) {
  const [selectedButton, setSelectedButton] = useState<string>("today");

  const [date, setDate] = useState<DateRange | undefined>(undefined);

  const handleButtonClick = (filter: string) => {
    setSelectedFilter(filter);
    setSelectedButton(filter);
  };

  return (
    <div className="grid w-[700px] grid-cols-6 gap-x-4">
      <Button
        variant={selectedButton === "today" ? "secondary" : "ghost"}
        className="rounded-xl"
        onClick={() => handleButtonClick("today")}
      >
        Today
      </Button>

      <Button
        variant={selectedButton === "tomorrow" ? "secondary" : "ghost"}
        className="rounded-xl"
        onClick={() => handleButtonClick("tomorrow")}
      >
        Tomorrow
      </Button>

      <Button
        variant={selectedButton === "week" ? "secondary" : "ghost"}
        className="rounded-xl"
        onClick={() => handleButtonClick("week")}
      >
        Week
      </Button>

      <Button
        variant={selectedButton === "month" ? "secondary" : "ghost"}
        className="rounded-xl"
        onClick={() => handleButtonClick("month")}
      >
        Month
      </Button>

      <Button
        variant={selectedButton === "all" ? "secondary" : "ghost"}
        className="rounded-xl"
        onClick={() => handleButtonClick("all")}
      >
        All
      </Button>

      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={selectedButton === "dateRange" ? "secondary" : "ghost"}
              className="rounded-xl"
              onClick={() => handleButtonClick("dateRange")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

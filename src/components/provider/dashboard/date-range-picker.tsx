"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import * as React from "react";

export function CalendarDateRangePicker({
  className,
  onDateChange,
}: React.HTMLAttributes<HTMLDivElement> & { onDateChange: (dateRange: { from: Date | undefined; to: Date | undefined }) => void }) {
  const [from, setFrom] = React.useState<Date | undefined>(new Date(2024, 0, 1));
  const [to, setTo] = React.useState<Date | undefined>(new Date(2024, 7, 16));

  const handleDayClick = (day: Date) => {
    if (!from || (from && to)) {
      setFrom(day);
      setTo(undefined);
    } else if (from && !to) {
      if (day.getTime() < from.getTime()) {
        setFrom(day);
        setTo(from);
      } else {
        setTo(day);
      }
    }
  };

  const handlePopoverClose = () => {
    if (from && to) {
      onDateChange({ from, to });
    } else if (from && !to) {
      setTo(from);
      onDateChange({ from, to: from });
    }
  };

  const modifiers = {
    start: from || new Date(0),
    end: to || new Date(0),
    ...(from && to ? { selectedRange: { from, to } } : {}),
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover onOpenChange={(isOpen) => !isOpen && handlePopoverClose()}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"providerOutline"}
            className={cn(
              "w-[220px] justify-start text-left font-normal",
              !from && "text-muted-foreground"
            )}
          >
            {from ? (
              to ? (
                <>
                  {format(from, "LLL dd, y")} - {format(to, "LLL dd, y")}
                </>
              ) : (
                format(from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            mode="single"
            defaultMonth={from}
            selected={from && !to ? from : undefined}
            onDayClick={handleDayClick}
            numberOfMonths={2}
            modifiers={modifiers}
            modifiersStyles={{
              start: {
                borderRadius: '50%',
                backgroundColor: '#A5D6A7',
                color: 'white',
              },
              end: {
                borderRadius: '50%',
                backgroundColor: '#A5D6A7',
                color: 'white',
              },
              selectedRange: {
                
                backgroundColor: '#A5D6A7',
                color: 'black',
              },
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

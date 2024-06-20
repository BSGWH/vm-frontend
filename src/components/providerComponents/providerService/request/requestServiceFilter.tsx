"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function RequestServiceFilter() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="grid w-[600px] grid-cols-5 gap-x-3">
      <Button variant="outline" className="rounded-xl">
        Pending
      </Button>

      <Button variant="outline" className="rounded-xl">
        Approved
      </Button>

      <Button variant="outline" className="rounded-xl">
        Denied
      </Button>
    </div>
  );
}

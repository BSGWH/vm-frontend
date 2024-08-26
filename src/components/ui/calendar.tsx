import * as React from "react";
import { DayPicker, getDefaultClassNames } from "react-day-picker";

import { cn } from "@/lib/utils";

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
};

function Calendar({
  className,
  classNames,
  ...props
}: CalendarProps) {

  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      mode="single"
      showOutsideDays
      captionLayout="dropdown"
      className={cn("p-3", className)}
      classNames={{
        months: "relative",
        month: "space-y-4",
        dropdown: "outline-none",
        caption_label: "hidden",
        nav: "absolute right-0",
        chevron: "${defaultClassNames.chevron} fill-primaryCustomer",
        weekday: "justify-start",
        day: "h-9 w-9 p-0 text-center hover:bg-muted hover:text-muted-foreground rounded-full",
        selected: "bg-primaryCustomer text-primaryCustomer-foreground rounded-full",
        today: "text-primaryCustomer",
        outside: "text-muted-foreground opacity-50",
        disabled: "text-muted-foreground opacity-50",
        ...classNames,
      }}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };

import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface CalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date | undefined) => void;
  serviceDates: Date[];
}

export function Calendar({ selectedDate, onDateSelect, serviceDates }: CalendarProps) {
  return (
    <DayPicker
      mode="single"
      showOutsideDays
      selected={selectedDate}
      onSelect={onDateSelect}
      modifiers={{
        hasServices: serviceDates,
      }}
      modifiersClassNames={{
        hasServices: "relative before:absolute before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:bg-primaryCustomer before:bottom-0 before:left-1/2 before:-translate-x-1/2",
      }}
      classNames={{
        month_caption: "px-2 py-2",
        month: "max-w-full",
        weekdays: "flex flex-row",
        week: "flex flex-row",
        weekday: "h-6 w-10 flex items-center justify-center",
        day: "h-10 w-10 flex items-center justify-center hover:bg-primaryCustomer hover:bg-opacity-50 hover:rounded-full",
        today: `text-primaryCustomer`,
        outside: 'text-gray-300',
        selected: `bg-primaryCustomer text-white rounded-full`,
        root: `${getDefaultClassNames().root} p-0 max-w-fit mx-auto`,
        chevron: `${getDefaultClassNames().chevron} fill-primaryCustomer`,
      }}
    />
  );
}

"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { format, startOfMonth, startOfQuarter, subMonths, isValid, isAfter, isBefore } from "date-fns";

interface DateRangeSelectorProps {
    onDateChange: (range: { from: Date; to: Date } | undefined) => void;
}

export function DateRangeSelector({ onDateChange }: DateRangeSelectorProps) {
    const [selectedOption, setSelectedOption] = React.useState<string>("This Month");
    const [customStartDate, setCustomStartDate] = React.useState<string>("");
    const [isValidDate, setIsValidDate] = React.useState<boolean>(true);
    const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

    React.useEffect(() => {
        handleOptionSelect("This Month");
    }, []);

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);

        let newDateRange: { from: Date; to: Date } | undefined;

        switch (option) {
            case "This Month":
                newDateRange = { from: startOfMonth(new Date()), to: new Date() };
                break;
            case "This Quarter":
                newDateRange = { from: startOfQuarter(new Date()), to: new Date() };
                break;
            case "Past Year":
                newDateRange = { from: subMonths(new Date(), 12), to: new Date() };
                break;
            case "All Time":
                newDateRange = undefined;
                onDateChange(newDateRange);
                return;
            default:
                break;
        }

        if (newDateRange) {
            onDateChange(newDateRange);
        }
    };

    const parseDate = (input: string): Date | null => {
        const parts = input.split('/');
        if (parts.length === 3) {
            const [month, day, year] = parts.map((part) => parseInt(part, 10));
            if (!isNaN(month) && !isNaN(day) && !isNaN(year)) {
                return new Date(year, month - 1, day);
            }
        }
        return null;
    };

    const formatDate = (input: string): string => {
        const cleaned = input.replace(/\D/g, '');
        const match = cleaned.match(/(\d{0,2})(\d{0,2})(\d{0,4})/);
        if (match) {
            const [, mm, dd, yyyy] = match;
            return `${mm}${mm.length === 2 && dd.length ? '/' : ''}${dd}${dd.length === 2 && yyyy.length ? '/' : ''}${yyyy}`;
        }
        return input;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedDate = formatDate(e.target.value);
        setCustomStartDate(formattedDate);
        setIsValidDate(true);
    };

    const handleInputBlur = () => {
        validateDate(customStartDate);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            validateDate(customStartDate);
            if (isValidDate) {
                setMenuOpen(false);
            }
        }
    };

    const validateDate = (input: string) => {
        const parsedDate = parseDate(input);
        const earliestDate = new Date(2023, 0, 1); // 1/1/2023
        const today = new Date();

        if (parsedDate && isValid(parsedDate) && isAfter(parsedDate, earliestDate) && isBefore(parsedDate, today)) {
            onDateChange({ from: parsedDate, to: today });
            setIsValidDate(true);
        } else {
            setIsValidDate(false);
        }
    };

    return (
        <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
            <DropdownMenuTrigger asChild>
                <Button variant="providerOutline" size="lg">
                    {selectedOption === "Start from" && customStartDate
                        ? `From ${customStartDate}`
                        : selectedOption}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleOptionSelect("This Month")}>
                    This Month
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOptionSelect("This Quarter")}>
                    This Quarter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOptionSelect("Past Year")}>
                    Past Year
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleOptionSelect("All Time")}>
                    All Time
                </DropdownMenuItem>
                <div className="pb-2 px-2">
                    <div className="text-sm leading-loose"> Start From: </div>
                    <Input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        value={customStartDate}
                        onChange={handleInputChange}
                        onBlur={handleInputBlur}
                        onKeyDown={handleInputKeyDown}
                        className={`${isValidDate ? 'focus-visible:ring-primaryProvider' : 'border-red-500 focus-visible:ring-0'}`}
                    />
                    {!isValidDate && <div className="text-red-500 text-xs mt-1">Invalid date format</div>}
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

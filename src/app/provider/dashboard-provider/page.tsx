"use client";
import { DateRangeSelector } from "@/components/provider/dashboard/date-range-selector";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upcoming } from "@/components/provider/dashboard/upcoming";
import { Message } from "@/components/provider/dashboard/message";
import { Earning } from "@/components/provider/dashboard/earning-chart";
import { useState } from "react";
import { DateRange } from "react-day-picker";

export default function Page() {
    const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

    const handleDateChange = (newDateRange: DateRange | undefined) => {
        setDateRange(newDateRange);
        console.log("Selected Date Range:", newDateRange);
    };

    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-min px-4">
            <div className="col-span-1 md:col-span-3 h-8 mt-10 ml-4 flex justify-between items-center">
                <h2 className="text-3xl font-bold">Hi, Jack!</h2>
                <DateRangeSelector onDateChange={handleDateChange} />
            </div>

            {/* Overview */}
            <div className="col-span-1 md:col-span-2 flex flex-col items-center">
                <Card className="mt-4 p-4 h-auto md:h-[320px] w-full mx-auto">
                    <CardHeader className="px-4 py-3">
                        <CardTitle className="text-xl">Overview</CardTitle>
                    </CardHeader>

                    <div className="flex flex-col sm:flex-row items-center w-full">
                        <Card className="w-full sm:w-3/5 mb-4 sm:mr-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl">Income</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-row justify-between">
                                    <div className="text-2xl font-bold text-primaryProvider whitespace-nowrap">$ 12320.86</div>
                                    <div className="text-2xl font-bold text-primaryProvider whitespace-nowrap sm:text-right">+ 70%</div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="w-full sm:w-2/5 mb-4 sm:ml-2">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl">Booking</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-row justify-between">
                                    <div className="text-2xl font-bold text-primaryProvider whitespace-nowrap">42</div>
                                    <div className="text-2xl font-bold text-primaryProvider whitespace-nowrap sm:text-right">+ 27%</div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="w-full">
                        <CardHeader className="pb-4">
                            <div className="flex justify-between">
                                <CardTitle className="text-xl">5 New Service Requests</CardTitle>
                                <a href="#" className="text-muted-foreground hover:underline hover:decoration-gray-400">See All</a>
                            </div>
                        </CardHeader>
                    </Card>
                </Card>
            </div>

            {/* Upcoming */}
            <div className="col-span-1 md:col-span-1">
                <Card className="mt-4 p-4 h-auto md:h-[320px] mx-auto">
                    <CardHeader className="py-2 px-3">
                        <div className="flex justify-between">
                            <CardTitle className="text-xl">Upcoming</CardTitle>
                            <a href="#" className="whitespace-nowrap text-muted-foreground hover:underline hover:decoration-gray-400">See All</a>
                        </div>
                    </CardHeader>
                    <CardContent className="p-4">
                        <Upcoming />
                    </CardContent>
                </Card>
            </div>

            {/* Messages */}
            <div className="col-span-1 md:col-span-2">
                <Card className="p-4 h-auto md:h-[340px] mx-auto">
                    <CardHeader className="px-4 py-3">
                        <div className="flex justify-between">
                            <CardTitle className="text-xl">Messages</CardTitle>
                            <a href="#" className="text-muted-foreground hover:underline hover:decoration-gray-400">See All</a>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Message />
                    </CardContent>
                </Card>
            </div>

            {/* Earning */}
            <div className="col-span-1 pb-4">
                <Card className="p-4 h-auto md:h-[340px] mx-auto">
                    <CardHeader className="px-4 py-3">
                        <CardTitle className="text-xl">Earning</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Earning dateRange={dateRange} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

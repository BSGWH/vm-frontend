"use client";

import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import * as Tabs from '@radix-ui/react-tabs';

export default function Page() {
    const [selectedTab, setSelectedTab] = useState<string>('monthly');

    return (
        <div className='flex flex-col h-full w-full p-8 items-center'>
            <h1 className='text-3xl font-bold leading-loose py-4'>Your Total Cost Trend</h1>

            <Tabs.Root defaultValue="monthly" onValueChange={setSelectedTab} className='w-full h-full'>
                <Tabs.List className="flex border-b justify-center">
                    <Tabs.Trigger
                        value="monthly"
                        className={`px-4 py-2 w-[150px] ${selectedTab === 'monthly' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                    >
                        Monthly
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="quarterly"
                        className={`px-4 py-2 w-[150px] ${selectedTab === 'quarterly' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                    >
                        Quarterly
                    </Tabs.Trigger>
                    <Tabs.Trigger
                        value="yearly"
                        className={`px-4 py-2 w-[150px] ${selectedTab === 'yearly' ? 'text-blue-600 border-b-2 border-blue-600' : ''}`}
                    >
                        Yearly
                    </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="monthly" className='h-4/5 py-8 w-full'>
                    <Overview dataType="monthly" />
                </Tabs.Content>

                <Tabs.Content value="quarterly" className='h-4/5 py-8 w-full'>
                    <Overview dataType="quarterly" />
                </Tabs.Content>

                <Tabs.Content value="yearly" className='h-4/5 py-8 w-full'>
                    <Overview dataType="yearly" />
                </Tabs.Content>
            </Tabs.Root>
        </div>
    );
}

interface DataPoint {
    date: string;
    total: number;
}

interface ChartData {
    name: string;
    total: number;
}

const rawData: DataPoint[] = [
    { date: '2023-01', total: 3200 },
    { date: '2023-02', total: 4300 },
    { date: '2023-03', total: 5400 },
    { date: '2023-04', total: 2900 },
    { date: '2023-05', total: 6300 },
    { date: '2023-06', total: 7100 },
    { date: '2023-07', total: 8300 },
    { date: '2023-08', total: 9000 },
    { date: '2023-09', total: 4000 },
    { date: '2023-10', total: 6500 },
    { date: '2023-11', total: 5600 },
    { date: '2023-12', total: 4800 },
    { date: '2024-01', total: 5100 },
    { date: '2024-02', total: 6200 },
    { date: '2024-03', total: 7300 },
    { date: '2024-04', total: 4100 },
    { date: '2024-05', total: 5200 },
    { date: '2024-06', total: 6400 },
    { date: '2024-07', total: 7600 },
    { date: '2024-08', total: 8500 },
];

function generateData(dataType: string): ChartData[] {
    if (dataType === "monthly") {
        return rawData.map(entry => ({
            name: entry.date,
            total: entry.total
        }));
    } else if (dataType === "quarterly") {
        const quarterlyData: ChartData[] = [];
        for (let i = 0; i < rawData.length; i += 3) {
            const quarterTotal = rawData.slice(i, i + 3).reduce((sum, entry) => sum + entry.total, 0);
            const year = rawData[i].date.split('-')[0];
            const quarterNumber = Math.floor((i % 12) / 3) + 1;
            const quarter = `Q${quarterNumber}`;
            quarterlyData.push({
                name: `${year} ${quarter}`,
                total: quarterTotal,
            });
        }
        return quarterlyData;
    } else if (dataType === "yearly") {
        const yearlyData: ChartData[] = rawData.reduce((acc: ChartData[], entry) => {
            const year = entry.date.split('-')[0];
            const foundYear = acc.find(data => data.name === year);
            if (foundYear) {
                foundYear.total += entry.total;
            } else {
                acc.push({ name: year, total: entry.total });
            }
            return acc;
        }, []);
        return yearlyData;
    }
    return [];
}

function Overview({ dataType }: { dataType: string }) {
    const data = generateData(dataType);

    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar dataKey="total" fill="hsl(221.2, 83.2%, 53.3%)" radius={[4, 4, 0, 0]} />
            </BarChart>
        </ResponsiveContainer>
    );
}
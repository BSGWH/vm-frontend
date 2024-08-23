import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { DateRange } from 'react-day-picker';
import { format, eachMonthOfInterval } from 'date-fns';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export function Earning({ dateRange }: { dateRange: DateRange | undefined }) {
    const fullData = {
        labels: [
            'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023', 'Jul 2023', 'Aug 2023',
            'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023',
            'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024', 'Jun 2024', 'Jul 2024', 'Aug 2024'
        ],
        datasets: [
            {
                label: 'Earnings',
                data: [3287, 4298, 5982, 5938, 6834, 7343, 8343, 8534, 9384, 9874, 10423, 11234,
                    1387, 2398, 3982, 3938, 4834, 5343, 6343, 6534],
                backgroundColor: '#16a34a',
            },
        ],
    };

    const filteredLabels = dateRange && dateRange.from && dateRange.to
        ? eachMonthOfInterval({
            start: dateRange.from,
            end: dateRange.to,
        }).map((date) => format(date, 'MMM yyyy'))
        : fullData.labels;

    const filteredData = {
        labels: filteredLabels,
        datasets: fullData.datasets.map((dataset) => {
            const startIndex = fullData.labels.indexOf(filteredLabels[0]);
            const endIndex = fullData.labels.indexOf(filteredLabels[filteredLabels.length - 1]) + 1;
            return {
                ...dataset,
                data: dataset.data.slice(startIndex, endIndex),
            };
        }),
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top' as const,
                align: 'end' as const,
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                stacked: true,
            },
        },
    };

    return (
        <div className="h-[260px]">
            <Bar data={filteredData} options={options} />
        </div>
    );
}

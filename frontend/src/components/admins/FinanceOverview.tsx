import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
    responsive: true,
    plugins: {
        legend: { position: 'top' as const,},
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Income',
            data: [41000, 20000, 60000, 250000, 600000, 100000, 200000, 300000, 400000, 500000, 600000, 700000],
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Expenses',
            data: [10000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000, 110000, 120000],
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

export default function FinanceOverview() {
    return <Bar options={options} data={data} />;
}
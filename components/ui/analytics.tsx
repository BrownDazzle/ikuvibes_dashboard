// components/Analytics.tsx
"use client"
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface AnalyticsProps {
    data: number[];
    labels: string[];
}

const Analytics: React.FC<AnalyticsProps> = ({ data, labels }) => {
    const chartData = {
        labels,
        datasets: [
            {
                label: 'Downloads',
                data,
                backgroundColor: 'rgba(75,192,192,0.6)',
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Downloads Analytics</h2>
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};

export default Analytics;

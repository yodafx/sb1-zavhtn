import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const VolatilityGraph: React.FC = () => {
  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);
  
  const data = {
    labels: hours,
    datasets: [
      {
        label: 'Market Volatility',
        data: [
          30, 25, 20, 15, 10, 15, 20, 30, 50, 70, 80, 85,
          90, 95, 100, 98, 95, 90, 85, 75, 65, 55, 45, 35
        ],
        fill: true,
        backgroundColor: 'rgba(147, 51, 234, 0.2)',
        borderColor: 'rgba(147, 51, 234, 1)',
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default VolatilityGraph;
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement);

const SalesGrowthChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/orders/sales-growth');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching sales growth data:', error);
      }
    };
    fetchData();
  }, []);

  const formatData = (growthData) => {
    const labels = growthData.map(item => item._id);
    const values = growthData.map(item => item.growthRate);

    return {
      labels,
      datasets: [{
        label: 'Sales Growth Rate',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)', // Line color
        backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color for the area under the line
        tension: 0.1, // Slight curve to the line
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
        pointBorderColor: '#fff', // Point border color
        pointHoverBackgroundColor: '#fff', // Hover point color
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Hover point border color
        fill: false, // No fill, line graph only
      }],
    };
  };

  // Example data if the API call fails or to show how it would look with actual data
  const exampleData = [
    { _id: '2023-01-01', growthRate: 5 },
    { _id: '2023-02-01', growthRate: 7 },
    { _id: '2023-03-01', growthRate: 10 },
    { _id: '2023-04-01', growthRate: 12 },
    { _id: '2023-05-01', growthRate: 8 },
    { _id: '2023-06-01', growthRate: 15 },
  ];

  return (
    <div>
      <h2>Sales Growth Rate Over Time</h2>
      <Line data={formatData(data.length > 0 ? data : exampleData)} options={{ responsive: true }} />
    </div>
  );
};

export default SalesGrowthChart;

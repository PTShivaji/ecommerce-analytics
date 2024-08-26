import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TotalSalesChart = () => {
  const [data, setData] = useState({ daily: [], monthly: [], quarterly: [], yearly: [] });

  useEffect(() => {
    // Simulate fetching data from API
    const simulatedData = {
      daily: [
        { _id: '2024-08-20', totalSales: 1500 },
        { _id: '2024-08-21', totalSales: 2000 },
        { _id: '2024-08-22', totalSales: 1800 },
      ],
      monthly: [
        { _id: '2024-07', totalSales: 45000 },
        { _id: '2024-08', totalSales: 62000 },
      ],
      quarterly: [
        { _id: '2024-Q2', totalSales: 120000 },
        { _id: '2024-Q3', totalSales: 180000 },
      ],
      yearly: [
        { _id: '2023', totalSales: 400000 },
        { _id: '2024', totalSales: 600000 },
      ],
    };

    setData(simulatedData);
  }, []);

  const formatData = (salesData) => {
    const labels = salesData.map(item => item._id); // Use the appropriate key for dates/timestamps
    const values = salesData.map(item => item.totalSales); // Use the appropriate key for total sales

    return {
      labels,
      datasets: [{
        label: 'Total Sales',
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)', // Bar fill color
        borderColor: 'rgba(75, 192, 192, 1)', // Bar border color
        borderWidth: 1, // Bar border width
        hoverBackgroundColor: 'rgba(75, 192, 192, 0.8)', // Hover fill color
        hoverBorderColor: 'rgba(75, 192, 192, 1)', // Hover border color
      }],
    };
  };

  return (
    <div>
      <h2>Total Sales Over Time</h2>
      <h3>Daily Sales</h3>
      <Bar data={formatData(data.daily)} options={{ responsive: true }} />
      <h3>Monthly Sales</h3>
      <Bar data={formatData(data.monthly)} options={{ responsive: true }} />
      <h3>Quarterly Sales</h3>
      <Bar data={formatData(data.quarterly)} options={{ responsive: true }} />
      <h3>Yearly Sales</h3>
      <Bar data={formatData(data.yearly)} options={{ responsive: true }} />
    </div>
  );
};

export default TotalSalesChart;




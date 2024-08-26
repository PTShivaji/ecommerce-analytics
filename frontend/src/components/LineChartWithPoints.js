// src/components/LineChartWithPoints.js
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(LineElement, PointElement, LineController, CategoryScale, LinearScale, Title, Tooltip, Legend);

const LineChartWithPoints = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    // Fetch data from your API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/orders/total-sales');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Prepare chart data
        const labels = data.map(item => item.date); // Adjust based on your API response
        const salesData = data.map(item => item.totalSales); // Adjust based on your API response

        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Total Sales',
              data: salesData,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              pointRadius: 5,  // Size of the points
              pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Color of the points
              pointBorderColor: '#fff',
              pointHoverRadius: 7,
              pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Total Sales Over Time</h2>
      <Line data={chartData} options={{
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day'  // Can be 'month', 'year', etc. depending on your data granularity
            },
            title: {
              display: true,
              text: 'Date'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Total Sales'
            },
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
        interaction: {
          mode: 'index',
          intersect: false,
        },
      }} />
    </div>
  );
};

export default LineChartWithPoints;

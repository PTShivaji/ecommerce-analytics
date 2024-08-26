import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);

const LifetimeValueChart = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    // Mock data to simulate fetching from API
    const mockData = {
      'Jan 2023': 500,
      'Feb 2023': 600,
      'Mar 2023': 550,
      'Apr 2023': 700,
      'May 2023': 800,
    };

    // Set mock data to state
    setData(mockData);

    const fetchData = async () => {
      try {
        const response = await fetch('/api/customers/lifetime-value');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching lifetime value data:', error);
      }
    };
    fetchData();
    
  }, []);

  // Transform the data into a format suitable for Chart.js
  const formatData = (clvData) => {
    const cohorts = Object.keys(clvData); // Cohort months
    const clvValues = cohorts.map(cohort => clvData[cohort]);

    return {
      labels: cohorts,
      datasets: [{
        label: 'Customer Lifetime Value by Cohort',
        data: clvValues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
        tension: 0.4, // Add some curve to the line
        pointBackgroundColor: 'rgba(75, 192, 192, 1)', // Point color
        pointBorderColor: '#fff', // Point border color
        pointHoverBackgroundColor: '#fff', // Hover point color
        pointHoverBorderColor: 'rgba(75, 192, 192, 1)', // Hover point border color
      }],
    };
  };

  return (
    <div>
      <h2>Customer Lifetime Value by Cohorts</h2>
      <Line
        data={formatData(data)}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Customer Lifetime Value by Cohorts',
            },
            legend: {
              position: 'top',
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: 'Cohorts',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Lifetime Value',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default LifetimeValueChart;

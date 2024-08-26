import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const RepeatCustomersChart = () => {
  const [data, setData] = useState({ daily: [], monthly: [], quarterly: [], yearly: [] });

  useEffect(() => {
    // Mock data to simulate fetching from API
    const mockData = {
      daily: [
        { _id: '2024-08-01', repeatCustomers: 3 },
        { _id: '2024-08-02', repeatCustomers: 5 },
        { _id: '2024-08-03', repeatCustomers: 2 },
        { _id: '2024-08-04', repeatCustomers: 7 },
        { _id: '2024-08-05', repeatCustomers: 4 },
      ],
      monthly: [
        { _id: '2024-07', repeatCustomers: 20 },
        { _id: '2024-08', repeatCustomers: 30 },
      ],
      quarterly: [
        { _id: 'Q1-2024', repeatCustomers: 60 },
        { _id: 'Q2-2024', repeatCustomers: 90 },
      ],
      yearly: [
        { _id: '2023', repeatCustomers: 250 },
        { _id: '2024', repeatCustomers: 300 },
      ],
    };

    // Set mock data to state
    setData(mockData);

    
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customers/repeat-customers');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching repeat customers data:', error);
      }
    };
    fetchData();
    
  }, []);

  const formatData = (repeatData) => {
    const labels = repeatData.map(item => item._id);
    const values = repeatData.map(item => item.repeatCustomers);

    return {
      labels,
      datasets: [{
        label: 'Repeat Customers',
        data: values,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true, // Enable area fill under the line
        tension: 0.4, // Add some curve to the line
        pointBackgroundColor: 'rgba(255, 99, 132, 1)', // Point color
        pointBorderColor: '#fff', // Point border color
        pointHoverBackgroundColor: '#fff', // Hover point color
        pointHoverBorderColor: 'rgba(255, 99, 132, 1)', // Hover point border color
      }],
    };
  };

  return (
    <div>
      <h2>Number of Repeat Customers</h2>
      <div style={{ marginBottom: '20px' }}>
        <h3>Daily</h3>
        <Line data={formatData(data.daily)} options={{ responsive: true }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Monthly</h3>
        <Line data={formatData(data.monthly)} options={{ responsive: true }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Quarterly</h3>
        <Line data={formatData(data.quarterly)} options={{ responsive: true }} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <h3>Yearly</h3>
        <Line data={formatData(data.yearly)} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default RepeatCustomersChart;

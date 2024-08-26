import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const NewCustomersChart = () => {
  const [data, setData] = useState({ daily: [], monthly: [], quarterly: [], yearly: [] });

  useEffect(() => {
    // Mock data to simulate fetching from API
    const mockData = {
      daily: [
        { _id: '2024-08-01', newCustomers: 5 },
        { _id: '2024-08-02', newCustomers: 8 },
        { _id: '2024-08-03', newCustomers: 12 },
        { _id: '2024-08-04', newCustomers: 6 },
        { _id: '2024-08-05', newCustomers: 7 },
      ],
      monthly: [
        { _id: '2024-07', newCustomers: 30 },
        { _id: '2024-08', newCustomers: 45 },
      ],
      quarterly: [
        { _id: 'Q1-2024', newCustomers: 100 },
        { _id: 'Q2-2024', newCustomers: 150 },
      ],
      yearly: [
        { _id: '2023', newCustomers: 500 },
        { _id: '2024', newCustomers: 600 },
      ],
    };

    // Set mock data to state
    setData(mockData);

    
    const fetchData = async () => {
      try {
        const response = await fetch('/api/customers/new-customers');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching new customers data:', error);
      }
    };
    fetchData();
    
  }, []);

  const formatData = (customerData) => {
    const labels = customerData.map(item => item._id);
    const values = customerData.map(item => item.newCustomers);

    return {
      labels,
      datasets: [{
        label: 'New Customers',
        data: values,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true, // Enable area fill under the line
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
      <h2>New Customers Added Over Time</h2>
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

export default NewCustomersChart;


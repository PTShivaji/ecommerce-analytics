import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale, PointElement, Filler);

const GeographicalDistributionChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Mock data to simulate fetching from API
    const mockData = [
      { _id: 'New York', count: 121 },
      { _id: 'Los Angeles', count: 81 },
      { _id: 'Chicago', count: 70 },
      { _id: 'Houston', count: 90 },
      { _id: 'Phoenix', count: 60 },
    ];

    // Set mock data to state
    setData(mockData);

    const fetchData = async () => {
      try {
        const response = await fetch('/api/customers/geographical-distribution');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching geographical distribution data:', error);
      }
    };
    fetchData();
    
  }, []);

  const formatData = (geoData) => {
    const labels = geoData.map(item => item._id);
    const values = geoData.map(item => item.count);

    return {
      labels,
      datasets: [{
        label: 'Customer Distribution',
        data: values,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true, // Enable area fill under the line
        tension: 0.4, // Add some curve to the line
        pointBackgroundColor: 'rgba(54, 162, 235, 1)', // Point color
        pointBorderColor: '#fff', // Point border color
        pointHoverBackgroundColor: '#fff', // Hover point color
        pointHoverBorderColor: 'rgba(54, 162, 235, 1)', // Hover point border color
      }],
    };
  };

  return (
    <div>
      <h2>Geographical Distribution of Customers</h2>
      <Line data={formatData(data)} options={{ responsive: true }} />
    </div>
  );
};

export default GeographicalDistributionChart;

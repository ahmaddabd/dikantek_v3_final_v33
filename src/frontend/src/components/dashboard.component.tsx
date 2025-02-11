import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const Dashboard = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get('/api/analytics/sales-report?timeFrame=monthly')
      .then(response => setSalesData(response.data))
      .catch(error => console.error(error));
  }, []);

  const chartData = {
    labels: salesData.map(data => data.date),
    datasets: [
      {
        label: 'Revenue',
        data: salesData.map(data => data.totalRevenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div>
      <h2>Sales Dashboard</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default Dashboard;

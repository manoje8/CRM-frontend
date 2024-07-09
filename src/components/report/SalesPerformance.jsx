import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';

import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, plugins } from "chart.js"
import ExportCSV from './ExportCSV';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, scales, plugins)



const SalesPerformance = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/reports/sales-by-month`)
      .then(response => setSalesData(response.data))
      .catch(error => console.error('Error fetching sales data:', error));
  }, []);

  const data = {
    labels: salesData.map(sale => `${sale._id.month}/${sale._id.year}`),
    datasets: [
      {
        label: 'Total Sales',
        data: salesData.map(sale => sale.totalSales),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const graphStyle = {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    height: "400px",
    width: "700px",
    fontFamily: "sans-serif",
    }

  return (
    <div className='container' style={graphStyle}>
      <Line data={data} />
      <ExportCSV data={salesData}/>
    </div>
  );
};

export default SalesPerformance;

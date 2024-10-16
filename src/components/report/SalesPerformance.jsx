import { Pie, Bar } from 'react-chartjs-2';

import { Chart, CategoryScale, LinearScale, PointElement, ArcElement, BarElement, Title, Tooltip, Legend, scales, plugins } from "chart.js"
import ExportCSV from './ExportCSV';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

Chart.register(CategoryScale, LinearScale, PointElement, ArcElement,BarElement, Title, Tooltip, Legend, scales, plugins)



const SalesPerformance = ({customers}) => {
  const {role} = useContext(AuthContext)

  let sourceObj = {
    'none': 0,
    'website form': 0,
    'social media': 0,
    'referral': 0,
    'marketing campign': 0
  }

  let statusObj = {
    'none': 0,
    'contacted': 0,
    'not contacted': 0,
    'contact in future': 0,
    'qualified': 0,
    'not qualified': 0,
    'lost': 0
  }

  // Status counts
  const leadStatusCounts = customers.length > 0 ? customers.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, statusObj): [];

  // Source counts
  const leadSourceCounts = customers.length > 0 ? customers.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1
    return acc;
  }, sourceObj): []



  const leadData = {
    labels: Object.keys(leadStatusCounts),
    datasets: [
      {
        label: 'Leads by Status',
        data: Object.values(leadStatusCounts),
        fill: false,
        backgroundColor: ['#219ebc', '#bde0fe', '#003049', '#ffddd2', '#2a9d8f','#ef233c','#b392ac'],
      },
    ],
  };

  const leadSource = {
    labels: Object.keys(leadSourceCounts),
    datasets: [
        {
            label: 'Leads by source',
            data: Object.values(leadSourceCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', "#2a9d8f", "#b3924c"],
        },
    ],
  }


const barOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: 'top',
      labels: {
        font: {
          size: 16,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          weight: 'bold',
        },
        color: '#4B5563',
        boxWidth: 20,
        padding: 20,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 18,
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      },
      bodyFont: {
        size: 16,
        family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      },
      bodySpacing: 6,
      padding: 10,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#4B5563',
        font: {
          size: 14,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
      },
    },
    y: {
      grid: {
        color: '#e0e0e0',
        borderDash: [3, 3],
      },
      ticks: {
        color: '#4B5563',
        font: {
          size: 14,
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        },
        beginAtZero: true,
      },
    },
  },
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        font: {
          size: 14, // Adjust the size as needed
          family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          weight: 'bold',
        },
        color: '#4B5563',
        boxWidth: 20,
        padding: 15,
      },
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      titleFont: {
        size: 16,
      },
      bodyFont: {
        size: 14,
      },
      bodySpacing: 6,
      padding: 10,
    },
    datalabels: {
      color: '#333',
      font: {
        size: 14,
        weight: 'bold',
      },
      formatter: (value, context) => {
        const label = context.chart.data.labels[context.dataIndex];
        return `${label}: ${value}`;
      },
    },
  },
  layout: {
    padding: {
      top: 20,
      bottom: 20,
    },
  },
  animation: {
    animateScale: true,
    animateRotate: true,
  },
}
 

  const chartContainerStyle  = {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  }

  const graphContainerStyle = {
    margin: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)"
  }

  return (
    <div style={graphContainerStyle}>
      <ExportCSV leadSource={leadSourceCounts}/>
      <div style={chartContainerStyle}>
        <div style={{ flex: 1 , height: "400px"}}>
          <Pie options={pieOptions} data={leadData} />
        </div>
        {role !== "employee" && (
          <div style={{ flex: 1 }}>
            <Bar options={barOptions} data={leadSource} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SalesPerformance;

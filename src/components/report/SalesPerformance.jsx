import { Line, Bar } from 'react-chartjs-2';

import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, scales, plugins } from "chart.js"
import ExportCSV from './ExportCSV';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement,BarElement, Title, Tooltip, Legend, scales, plugins)



const SalesPerformance = ({customers}) => {
  const {role} = useContext(AuthContext)

  // Status counts
  const leadStatusCounts = customers.length > 0 ? customers.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {}): [];

  // Source counts
  const leadSourceCounts = customers.length > 0 ? customers.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1
    return acc;
  }, {}): []



  const leadData = {
    labels: Object.keys(leadStatusCounts),
    datasets: [
      {
        label: 'Leads by Status',
        data: Object.values(leadStatusCounts),
        fill: false,
        backgroundColor: ['#219ebc', '#bde0fe', '#003049'],
      },
    ],
  };

  const leadSource = {
    labels: Object.keys(leadSourceCounts),
    datasets: [
        {
            label: 'Leads by source',
            data: Object.values(leadSourceCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
    ],
  }

  const barOptions = {
    barThickness: 20,
};
 

  const graphStyle = {
    display: "flex",
    gap: "1.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
    height: "400px",
    width: "700px",
    fontFamily: "sans-serif",
    }

  return (
    <div className='container' style={graphStyle}>
      <Line data={leadData} />

      {/* Admin and manager can see lead source chart */}
      {role !== "employee" ? <Bar options={barOptions} data={leadSource}/>: ""}
      
      <ExportCSV leadSource={leadSourceCounts}/>
    </div>
  );
};

export default SalesPerformance;

import { CSVLink } from 'react-csv';

const ExportCSV = ({ leadSource}) => {
  // Export source data
  const headers = [
    { label: "Lead Source", key: "source" },
    { label: "Count", key: "count" }
  ];

  const csvData = Object.keys(leadSource).map((source) => ({
    source: source,
    count: leadSource[source]
  }));
  

  return (
    <CSVLink data={csvData} headers={headers} filename={"sales-report.csv"}>
      <button className='btn btn-success'>Export to CSV</button>
    </CSVLink>
  );
};

export default ExportCSV;

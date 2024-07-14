import { CSVLink } from 'react-csv';

const ExportCSV = ({ data }) => {
  const headers = [
    { label: "Month/Year", key: "monthYear" },
    { label: "Total Sales", key: "totalSales" }
  ];


  const csvData = data.map(sale => ({
    monthYear: `${sale._id.month}/${sale._id.year}`,
    totalSales: sale.totalSales
  }));

  return (
    <CSVLink data={csvData} headers={headers} filename={"sales-report.csv"}>
      <button className='btn btn-success'>Export to CSV</button>
    </CSVLink>
  );
};

export default ExportCSV;

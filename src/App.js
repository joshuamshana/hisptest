import { useEffect, useState } from "react";
import TableHeader from "./components/TableHeader";
import { table_headers, table_rows } from "./services/table";
import data from "./data/hisp";
import "./styles.css";
import TableRows from "./components/TableRows";

export default function App() {
  const [headers, setHeaders] = useState([]);
  const [rows, setRows] = useState([]);
  useEffect(() => {
    setHeaders(table_headers(data));
    setRows(table_rows(data));
  }, []);
  return (
    <div className="App">
      <table>
        <TableHeader headers={headers} />
        <TableRows headers={headers} rows={rows} />
      </table>
    </div>
  );
}

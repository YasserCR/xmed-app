import { TableCell, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import DataTable from "../components/data-table";
import { formatDate } from "../utils/date";
import { toShortText } from "../utils/text";

// columns puede incluir un formateador configurable
// tambien puede incluir style y sx para definir que campos de deben mostrar en responsive
const columns = [
  { id: "id", label: "ID" },
  { id: "diagnosis", label: "Diagnóstico" },
  {
    id: "symptoms",
    label: "Síntomas",
    format: (text) => toShortText(text, 18),
  },
  { id: "issuedOn", label: "Fecha", format: formatDate },
];

function formatter(row, columns) {
  return columns.map((column) => {
    const value = row[column.id];
    return (
      <TableCell key={column.id} align={column.align} sx={column.sx}>
        {column.format ? column.format(value) : value}
      </TableCell>
    );
  });
}

const RecordsPage = () => {
  const records = useLoaderData();
  return (
    <DataTable
      rowFormatter={formatter}
      columns={columns}
      data={records}
      tableTitle={
        <Typography component="h2" sx={{
          color:"#26C08B",
          fontSize: { 
              xs: "2rem",
              sm: "2rem",  
              md: "2.5rem",
              lg: "3rem", 
              xl: "4rem"  
          }
        }} variant="h2">
            Mis expedientes
        </Typography>
      }
    />
  );
};

export default RecordsPage;

import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";

const rows = [];
class Exercises extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Title>Test</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
              <TableCell>Test</TableCell>
              <TableCell align="right">Test</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.shipTo}</TableCell>
                <TableCell>{row.paymentMethod}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </React.Fragment>
    );
  }
}

export default Exercises;

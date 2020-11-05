import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { selectPrecision, selectRecall, selectF1 } from "../metricsSlice";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const MetricsTable: React.FC = () => {
  const classes = useStyles();
  const precision = useSelector(selectPrecision).toFixed(3);
  const recall = useSelector(selectRecall).toFixed(3);
  const F1 = useSelector(selectF1).toFixed(3);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow key={1}>
            <TableCell component="th" scope="row">
              F1 Score
            </TableCell>
            <TableCell align="right">{F1}</TableCell>
          </TableRow>
          <TableRow key={2}>
            <TableCell component="th" scope="row">
              Precision
            </TableCell>
            <TableCell align="right">{precision}</TableCell>
          </TableRow>
          <TableRow key={3}>
            <TableCell component="th" scope="row">
              Recall
            </TableCell>
            <TableCell align="right">{recall}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MetricsTable;

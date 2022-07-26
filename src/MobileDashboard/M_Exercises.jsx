import React, { useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Context } from "../Store";
import EditExerciseModal from "./EditExerciseModal";
import ConfirmDialog from "./ConfirmDialog";

function MobileExercises() {
  const [state, dispatch] = useContext(Context);

  return (
    <Table size="small">
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Weight</TableCell>
          <TableCell>Reps</TableCell>
          <TableCell></TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state.exercises.map((exercise) => (
          <TableRow key={exercise.Id}>
            <TableCell>{exercise.Exercise_Name}</TableCell>
            <TableCell>{exercise.Weight}</TableCell>
            <TableCell>{exercise.Reps}</TableCell>
            <TableCell>
              <EditExerciseModal id={exercise.Id} />
            </TableCell>
            <TableCell>
              <ConfirmDialog id={exercise.Id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default MobileExercises;

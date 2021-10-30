import React, { useContext, useState, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Context } from "../Store";
import EditExercise from "./EditExercise";
import ConfirmDialog from "./ConfirmDialog";

function Exercises() {
  const [state, dispatch] = useContext(Context);
  const [isEditing, setEditing] = useState(false);
  const [exerciseId, setId] = useState("");

  const handleEdit = (id) => {
    setId(id);
    setEditing(!isEditing);
  };

  return isEditing ? (
    <EditExercise handleEdit={handleEdit} id={exerciseId} />
  ) : (
    <React.Fragment>
      <Title>Exercises</Title>
      
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Type</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Weight</TableCell>
            <TableCell>Reps</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Notes</TableCell>
            <TableCell />
            <TableCell />
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {state.exercises.map((exercise) => (
            <TableRow key={exercise.Id}>
              <TableCell>{exercise.Type}</TableCell>
              <TableCell>{exercise.Exercise_Name}</TableCell>
              <TableCell>{exercise.Weight}</TableCell>
              <TableCell>{exercise.Reps}</TableCell>
              <TableCell>{exercise.Status_Name}</TableCell>
              <TableCell>{exercise.UserNotes}</TableCell>
              <TableCell align="right">
                <IconButton
                  color="inherit"
                  onClick={() => handleEdit(exercise.Id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right"></TableCell>
              <TableCell>
                <ConfirmDialog id={exercise.Id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </React.Fragment>
  );
}

export default Exercises;

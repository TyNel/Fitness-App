import React, { useContext, useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import IconButton from "@mui/material/IconButton";
import { Context } from "../Store";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { UpdateExercise } from "../Services/UserServices";

function Edit_Exercises(props) {
  const EDIT_STATE = {
    Id: "",
    UserId: "",
    Exercise_Name: "",
    Weight: 0,
    Reps: 0,
    Exercise_Type: "",
    Status_Id: "",
    UserNotes: "",
  };

  const statusValue = [
    { value: 1, label: "Completed" },
    { value: 2, label: "Not Completed" },
  ];

  const [state, dispatch] = useContext(Context);
  const [edit, setEdit] = useState(EDIT_STATE);
  const [editedState, setData] = useState(state.exercises);
  const handleEdit = props.handleEdit;
  const id = props.id;

  const handleInput = (e) => {
    if (e.target.name === "Weight" || e.target.name === "Reps") {
      setEdit({
        ...edit,
        [e.target.name]: parseInt(e.target.value),
      });
    }

    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };
  console.log(state.exercises);

  const handleSubmit = () => {
    UpdateExercise(edit)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  const onSubmitSuccess = (response) => {
    dispatch({ type: "SET_EXERCISES", payload: editedState });
    handleEdit();
  };

  useEffect(() => {
    let currentExercise = state.exercises.filter((e) => {
      return e.Id === id.id;
    });
    setEdit({
      ...edit,
      Id: currentExercise[0].Id,
      UserId: currentExercise[0].UserId,
      Exercise_Name: currentExercise[0].Exercise_Name,
      Weight: currentExercise[0].Weight,
      Reps: currentExercise[0].Reps,
      UserNotes: currentExercise[0].UserNotes,
      Status_Id: currentExercise[0].Status_Id,
      Exercise_Type: currentExercise[0].Exercise_Type,
    });
  }, []);

  console.log(edit);

  return (
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
          <TableRow>
            <TableCell>
              <TextField
                select
                size="small"
                name="Exercise_Type"
                fullWidth
                value={edit.Exercise_Type}
                onChange={handleInput}
              >
                {state.type.map((type) => {
                  return (
                    <MenuItem key={type.Id} value={type.Id}>
                      {type.Type}
                    </MenuItem>
                  );
                })}
              </TextField>
            </TableCell>
            <TableCell>
              <TextField
                value={edit.Exercise_Name}
                name="Exercise_Name"
                onChange={handleInput}
                size="small"
                fullWidth
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                value={edit.Weight}
                type="number"
                name="Weight"
                onChange={handleInput}
                size="small"
              />
            </TableCell>
            <TableCell>
              <TextField
                value={edit.Reps}
                type="number"
                name="Reps"
                onChange={handleInput}
                size="small"
              />
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                select
                name="Status_Id"
                value={edit.Status_Id}
                fullWidth
                onChange={handleInput}
              >
                {statusValue.map((status) => {
                  return (
                    <MenuItem key={status.value} value={status.value}>
                      {status.label}
                    </MenuItem>
                  );
                })}
                ;
              </TextField>
            </TableCell>
            <TableCell>
              <TextField
                value={edit.UserNotes}
                name="UserNotes"
                onChange={handleInput}
                size="small"
              />
            </TableCell>
            <TableCell align="right">
              <IconButton color="inherit" onClick={handleSubmit}>
                <CheckIcon />
              </IconButton>
            </TableCell>
            <TableCell align="right"></TableCell>
            <TableCell>
              <IconButton onClick={handleEdit}>
                <ClearIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </React.Fragment>
  );
}

export default Edit_Exercises;

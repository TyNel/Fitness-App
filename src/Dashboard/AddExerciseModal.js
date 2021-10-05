import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Context } from "../Store";
import Button from "@mui/material/Button";
import { AddExercise } from "../Services/UserServices";
import { useParams } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  spacing: 4,
};

export default function AddExerciseModal(props) {
  const INITIAL_STATE = {
    userId: null,
    exercise_name: "",
    weight: "",
    reps: "",
    exercise_type: "",
    status_id: "",
    userNotes: "",
    dateAdded: "",
    dateModified: "",
  };

  const statusValue = [
    { value: 1, label: "Completed" },
    { value: 2, label: "Not Completed" },
  ];

  const [state] = useContext(Context);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [exercise, setExercise] = useState(INITIAL_STATE);
  const { id } = useParams();

  const handleChange = (e) => {
    setExercise({
      ...exercise,
      [e.target.name]: e.target.value,
      dateAdded: state.dateClicked,
      dateModified: state.dateClicked,
      userId: id,
    });
  };

  const handleSubmit = (e) => {
    AddExercise(exercise).then(onSubmitSuccess).catch(onSubmitError);
  };

  const onSubmitSuccess = (response) => {
    console.log(response);
  };

  const onSubmitError = (response) => {
    console.log(response.error);
  };

  return (
    <div>
      <Fab size="medium" color="grey" aria-label="add">
        <AddIcon onClick={handleOpen} />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="form" sx={style}>
          <Typography component="h1" variant="h5">
            Add Exercise
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Exercise Name"
            name="exercise_name"
            value={exercise.exercise_name}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            label="Weight"
            name="weight"
            autoFocus
            onChange={handleChange}
            value={exercise.weight}
          />
          <TextField
            margin="normal"
            type="number"
            required
            fullWidth
            label="Reps"
            name="reps"
            autoFocus
            onChange={handleChange}
            value={exercise.reps}
          />
          <TextField
            margin="normal"
            select
            label="ExerciseType"
            name="exercise_type"
            onChange={handleChange}
            value={exercise.exercise_type}
            fullWidth
          >
            {state.type.map((type) => {
              return (
                <MenuItem key={type.Id} value={type.Id}>
                  {type.Type}
                </MenuItem>
              );
            })}
          </TextField>
          <TextField
            margin="normal"
            select
            label="Status"
            name="status_id"
            onChange={handleChange}
            value={exercise.status_id}
            fullWidth
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
          <TextField
            margin="normal"
            fullWidth
            label="Notes"
            name="userNotes"
            autoFocus
            onChange={handleChange}
            value={exercise.userNotes}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleSubmit}
          >
            Add
          </Button>
          <Button
            type="submit"
            sx={{ mt: 3, mb: 2, ml: 2 }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

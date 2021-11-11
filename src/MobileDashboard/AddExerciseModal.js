import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Context } from "../Store";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import FormControl from "@mui/material/FormControl";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "90%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  bgcolor: "background.paper",
  overflow: "scroll",
  border: "2px solid #000",
  boxShadow: 24,
  p: 3,
  spacing: 3,
};

export default function AddExerciseModal() {
  const [state, dispatch] = useContext(Context);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    formik.resetForm();
    setOpen(false);
  };
  const { id } = useParams();

  const date = new Date()
    .toLocaleString("en-us", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

  const initialValues = {
    userId: id ? id : "",
    exercise_name: "",
    weight: "",
    reps: "",
    exercise_type: "",
    status_id: "",
    userNotes: "",
    dateAdded: "",
    dateModified: "",
  };

  const validationSchema = yup.object({
    exercise_name: yup
      .string("Please enter a exercise name")
      .min(2, "Exercise name must be at least 2 characters")
      .required("Exercise name required"),
    weight: yup.number("Please enter a weight").required("Weight is required"),
    reps: yup
      .number("Please enter number of reps")
      .required("Rep count is required"),
    userNotes: yup.string("Please enter notes"),
  });

  const onSubmit = async (values) => {
    const newValues = { ...values };
    newValues.dateAdded = state.dateClicked;
    newValues.dateModified = date;

    try {
      const response = await axios.post(
        "https://tfitnessapp.azurewebsites.net/api/fitness/addExercise",
        newValues,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Exercise added");
        let currentExercises = [...state.exercises];
        currentExercises.push(response.data);
        dispatch({
          type: "SET_EXERCISES",
          payload: currentExercises,
        });
        handleClose();
      }
    } catch (error) {
      toast.error("Error adding exercise");
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const statusValue = [
    { value: 1, label: "Completed" },
    { value: 2, label: "Not Completed" },
  ];

  console.log(formik.values);

  return (
    <div>
      <AddIcon onClick={handleOpen} sx={{ ml: 4, mr: 1 }} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <FormControl onSubmit={formik.handleSubmit} sx={style}>
          <Box component="form">
            <Typography component="h1" variant="h5">
              Add Exercise
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Exercise Name"
              name="exercise_name"
              value={formik.values.exercise_name}
              onChange={formik.handleChange}
              error={
                formik.touched.exercise_name &&
                Boolean(formik.errors.exercise_name)
              }
              helperText={
                formik.touched.exercise_name && formik.errors.exercise_name
              }
            />
            <TextField
              margin="normal"
              type="number"
              required
              fullWidth
              label="Weight"
              name="weight"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.weight}
              error={formik.touched.weight && Boolean(formik.errors.weight)}
              helperText={formik.touched.weight && formik.errors.weight}
            />
            <TextField
              margin="normal"
              type="number"
              required
              fullWidth
              label="Reps"
              name="reps"
              autoFocus
              onChange={formik.handleChange}
              value={formik.values.reps}
              error={formik.touched.reps && Boolean(formik.errors.reps)}
              helperText={formik.touched.reps && formik.errors.reps}
            />
            <TextField
              margin="normal"
              select
              label="ExerciseType"
              name="exercise_type"
              onChange={formik.handleChange}
              value={formik.values.exercise_type}
              fullWidth
            >
              {state.type.map((type) => {
                return (
                  <MenuItem key={type.Type_Id} value={type.Type_Id}>
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
              onChange={formik.handleChange}
              value={formik.values.status_id}
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
              onChange={formik.handleChange}
              value={formik.values.userNotes}
              error={
                formik.touched.userNotes && Boolean(formik.errors.userNotes)
              }
              helperText={formik.touched.userNotes && formik.errors.userNotes}
            />
            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
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
        </FormControl>
      </Modal>
    </div>
  );
}

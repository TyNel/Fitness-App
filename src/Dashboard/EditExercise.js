import React, { useContext } from "react";
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
import { useFormik } from "formik";
import axios from "axios";
import * as yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Edit_Exercises(props) {
  const statusValue = [
    { value: 1, label: "Completed" },
    { value: 2, label: "Not Completed" },
  ];

  const date = new Date()
    .toLocaleString("en-us", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");

  const [state, dispatch] = useContext(Context);
  const handleEdit = props.handleEdit;
  const id = props.id;
  const index = state.exercises.findIndex((exercise) => exercise.Id === id);
  const currentExercise = state.exercises[index];
  console.log(currentExercise);

  const initialValues = {
    id: id,
    userId: currentExercise.UserId ? currentExercise.UserId : "",
    exercise_name: currentExercise.Exercise_Name
      ? currentExercise.Exercise_Name
      : "",
    weight: currentExercise.Weight ? currentExercise.Weight : "",
    reps: currentExercise.Reps ? currentExercise.Reps : "",
    exercise_type: currentExercise.Exercise_Type
      ? currentExercise.Exercise_Type
      : "",
    status_id: currentExercise.Status_Id ? currentExercise.Status_Id : "",
    userNotes: currentExercise.UserNotes ? currentExercise.UserNotes : "",
    dateAdded: currentExercise.DateAdded ? currentExercise.DateAdded : "",
    dateModified: date,
  };

  const onSubmit = async (values) => {
    try {
      const response = await axios.put(
        "https://localhost:5001/api/fitness/UpdateExercise",
        values,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Exercise updated");
        let data = [...state.exercises];
        data[index] = response.data;
        dispatch({ type: "SET_EXERCISES", payload: data });
        handleEdit();
      }
    } catch (error) {
      toast.error("Error updating exercise");
      console.log(error);
    }
  };

  const validationSchema = yup.object({
    exercise_name: yup
      .string("Please enter a name")
      .min(2, "Name must be at least 2 characters")
      .required("Name is required"),
    weight: yup.number("Please enter a weight").required("Weight is required"),
    reps: yup
      .number("Please enter number of reps")
      .required("Rep count is required"),
    userNotes: yup.string("Please enter notes"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

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
                name="exercise_type"
                value={formik.values.exercise_type}
                onChange={formik.handleChange}
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
            </TableCell>
            <TableCell>
              <TextField
                value={formik.values.exercise_name}
                name="exercise_name"
                onChange={formik.handleChange}
                size="small"
                fullWidth
                error={
                  formik.errors.exercise_name &&
                  Boolean(formik.errors.exercise_name)
                }
                helperText={
                  formik.touched.exercise_name && formik.errors.exercise_name
                }
              />
            </TableCell>
            <TableCell>
              {" "}
              <TextField
                value={formik.values.weight}
                type="number"
                name="weight"
                onChange={formik.handleChange}
                error={formik.errors.weight && Boolean(formik.errors.weight)}
                helperText={formik.touched.weight && formik.errors.weight}
                size="small"
              />
            </TableCell>
            <TableCell>
              <TextField
                value={formik.values.reps}
                type="number"
                name="reps"
                onChange={formik.handleChange}
                error={formik.errors.reps && Boolean(formik.errors.reps)}
                helperText={formik.touched.reps && formik.errors.reps}
                size="small"
              />
            </TableCell>
            <TableCell>
              <TextField
                size="small"
                select
                name="status_id"
                value={formik.values.status_id}
                fullWidth
                onChange={formik.handleChange}
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
                value={formik.values.userNotes}
                name="userNotes"
                onChange={formik.handleChange}
                error={
                  formik.errors.userNotes && Boolean(formik.errors.userNotes)
                }
                helperText={formik.touched.userNotes && formik.errors.userNotes}
                size="small"
              />
            </TableCell>
            <TableCell align="right">
              <IconButton color="inherit" onClick={formik.handleSubmit}>
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

import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../Store";

export default function ConfirmDialog(props) {
  const [open, setOpen] = useState(false);
  const [state, dispatch] = useContext(Context);
  const id = props.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function onDelete(id) {
    try {
      let response = await axios.delete(
        `https://tfitnessapp.azurewebsites.net/api/fitness/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      console.log(response);
      if (response.status === 200) {
        toast.success("Exercise deleted");
        let data = state.exercises.filter((e) => {
          return e.Id !== id;
        });
        dispatch({ type: "SET_EXERCISES", payload: data });
      }
    } catch (error) {
      toast.error("Error deleting exercise");
      console.log(error);
    }
  }

  return (
    <div>
      <DeleteIcon
        variant="outlined"
        onClick={handleClickOpen}
        fontSize="small"
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Delete Confirmation
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this exercise?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={() => onDelete(id)}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

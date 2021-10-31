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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Exercises() {
  const [state, dispatch] = useContext(Context);
  const [isEditing, setEditing] = useState(false);
  const [exerciseId, setId] = useState("");

  const handleEdit = (id) => {
    setId(id);
    setEditing(!isEditing);
  };

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent></CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

export default Exercises;

import React, { useContext, useEffect, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CalendarModal from "./CalendarModal";
import Exercises from "./Exercises";
import { Context } from "../Store";
import { GetExerciseType, GetUser } from "../Services/UserServices";
import { useParams } from "react-router-dom";
import AddExerciseModal from "./AddExerciseModal";
import DropDownMenu from "./UserMenu";

export default function MDashboard() {
  const [state, dispatch] = useContext(Context);
  const { id } = useParams();

  const onGetTypeSuccess = useCallback(
    (response) => {
      let data = response.data;
      dispatch({ type: "SET_TYPE", payload: data });
    },
    [dispatch]
  );

  const OnUserError = (error) => {
    console.log(error);
  };

  const OnUserSuccess = useCallback(
    (response) => {
      dispatch({
        type: "SET_USER",
        payload: response.data,
      });
    },
    [dispatch]
  );

  const onGetTypeError = (response) => {
    console.log("Error Getting Exercises", response.error);
  };

  useEffect(() => {
    if (state.type.length === 0)
      GetExerciseType().then(onGetTypeSuccess).catch(onGetTypeError);
    if (state.currentUser === "") {
      GetUser(id).then(OnUserSuccess).catch(OnUserError);
    }
  }, [
    onGetTypeSuccess,
    state.currentUser,
    id,
    OnUserSuccess,
    state.type.length,
  ]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <DropDownMenu />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {`Hi ${state.currentUser.FirstName}`}
            </Typography>
            <CalendarModal />
            <AddExerciseModal />
          </Toolbar>
        </AppBar>
      </Box>
      <Exercises />
    </React.Fragment>
  );
}

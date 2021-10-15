import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useHistory } from "react-router-dom";

export function MainListItems() {
  let history = useHistory();

  function onLogout() {
    axios
      .delete(`https://localhost:5001/api/fitness/logout`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then(() => {
        console.log("logout successful redirecting to login");
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <ListItem button onClick={onLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Account" />
      </ListItem>
    </div>
  );
}

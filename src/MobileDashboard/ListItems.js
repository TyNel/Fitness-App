import * as React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export function MainListItems() {
  let history = useHistory();

  async function onLogout() {
    try {
      let response = await axios.delete(
        `https://tfitnessapp.azurewebsites.net/api/fitness/logout`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 204) {
        toast.success("Logout successful");
        history.push("/");
      }
    } catch (error) {
      toast.error("Error logging out");
      console.log(error);
    }
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

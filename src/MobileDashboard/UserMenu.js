import React, { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

export default function DropDownMenu() {
  let history = useHistory();
  const [menu, setMenu] = useState(false);
  const handleClick = () => {
    setMenu(!menu);
  };

  const handleClose = () => {
    setMenu(false);
  };

  async function handleLogout() {
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
      <MenuIcon
        id="basic-button"
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={menu ? "true" : undefined}
        onClick={handleClick}
      />
      <Menu
        id="basic-menu"
        open={menu}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 55, right: 100, left: 0 }}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleLogout}>Settings</MenuItem>
      </Menu>
    </div>
  );
}

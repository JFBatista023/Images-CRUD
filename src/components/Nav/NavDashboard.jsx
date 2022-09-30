import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const NavDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toUploadPage = () => {
    return navigate("/dashboard/images/upload/", { replace: true });
  };

  const toImagesPage = () => {
    return navigate("/dashboard/images/", { replace: true });
  };

  const logout = () => {
    axios.get("http://127.0.0.1:8000/auth/logout/").then((response) => {
      console.log(response);
      localStorage.clear();
      navigate("/", { replace: true });
    });
  };

  return (
    <Nav
      newComponent={
        <>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={toImagesPage}>All Images</MenuItem>
            <MenuItem onClick={toUploadPage}>Upload Images</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        </>
      }
    >
      {username}
    </Nav>
  );
};

export default NavDashboard;

import React, { useContext, useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Nav from "./Nav";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const NavDashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  let { logoutUser, user } = useContext(AuthContext);
  const username = user.username;

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
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </>
      }
    >
      {username}
    </Nav>
  );
};

export default NavDashboard;

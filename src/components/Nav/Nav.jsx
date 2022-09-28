import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Nav = ({ children, url, newComponent }) => {
  const components = () => {
    if (!newComponent) {
      return (
        <Button component={Link} to={url} color="inherit">
          {children}
        </Button>
      );
    } else {
      return <Typography>Hi, {children}</Typography>;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {newComponent}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Images - CRUD
          </Typography>
          {components()}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;

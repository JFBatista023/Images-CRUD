import React, { useState, useEffect } from "react";
import Nav from "../Nav/Nav";
import MenuIcon from "@mui/icons-material/Menu";
import {
  ImageList,
  Menu,
  MenuItem,
  IconButton,
  ImageListItem,
  ImageListItemBar,
} from "@mui/material";
import axios from "axios";

const DashboardImages = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [images, setImages] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const srcset = (image, width, height, rows = 1, cols = 1) => {
    return {
      src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
      srcSet: `${image}?w=${width * cols}&h=${
        height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
    };
  };

  // const fetchImage = async () => {
  //   const res = await fetch(imageUrl);
  //   const imageBlob = await res.blob();
  //   const imageObjectURL = URL.createObjectURL(imageBlob);
  //   setImg(imageObjectURL);
  // };

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/21/images/").then((response) => {
      setImages(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <>
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
              <MenuItem onClick={handleClose}>All Images</MenuItem>
              <MenuItem onClick={handleClose}>Upload Images</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </>
        }
      >
        User
      </Nav>

      <div>
        {images.map((image) => {
          console.log(image);
          return <img src={`http://127.0.0.1:8000${image.photo}`}></img>;
        })}
      </div>
    </>
  );
};

export default DashboardImages;

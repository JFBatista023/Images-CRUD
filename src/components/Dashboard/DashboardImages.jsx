import React, { useState, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ImageList,
  IconButton,
  ImageListItem,
  ImageListItemBar,
  Paper,
  InputBase,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavDashboard from "../Nav/NavDashboard";

const DashboardImages = () => {
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/users/21/images/").then((response) => {
      setImages(response.data);
      console.log(response.data[0].name);
    });
  }, []);

  const searchImage = () => {
    for (let index = 0; index < images.length; index++) {
      if (images[index].name === imageName) {
        return;
      }
    }
  };

  // const deleteImage = () => {
  //   axios.delete("");
  // };

  return (
    <>
      <NavDashboard />

      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: 400,
          ml: "33%",
          mt: 4,
        }}
      >
        <InputBase
          value={imageName}
          onChange={(e) => {
            setImageName(e.target.value);
          }}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Image"
        />
        <IconButton
          onClick={() => {
            searchImage();
          }}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <div>
        <ImageList sx={{ width: 650, height: 500, ml: "27%", mt: 10 }} cols={2}>
          {images.map((image) => {
            const imagePhoto = `http://127.0.0.1:8000${image.photo}`;

            return (
              <ImageListItem key={imagePhoto}>
                <img
                  src={`${imagePhoto}?w=248&fit=crop&auto=format`}
                  srcSet={`${imagePhoto}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={image.name}
                  actionIcon={
                    <>
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        onClick={() =>
                          navigate(`/dashboard/images/${image.id}/`, {
                            state: { url: imagePhoto },
                          })
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${image.name}`}
                        onClick={() =>
                          navigate(`/dashboard/images/${image.id}/`, {
                            state: { url: imagePhoto },
                          })
                        }
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </>
                  }
                />
              </ImageListItem>
            );
          })}
        </ImageList>
      </div>
    </>
  );
};

export default DashboardImages;

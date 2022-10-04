import React, { useState, useEffect, useContext } from "react";
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
  Modal,
  Backdrop,
} from "@mui/material";
import NavDashboard from "../Nav/NavDashboard";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

const DashboardImages = () => {
  const [imagePath, setImagePath] = useState("");
  const [images, setImages] = useState([]);
  const [imageName, setImageName] = useState("");
  const [hasDeleted, setHasDeleted] = useState(false);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let { user } = useContext(AuthContext);
  const user_id = user.user_id;

  const api = useAxios();

  const handleImage = (value) => {
    setImagePath(value);
    handleOpen(true);
  };

  const getImages = async () => {
    const response = await api.get(`users/${user_id}/images/`);

    if (response.status === 200) {
      setImages(response.data);
    }
  };

  const deleteImage = async (id) => {
    const response = await api.delete(`users/${user_id}/images/${id}/`);
    console.log(response);

    for (let index = 0; index < images.length; index++) {
      if (images[index].id === id) {
        setImages(images.splice(index));
        setHasDeleted(true);
        break;
      }
    }
  };

  const searchImage = () => {
    if (imageName === "") {
      setImages([]);
      return;
    }

    for (let i = 0; i < images.length; i++) {
      if (images[i].name === imageName) {
        const tempImage = [images[i]];
        setImages(tempImage);
        break;
      }
    }
  };

  useEffect(() => {
    if (imageName === "" || hasDeleted) {
      getImages();
    }
    if (hasDeleted) {
      setHasDeleted(false);
    }
  }, [hasDeleted, images.length]);

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
          ml: "34%",
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
          onClick={() => searchImage()}
          type="button"
          sx={{ p: "10px" }}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>

      <div>
        <ImageList sx={{ width: 700, height: 520, ml: "27%", mt: 10 }} cols={2}>
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
                        onClick={() => {
                          deleteImage(image.id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                        aria-label={`info about ${image.name}`}
                        onClick={() => handleImage(imagePhoto)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                      <Modal
                        open={open}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                          timeout: 400,
                        }}
                      >
                        <ImageListItem
                          sx={{ mt: "10%", ml: "23%", width: "90%" }}
                        >
                          <img
                            src={imagePath}
                            alt={image.name}
                            style={{
                              maxHeight: "50%",
                              maxWidth: "50%",
                            }}
                          />
                        </ImageListItem>
                      </Modal>
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

import React, { useContext, useEffect, useState } from "react";
import NavDashboard from "../Nav/NavDashboard";
import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UploadImage = () => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);

  const navigate = useNavigate();

  let { user, authTokens, logoutUser } = useContext(AuthContext);
  const user_id = user.user_id;

  const [open, setOpen] = useState(false);

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    if (imageUploaded) {
      navigate("/dashboard/images/", { replace: true });
    }

    setOpen(false);
  };

  useEffect(() => {
    if (user.exp * 1000 < Date.now()) {
      logoutUser();
    }
  }, [imageUploaded]);

  const sendData = () => {
    const data = {
      name: name,
      photo: selectedImage,
    };
    const options = {
      method: "POST",
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${authTokens?.access}`,
      },
      data: data,
      url: `${user_id}/images/uploadfiles/`,
      baseURL: "http://127.0.0.1:8000/users/",
    };
    axios(options)
      .then((response) => {
        if (response.status === 201) {
          setImageUploaded(true);
        }
      })
      .catch((response) => setImageUploaded(false));
  };

  return (
    <>
      <NavDashboard />
      <Paper
        sx={{
          mt: 12,
          p: 3,
          ml: "30%",
          display: "flex",
          width: "30%",
          height: 250,
        }}
        elevation={5}
      >
        <Container maxWidth="xs">
          <Typography variant="h4" component="h1" align="center">
            Upload
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendData();
            }}
          >
            <TextField
              label="Name"
              margin="dense"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              fullWidth
            ></TextField>
            <TextField
              type="file"
              margin="dense"
              onChange={(event) => {
                setSelectedImage(event.target.files[0]);
              }}
              required
              fullWidth
            ></TextField>
            <Button
              variant="contained"
              sx={{ mt: 3 }}
              type="submit"
              fullWidth
              onClick={handleClick}
            >
              Upload Image
            </Button>
          </form>
        </Container>
      </Paper>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={imageUploaded ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {imageUploaded ? "Image Uploaded" : "Upload Failed"}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UploadImage;

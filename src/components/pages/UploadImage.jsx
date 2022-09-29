import React, { useState } from "react";
import NavDashboard from "../Nav/NavDashboard";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";

const UploadImage = () => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const sendData = () => {
    const data = {
      name: name,
      photo: selectedImage,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "multipart/form-data" },
      data: data,
      url: "21/images/uploadfiles/",
      baseURL: "http://127.0.0.1:8000/users/",
    };
    axios(options)
      .then((response) => {
        console.log(response);
      })
      .catch((response) => console.log(response));
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
            <Button variant="contained" sx={{ mt: 3 }} type="submit" fullWidth>
              Upload Image
            </Button>
          </form>
        </Container>
      </Paper>
    </>
  );
};

export default UploadImage;

import React, { useContext, useState } from "react";
import NavDashboard from "../Nav/NavDashboard";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";

const UploadImage = () => {
  const [name, setName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const api = useAxios();
  let { user } = useContext(AuthContext);
  const user_id = user.user_id;

  const sendData = () => {
    let response = api.post(
      `http://127.0.0.1:8000/users/${user_id}/images/uploadfiles/`,
      {
        name: name,
        photo: selectedImage,
      },
      { headers: { "content-type": "multipart/form-data" } }
    );
    console.log(response);
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

import React, { useContext, useEffect, useState } from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";
import axios from "axios";

import Nav from "../Nav/Nav";
import { Navigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const FormsRegister = () => {
  const [username, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [regSucess, setRegSucess] = useState(false);

  let { user, logoutUser } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      logoutUser();
    }
  }, []);

  const sendData = () => {
    const data = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: data,
      url: "auth/register/",
      baseURL: "http://127.0.0.1:8000/",
    };
    axios(options)
      .then((response) => {
        if (response.status === 201) {
          setRegSucess(true);
        }
        console.log(response);
      })
      .catch((response) => console.log(response));
  };

  return (
    <>
      {regSucess && <Navigate to="/login" replace={true} />}
      <Nav url={"/login"}>Login</Nav>
      <Paper
        sx={{
          mt: 12,
          p: 3,
          ml: "30%",
          display: "flex",
          width: "30%",
          height: 440,
        }}
        elevation={5}
      >
        <Container maxWidth="xs">
          <Typography variant="h4" component="h1" align="center">
            Register
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendData();
            }}
          >
            <TextField
              label="Username"
              margin="dense"
              value={username}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              required
              fullWidth
            ></TextField>
            <TextField
              label="First Name"
              margin="dense"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              required
              fullWidth
            ></TextField>
            <TextField
              label="Last Name"
              margin="dense"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              required
              fullWidth
            ></TextField>
            <TextField
              label="Email"
              margin="dense"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              fullWidth
            ></TextField>
            <TextField
              label="Password"
              type="password"
              margin="dense"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              required
              fullWidth
            ></TextField>
            <Button variant="contained" sx={{ mt: 2 }} type="submit" fullWidth>
              Register
            </Button>
          </form>
        </Container>
      </Paper>
    </>
  );
};

export default FormsRegister;

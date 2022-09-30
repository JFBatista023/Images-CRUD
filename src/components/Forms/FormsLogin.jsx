import React from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";
import { useState } from "react";
import Nav from "../Nav/Nav";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormsLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    const options = {
      method: "POST",
      headers: { "content-type": "application/json" },
      data: {
        email: email,
        password: password,
      },
      withCredentials: true,
      url: "http://127.0.0.1:8000/auth/login/",
    };
    axios(options)
      .then((response) => {
        console.log(response);
        if (response.status === 202) {
          localStorage.setItem("user_id", response.data.user_id);
          localStorage.setItem("username", response.data.username);
          localStorage.setItem("password", response.data.password);
          navigate("/dashboard/images/", { replace: true });
        }
      })
      .catch((response) => console.log(response));
  };

  return (
    <>
      <Nav url={"register/"}>Register</Nav>
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
            Login
          </Typography>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              login();
            }}
          >
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
            <Button variant="contained" sx={{ mt: 3 }} type="submit" fullWidth>
              Login
            </Button>
          </form>
        </Container>
      </Paper>
    </>
  );
};

export default FormsLogin;

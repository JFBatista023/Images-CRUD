import React from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";
import { useState, useContext } from "react";
import Nav from "../Nav/Nav";
import AuthContext from "../../context/AuthContext";

const FormsLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let { loginUser } = useContext(AuthContext);

  return (
    <>
      <Nav url={"/register"}>Register</Nav>
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
          <form onSubmit={loginUser}>
            <TextField
              label="Username"
              margin="dense"
              name="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              required
              fullWidth
            ></TextField>
            <TextField
              label="Password"
              type="password"
              name="password"
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

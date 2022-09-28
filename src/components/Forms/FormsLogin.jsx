import React from "react";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import "@fontsource/roboto/400.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Nav from "../Nav/Nav";

const FormsLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <>
      {loggedIn && <Navigate to="/dashboard/images/" replace={true} />}
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
              setLoggedIn(true);
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

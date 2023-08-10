import React from "react";
import { Container, Grid, Typography } from "@mui/material";
import Login from "../components/Auth/Login";

const LoginPage = ({ onLoginSuccess }) => {
  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundColor: "#97747495",
        minHeight: "100vh",
      }}
    >
      <Grid>
        <Typography
          variant="h1"
          textAlign={"center"}
          color={"white"}
          fontSize={"100px"}
        >
          Books Explorer
        </Typography>
      </Grid>
      <Grid>
        <Typography variant="h3" textAlign={"center"} paddingTop={"50px"}>
          Welcome to the Book Explorer! If you want to continue, please sign in.
        </Typography>
      </Grid>
      <Grid container justifyContent={"center"} paddingTop="100px">
        <Login onLoginSuccess={onLoginSuccess} />
      </Grid>
    </Container>
  );
};

export default LoginPage;

import React, { useContext, useEffect } from "react";
import axios from "axios";
import { TokenContext } from "../contexts/token.context";
import FavouritesBooks from "../components/books/FavouritesBooks";
import { Grid, Button, IconButton } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import WishlistBooks from "../components/books/WishlistBooks";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserPage = () => {
  const { accessToken, setAccessToken } = useContext(TokenContext);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");
    if (storedAccessToken) {
      setAccessToken(storedAccessToken);
    } else {
      navigate("/");
    }
  }, []);

  const navigateBack = () => {
    navigate(-1);
  };
  const fetchBookshelves = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/mylibrary/bookshelves",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Fetched bookshelves:", response.data);
    } catch (error) {
      console.error("Error fetching bookshelves:", error);
      // You might want to display an error message to the user here.
    }
  };

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate("/homepage");
            }}
            size="small"
          >
            <HomeIcon fontSize="large" />
          </IconButton>
          <IconButton onClick={navigateBack}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>

          <Button
            variant="h5"
            sx={{
              fontSize: "18px",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
            onClick={fetchBookshelves}
          >
            Fetch Bookshelves
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container spacing={3} marginTop="70px">
        <Grid item md={12} textAlign="center">
          <WishlistBooks />
        </Grid>
        <Grid item md={12} textAlign="center">
          <FavouritesBooks />
        </Grid>
      </Grid>
    </>
  );
};

export default UserPage;

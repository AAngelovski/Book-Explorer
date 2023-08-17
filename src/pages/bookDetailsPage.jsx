import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BookRepository } from "../repository/BooksRepository";
import { TokenContext } from "../contexts/token.context";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  IconButton,
  CardActions,
  Button,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import AddToFavoritesButton from "../components/books/AddToFavouritesBtn";
import AddToWishlistButton from "../components/books/AddToWishlistBtn";

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState({});
  const { accessToken } = useContext(TokenContext);
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (bookId) {
      BookRepository.getBookById(bookId)
        .then((res) => {
          console.log(res.data);
          setBookDetails(res.data);
          setLoading(false);
          console.log(accessToken);
        })
        .catch((error) => {
          console.error("Error fetching book details", error);
          setLoading(false);
        });
    }
  }, [bookId]);

  if (loading) {
    return (
      <Grid
        item
        md={12}
        style={{
          textAlign: "center",
        }}
      >
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            onClick={() => {
              navigate("/homepage");
            }}
          >
            <HomeIcon fontSize="large" />
          </IconButton>

          <IconButton onClick={navigateBack}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>

          <Button
            variant="h1"
            component="button"
            color="primary"
            sx={{
              fontWeight: "300",
              fontSize: "18px",
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
            }}
            onClick={() => {
              navigate("/user/");
            }}
          >
            My Profile
          </Button>
        </Toolbar>
      </AppBar>

      <Container>
        <Grid container marginTop={"70px"}>
          <Grid
            item
            md={12}
            style={{
              backgroundImage: `url(${bookDetails?.volumeInfo?.imageLinks?.thumbnail})`,
              height: "558px",
              padding: "150px",
            }}
          >
            {/* <Typography
              gutterBottom
              variant="h2"
              style={{ color: "white", border: "10px solid black" }}
            >
              {bookDetails?.volumeInfo?.title || "Title not available"}
            </Typography> */}
          </Grid>

          <Grid item md={6}>
            {bookDetails?.volumeInfo?.publishedDate && (
              <Typography fontSize={30} marginTop={2}>
                Published on: {bookDetails?.volumeInfo?.publishedDate}
              </Typography>
            )}
          </Grid>
          <Grid item md={6}>
            {bookDetails?.volumeInfo?.pageCount && (
              <Typography fontSize={30} marginTop={2}>
                Total pages: {bookDetails?.volumeInfo?.pageCount}
              </Typography>
            )}
          </Grid>

          <Grid item md={12}>
            {bookDetails?.volumeInfo?.publisher && (
              <Typography fontSize={30} marginTop={2} textAlign="center">
                Published by: {bookDetails?.volumeInfo?.publisher}
              </Typography>
            )}
          </Grid>

          <Grid item md={12}>
            <Card>
              <CardActions>
                <AddToFavoritesButton
                  bookId={bookId}
                  accessToken={accessToken}
                />
                <AddToWishlistButton
                  bookId={bookId}
                  accessToken={accessToken}
                />
              </CardActions>
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {bookDetails?.volumeInfo?.title || "Title not available"}
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {(bookDetails?.volumeInfo?.authors &&
                    bookDetails?.volumeInfo?.authors.join(", ")) ||
                    "Authors not available"}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                  {bookDetails?.volumeInfo?.description ||
                    "No description available"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default BookDetailsPage;

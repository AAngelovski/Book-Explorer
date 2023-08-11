import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookRepository } from "../repository/BooksRepository";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Search from "../components/Search/Search";
// import SearchIconWrapper from "../components/Search/SearchIconWrapper";
// import SearchIcon from "@mui/icons-material/Search";
// import StyledInputBase from "../components/Search/StyledInputBase";

import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";

const BookDetailsPage = () => {
  const { bookId } = useParams();
  const [loading, setLoading] = useState(false);
  const [bookDetails, setBookDetails] = useState({});

  useEffect(() => {
    if (bookId) {
      BookRepository.getBookById(bookId)
        .then((res) => {
          console.log(res.data);
          setBookDetails(res.data);
          setLoading(false);
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
    <Container>
      <Grid container>
        <Grid
          item
          md={12}
          style={{
            backgroundImage: `url(${bookDetails?.volumeInfo?.imageLinks?.thumbnail})`,
            height: "500px",
            padding: "150px",
          }}
        >
          <Typography
            gutterBottom
            variant="h2"
            stlye={{ color: "white", border: "10px solid black" }}
          >
            {bookDetails?.volumeInfo?.title || "Title not available"}
          </Typography>
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
  );
};

export default BookDetailsPage;

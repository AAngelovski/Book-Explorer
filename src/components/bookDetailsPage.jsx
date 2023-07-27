import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BookRepository } from "../repository/BooksRepository";
import {
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
  const [loading, setLoading] = useState(true);
  const [bookDetails, setBookDetails] = useState({});

  useEffect(() => {
    if (bookId) {
      BookRepository.getBookById(bookId)
        .then((res) => {
          setBookDetails(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching book details", error);
          setLoading(false);
        });
    }
  }, [bookId]);

  console.log(bookDetails);

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
        <Grid item md={12} alignItems="center">
          <Card sx={{ maxWidth: 500, maxHeight: 1000, minHeight: 400 }}>
            <CardMedia
              sx={{ height: 500, display: "block", margin: "auto" }}
              image={bookDetails?.volumeInfo?.imageLinks?.thumbnail}
              title="Book Cover"
            />
          </Card>
        </Grid>
        <Grid item md={12}>
          <Typography fontSize={50} marginTop={2}>
            Total pages: {bookDetails?.volumeInfo?.pageCount}
          </Typography>
        </Grid>
        <Grid item md={12}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                {bookDetails?.volumeInfo?.title}
              </Typography>
              <Typography gutterBottom variant="h5" component="div">
                Author: {bookDetails?.volumeInfo?.authors}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {bookDetails?.volumeInfo?.description
                  ? bookDetails?.volumeInfo?.description
                  : "No description available"}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BookDetailsPage;

import React, { useContext, useEffect } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Container,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import { TokenContext } from "../../contexts/token.context";
import DeleteIcon from "@mui/icons-material/Delete";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { useNavigate } from "react-router-dom";
import { useWishlistContext } from "../../contexts/wishlist.context";

const WishlistBooks = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(TokenContext);
  const { wishlist, fetchWishlist, setWishlist, removeWishlist } =
    useWishlistContext();

  const handleFetchWishlist = () => {
    // Fetch wishlist when the "Wishlist" button is clicked
    fetchWishlist(accessToken);
  };

  const handleRemove = (bookId) => {
    removeWishlist(bookId, accessToken);
  };

  return (
    <Container>
      <Grid>
        <Button variant="contained" onClick={handleFetchWishlist}>
          Wishlist
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setWishlist([]);
          }}
        >
          Close
        </Button>
      </Grid>
      <br />

      <Grid container spacing={3}>
        {wishlist.map((item, index) => (
          <Grid key={index} item md={3}>
            <Card sx={{ maxWidth: 345, maxHeight: 400, minHeight: 400 }}>
              <CardMedia
                sx={{ height: 160 }}
                image={item?.volumeInfo?.imageLinks?.thumbnail || "No Image"}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item?.volumeInfo?.title || "No Title"}
                </Typography>
                <Typography gutterBottom variant="p" component="div">
                  {item?.volumeInfo?.authors || "No Authors"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item?.volumeInfo?.description
                    ? item?.volumeInfo?.description.slice(0, 200)
                    : "No description available"}
                </Typography>
              </CardContent>
              <CardActions style={{ textAlign: "right" }}>
                <IconButton
                  size="small"
                  onClick={() => handleRemove(item?.id)} // Use handleRemove here
                  title="REMOVE FROM WISHLIST"
                >
                  <DeleteIcon fontSize="large" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => {
                    navigate(`/book/${item?.id}?source=user`);
                  }}
                  title="LEARN MORE"
                >
                  <ReadMoreIcon fontSize="large" />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WishlistBooks;

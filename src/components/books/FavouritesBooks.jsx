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
import { useFavoritesContext } from "../../contexts/favourites.context";
const FavouritesBooks = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(TokenContext);
  const { favorites, fetchFavorites, removeFavorite, setFavorites } =
    useFavoritesContext();

  const handleFetchFavorites = () => {
    // Fetch favorites when the "Favourites" button is clicked
    fetchFavorites(accessToken);
  };

  const handleRemove = (bookId) => {
    removeFavorite(bookId, accessToken);
  };

  return (
    <Container>
      <Grid>
        <Button variant="contained" onClick={handleFetchFavorites}>
          Favourites
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            setFavorites([]);
          }}
        >
          Close
        </Button>
      </Grid>

      <Grid container spacing={3}>
        {favorites.map((item, index) => (
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
                  title="REMOVE FROM FAVOURITES"
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

export default FavouritesBooks;

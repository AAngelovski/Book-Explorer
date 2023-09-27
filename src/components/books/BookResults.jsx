import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import AddToFavorites from "./AddToFavourites";
import AddToWishlist from "./AddToWishlist";

export default function BookResults({
  data,
  setData,
  loading,
  setPage,
  accessToken,
}) {
  const navigate = useNavigate();

  // Show the loader while loading
  if (loading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  // Show the book results
  return (
    <Grid container spacing={3}>
      {data?.items?.length > 0 && (
        <Grid item md={12}>
          <Typography fontSize="25px" textAlign="center" color={"primary"}>
            Found {data.totalItems} Books
          </Typography>
        </Grid>
      )}
      <InfiniteScroll
        dataLength={data?.items?.length ? data?.items?.length : 0} //This is important field to render the next data
        next={() => setPage((prev) => prev + 1)}
        hasMore={true}
      >
        <Grid container spacing={3}>
          {data?.items?.map((item, index) => (
            <Grid key={index} item md={3}>
              <Card sx={{ maxWidth: 345, maxHeight: 400, minHeight: 400 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item?.volumeInfo?.imageLinks?.thumbnail || "No Image"}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.volumeInfo?.title.slice(0, 20)}
                  </Typography>
                  <Typography gutterBottom variant="p" component="div">
                    {item?.volumeInfo?.authors}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item?.volumeInfo?.description
                      ? item?.volumeInfo?.description.slice(0, 200)
                      : "No description available"}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{ color: "orange" }}
                    onClick={() => {
                      navigate(`/book/${item?.id}`);
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>

                <CardActions>
                  <AddToFavorites bookId={item?.id} accessToken={accessToken} />
                  <AddToWishlist bookId={item?.id} accessToken={accessToken} />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Grid>
  );
}

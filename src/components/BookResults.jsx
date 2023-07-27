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
import { useNavigate } from "react-router-dom";

export default function BookResults({ data, setData, loading }) {
  const navigate = useNavigate();

  return (
    <>
      <Grid container spacing={3}>
        {!loading && data?.items && (
          <Grid item md={12}>
            <Typography>Found: {data?.totalItems} books</Typography>
          </Grid>
        )}
        {loading ? (
          <Grid
            item
            md={12}
            style={{
              textAlign: "center",
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <></>
        )}
        {!loading &&
          data?.items?.map((item, index) => (
            <Grid key={index} item md={4}>
              <Card sx={{ maxWidth: 345, maxHeight: 400, minHeight: 400 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={item?.volumeInfo?.imageLinks?.thumbnail}
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item?.volumeInfo?.title}
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
                <CardActions style={{ textAlign: "right" }}>
                  <Button
                    size="small"
                    onClick={() => {
                      navigate(`/book/${item?.id}`);
                    }}
                  >
                    Learn More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

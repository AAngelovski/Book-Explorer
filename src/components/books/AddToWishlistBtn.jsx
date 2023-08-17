import React from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const AddToWishlistButton = ({ bookId, accessToken }) => {
  const addToWishlist = async () => {
    try {
      const response = await axios.post(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/addVolume?volumeId=${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Book added to wishlist:", response.data);
    } catch (error) {
      console.log("Error adding book to wishlist:", error);
    }
  };

  return (
    <IconButton size="large" onClick={addToWishlist}>
      <AutoStoriesIcon fontSize="large" />
    </IconButton>
  );
};

export default AddToWishlistButton;

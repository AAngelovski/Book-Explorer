import React from "react";
import axios from "axios";
import { IconButton } from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const AddToFavoritesButton = ({ bookId, accessToken }) => {
  const addToFavorites = async () => {
    try {
      const response = await axios.post(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume?volumeId=${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log("Book added to favorites:", response.data);
    } catch (error) {
      console.log("Error adding book to favorites:", error);
    }
  };

  return (
    <IconButton size="large" onClick={addToFavorites}>
      <StarBorderIcon fontSize="large" />
    </IconButton>
  );
};

export default AddToFavoritesButton;

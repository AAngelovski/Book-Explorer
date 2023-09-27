import React from "react";
import AddToFavWishBtn from "./AddToFavWishBtn";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import fetchUserBooks from "../../repository/fetchUserBooks";

const AddToFavorites = ({ bookId, accessToken }) => {
  const handleAddToFavorites = async () => {
    await fetchUserBooks.addToFavorites(bookId, accessToken);
  };

  return (
    <AddToFavWishBtn
      onClick={handleAddToFavorites}
      icon={<StarBorderIcon fontSize="large" />}
      text="ADD TO FAVORITES"
    />
  );
};

export default AddToFavorites;

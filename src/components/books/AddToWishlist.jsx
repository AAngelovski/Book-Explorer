import React from "react";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AddToFavWishBtn from "./AddToFavWishBtn";
import fetchUserBooks from "../../repository/fetchUserBooks";

const AddToWishlist = ({ bookId, accessToken }) => {
  const handleAddToWishlist = async () => {
    await fetchUserBooks.addToWishlist(bookId, accessToken);
  };

  return (
    <AddToFavWishBtn
      onClick={handleAddToWishlist}
      icon={<AutoStoriesIcon fontSize="large" />}
      text="ADD TO WISHLIST"
    />
  );
};

export default AddToWishlist;

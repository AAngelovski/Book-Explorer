import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const WishlistContext = createContext({
  wishlist: [],
  fetchWishlist: () => {},
  setWishlist: () => {},
  //   addToWishlist: () => {},
  removeWishlist: () => {},
});

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  //Fetching the wishlist books from the user
  const fetchWishlist = async (accessToken) => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/books/v1/mylibrary/bookshelves",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Extract and set favorites from the response data
      const wishlistBookshelf = response.data.items.find(
        (bookshelf) => bookshelf.title === "To read"
      );
      if (wishlistBookshelf) {
        const wishlistResponse = await axios.get(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${wishlistBookshelf.id}/volumes`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setWishlist(wishlistResponse.data.items);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    }
  };

  //Removing book from wishlist
  const removeWishlist = async (bookId, accessToken) => {
    try {
      await axios.post(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/2/removeVolume?volumeId=${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update favorites after removal
      setWishlist((prevFavorites) =>
        prevFavorites.filter((item) => item.id !== bookId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Adding book to the wishlist
  //   const addToWishlist = async (bookId, accessToken) => {
  //     try {
  //       const response = await axios.post(
  //         `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/addVolume?volumeId=${bookId}`,
  //         {},
  //         {
  //           headers: {
  //             Authorization: `Bearer ${accessToken}`,
  //           },
  //         }
  //       );
  //       console.log("Book added to favorites:", response.data);

  //       // Update the favorites list
  //       setFavorites([...wis, response.data]); // Add the new book to the list
  //     } catch (error) {
  //       console.log("Error adding book to favorites:", error);
  //     }
  //   };

  const contextValue = {
    wishlist,
    fetchWishlist,
    setWishlist,
    removeWishlist,
  };

  return (
    <WishlistContext.Provider value={contextValue}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlistContext = () => {
  return useContext(WishlistContext);
};

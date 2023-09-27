import React, { createContext, useState, useContext } from "react";
import axios from "axios";

export const FavoritesContext = createContext({
  favorites: [],
  fetchFavorites: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  setFavorites: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  //Fetching the favorites books from the user
  const fetchFavorites = async (accessToken) => {
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
      const favoritesBookshelf = response.data.items.find(
        (bookshelf) => bookshelf.title === "Favorites"
      );
      if (favoritesBookshelf) {
        const favoritesResponse = await axios.get(
          `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${favoritesBookshelf.id}/volumes`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setFavorites(favoritesResponse.data.items);
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  // Removing book from favorites
  const removeFavorite = async (bookId, accessToken) => {
    try {
      await axios.post(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/0/removeVolume?volumeId=${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      // Update favorites after removal
      setFavorites((prevFavorites) =>
        prevFavorites.filter((item) => item.id !== bookId)
      );
    } catch (error) {
      console.error("Error removing favorite:", error);
    }
  };

  // Adding book to the favorites
  const addFavorite = async (bookId, accessToken) => {
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

      // Update the favorites list
      setFavorites([...favorites, response.data]); // Add the new book to the list
    } catch (error) {
      console.log("Error adding book to favorites:", error);
    }
  };

  const contextValue = {
    favorites,
    fetchFavorites,
    removeFavorite,
    addFavorite,
    setFavorites,
  };

  return (
    <FavoritesContext.Provider value={contextValue}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavoritesContext = () => {
  return useContext(FavoritesContext);
};

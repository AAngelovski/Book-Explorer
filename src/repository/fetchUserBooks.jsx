import api from "./api"; // Import your api.js module

export const fetchUserBooks = {
  addToFavorites: async (bookId, accessToken) => {
    const endpoint = `/v1/mylibrary/bookshelves/0/addVolume?volumeId=${bookId}`;

    try {
      const response = await api.post(
        endpoint,
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
      throw error;
    }
  },
  addToWishlist: async (bookId, accessToken) => {
    const endpoint = `/v1/mylibrary/bookshelves/2/addVolume?volumeId=${bookId}`;

    try {
      const response = await api.post(
        endpoint,
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
      throw error;
    }
  },
};

export default fetchUserBooks;

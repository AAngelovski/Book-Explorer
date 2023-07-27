import Axios from "axios";
import { GOOGLE_BOOKS_API_KEY } from "../config";

export const BookRepository = {
  getAllBooks: (data) => {
    return Axios({
      url: `https://www.googleapis.com/books/v1/volumes`,
      method: "GET",
      params: {
        q: data.q,
        startIndex: data.startIndex,
        maxResults: data.maxResults,
        key: GOOGLE_BOOKS_API_KEY,
      },
    });
  },

  getBookById: (bookId) => {
    return Axios({
      url: `https://www.googleapis.com/books/v1/volumes/${bookId}`,
      method: "Get",
      params: {
        key: GOOGLE_BOOKS_API_KEY,
      },
    });
  },
};

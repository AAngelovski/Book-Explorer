import { GOOGLE_BOOKS_API_KEY } from "../config";
import api from "./api";

export const BookRepository = {
  getAllBooks: (data) => {
    return api.get("/v1/volumes", {
      params: {
        q: data.q,
        startIndex: data.startIndex,
        maxResults: data.maxResults,
        // key: GOOGLE_BOOKS_API_KEY,
      },
    });
  },
  getBookById: (bookId) => {
    return api.get(`/v1/volumes/${bookId}`);
  },
};

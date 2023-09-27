import api from "./api";

export const BookRepository = {
  getAllBooks: (data) => {
    return api.get("/v1/volumes", {
      params: {
        q: data.q,
        startIndex: data.startIndex,
        maxResults: data.maxResults,
      },
    });
  },
  getBookById: (bookId) => {
    return api.get(`/v1/volumes/${bookId}`);
  },
};

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
  likedBooks: JSON.parse(localStorage.getItem("likedBooks")) || [], // ✅ Load from localStorage
};

const bookReducer = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
    toggleLike: (state, action) => {
      const bookId = action.payload;
      if (state.likedBooks.includes(bookId)) {
        state.likedBooks = state.likedBooks.filter((id) => id !== bookId);
      } else {
        state.likedBooks.push(bookId);
      }
      localStorage.setItem("likedBooks", JSON.stringify(state.likedBooks)); // ✅ Save liked books
    },
  },
});

export const { setBooks, toggleLike } = bookReducer.actions;
export default bookReducer.reducer;

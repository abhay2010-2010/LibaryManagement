import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  books: [],
};

const bookReducer = createSlice({
  name: "books",
  initialState,
  reducers: {
    setBooks: (state, action) => {
      state.books = action.payload;
    },
  },
});

export const { setBooks } = bookReducer.actions;
export default bookReducer.reducer;

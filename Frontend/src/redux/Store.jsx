import { configureStore } from "@reduxjs/toolkit";
// import bookReducer from "./slices/bookSlice";
// import authReducer from "./slices/authSlice";
import bookReducer from "./reducers/Book";
  import authReducer from "./reducers/Auth";

export const store = configureStore({
  reducer: {
    books: bookReducer,
    auth: authReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("role") ? { role: localStorage.getItem("role") } : null, // ✅ Restore user from localStorage
};

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = { role: action.payload.user.role }; // ✅ Store role properly

      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("role", action.payload.user.role); // ✅ Persist role in localStorage
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("role"); // ✅ Remove role on logout
    },
  },
});

export const { loginSuccess, logout } = authReducer.actions;
export default authReducer.reducer;

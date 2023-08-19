import { createSlice } from "@reduxjs/toolkit";
import { registerDB } from "./operations";

const initialState = {
  user: { name: null, email: null, userID: null },
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: {
    //register
    [registerDB.fulfilled](state, action) {
      state.user.email = action.payload.user.email;
      state.user.name = action.payload.user.name;
      state.token = action.payload.user.idToken;
      state.isLoggedIn = true;
    },
  },
});

export const authReducer = authSlice.reducer;

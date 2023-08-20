import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  name: null,
  email: null,
  image: null,
  stateChange: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      name: payload.name,
      email: payload.email,
      image: payload.image,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => state,
    updatePhoto: (state, { payload }) => ({
      ...state,
      image: payload.image,
    }),
  },
});

export const authReducer = authSlice.reducer;

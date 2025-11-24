import { createSlice } from "@reduxjs/toolkit";

const INITIAL_USER = {
  user: { role: "" },
  accessToken: "",
  refreshToken: "",
  otpTokenId: "",
  loginDetails: { email: "" },
  office: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState: INITIAL_USER,
  reducers: {
    handleLoginSlice: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loginDetails = { username: action.payload.username };

      return state;
    },
    handleLogoutSlice: (state) => {
      state = INITIAL_USER;

      return state;
    },
    handleSignUpSlice: (state, action) => {
      state.otpTokenId = action.payload.otpTokenId;
      state.user = { role: action.payload.role || "" };
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.loginDetails = { email: action.payload.email };

      return state;
    },
    handleRefreshToken: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      return state;
    },
    handleUserUpdate: (state, action) => {
      state.user = { ...state.user, ...action.payload };

      return state;
    },
    handleOfficeUpdate: (state, action) => {
      state.office = action.payload;

      return state;
    },
  },
});

export const {
  handleLoginSlice,
  handleLogoutSlice,
  handleSignUpSlice,
  handleRefreshToken,
  handleUserUpdate,
  handleOfficeUpdate,
} = authSlice.actions;

export default authSlice.reducer;

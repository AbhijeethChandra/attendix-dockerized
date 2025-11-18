import { createSlice } from "@reduxjs/toolkit";

const INITIAL_THEME = {
  themeName: "DARK",
  sideBar: "EXPANDED", // or COLLAPSED
};

const themeSlice = createSlice({
  name: "THEME",
  initialState: INITIAL_THEME,
  reducers: {
    changeTheme(state, action) {
      state.themeName = action.payload.themeName;
      return state;
    },
    toggleSidebar(state, action) {
      state.sideBar = action.payload
        ? action.payload
        : state.sideBar === "EXPANDED"
        ? "COLLAPSED"
        : "EXPANDED";
        
      return state;
    },
  },
});

export const { changeTheme, toggleSidebar } = themeSlice.actions;

export default themeSlice.reducer;

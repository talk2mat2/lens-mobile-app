import { createSlice } from "@reduxjs/toolkit";
import { AsyncRemove } from "../../components/Helpers";

const initialState = {
  colorMode: "light",
};

export const themeSlice = createSlice({
  name: "colormode",
  initialState,
  reducers: {
    toggle: (state) => {
      state.colorMode === "dark"
        ? (state.colorMode = "light")
        : (state.colorMode = "dark");
    },
  },
});

// Action creators are generated for each case reducer function
export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;

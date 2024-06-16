import { createSlice } from "@reduxjs/toolkit";
import { AsyncRemove } from "../../components/Helpers";

const initialState = {
  data: {},
  isLoggedIn: false,
  onBoarded: false,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.isLoggedIn = false;
      state.data = {};
      AsyncRemove("token");
    },
    logIn: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    completeOnboard: (state) => {
      state.onBoarded = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logIn, logOut, completeOnboard } = usersSlice.actions;

export default usersSlice.reducer;

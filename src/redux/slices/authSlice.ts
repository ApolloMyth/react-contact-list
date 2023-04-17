import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { IAuth } from "../../@types";

const initialState: IAuth = {
  email: "",
  uid: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IAuth>) => {
      state.email = action.payload.email;
      state.uid = action.payload.uid;
    },
    removeUser: (state) => {
      state.email = "";
      state.uid = "";
    },
  },
});

export const { setUser, removeUser } = authSlice.actions;
export default authSlice.reducer;

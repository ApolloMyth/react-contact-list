import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { Contact, IContacts } from "../../@types";

const initialState: IContacts = {
  search: "",
  searchList: [],
  contacts: [],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSearchLine: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      contactsSlice.caseReducers.setSearchList(state);
    },

    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.contacts = action.payload;
      contactsSlice.caseReducers.setSearchList(state);
    },
    removeContacts: (state) => {
      state.search = "";
      state.searchList = [];
      state.contacts = [];
      contactsSlice.caseReducers.setSearchList(state);
    },
    setSearchList: (state) => {
      state.searchList = state.contacts.filter(
        (i) => i.name.toLowerCase().indexOf(state.search.toLowerCase()) > -1
      );
    },
  },
});

export const { setSearchLine, setContacts, removeContacts } =
  contactsSlice.actions;
export default contactsSlice.reducer;

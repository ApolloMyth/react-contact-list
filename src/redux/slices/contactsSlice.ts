import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Contact, IContacts } from "../../@types/IContacts";

const initialState: IContacts = {
  search: "",
  searchList: [
    {
      name: "Patrick Taylor",
      phone: "+61295479263",
      email: "london95@bashirian.biz",
      id: "4ae35ad3-53ab-41af-b095-7fcba845093c",
    },
    {
      name: "Zachary Collins",
      phone: "+358404163945",
      email: "viivi.mantyla@jippii.fi",
      id: "ba465f0e-63e9-41f9-9610-9863e0e85560",
    },
    {
      name: "Eetu Heino",
      phone: "+358445548462",
      email: "nyman.christa@tastula.biz",
      id: "03533569-862c-4116-a598-3dca409aab0a",
    },
  ],
  contacts: [
    {
      name: "Patrick Taylor",
      phone: "+61295479263",
      email: "london95@bashirian.biz",
      id: "4ae35ad3-53ab-41af-b095-7fcba845093c",
    },
    {
      name: "Zachary Collins",
      phone: "+358404163945",
      email: "viivi.mantyla@jippii.fi",
      id: "ba465f0e-63e9-41f9-9610-9863e0e85560",
    },
    {
      name: "Eetu Heino",
      phone: "+358445548462",
      email: "nyman.christa@tastula.biz",
      id: "03533569-862c-4116-a598-3dca409aab0a",
    },
  ],
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push({ ...action.payload });
      contactsSlice.caseReducers.setSearchList(state);
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(
        (contact) => contact.id !== action.payload
      );
      contactsSlice.caseReducers.setSearchList(state);
    },
    changeContact: (state, action: PayloadAction<Contact>) => {
      state.contacts = state.contacts.map((contact) =>
        contact.id === action.payload.id ? { ...action.payload } : contact
      );
      contactsSlice.caseReducers.setSearchList(state);
    },
    setSearchLine: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
      contactsSlice.caseReducers.setSearchList(state);
    },
    setSearchList: (state) => {
      state.searchList = state.contacts.filter(
        (i) => i.name.toLowerCase().indexOf(state.search.toLowerCase()) > -1
      );
    },
  },
});

export const { addContact, deleteContact, changeContact, setSearchLine } =
  contactsSlice.actions;
export default contactsSlice.reducer;

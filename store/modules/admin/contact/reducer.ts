import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import Contact from '../../../../dtos/Contact';

const contactSlice = createSlice({
  name: 'contact',
  initialState: null,
  reducers: {
    setContactToEdit(state: Contact, action: PayloadAction<Contact>) {
      return state = action.payload;
    },
    clearContactToEdit(state: Contact) {
      return state = null;
    },
  }
})

export const { setContactToEdit, clearContactToEdit } = contactSlice.actions;
export default contactSlice.reducer;
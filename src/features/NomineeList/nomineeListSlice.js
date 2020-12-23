import { createSlice } from '@reduxjs/toolkit';

export const nomineeListSlice = createSlice({
  name: 'NomineeList',
  initialState: {
    value: [],
    isDialogShown: false
  },
  reducers: {
    addNominee: (state, action) => {
      state.value.push(action.payload);
    },
    removeNominee: (state, action) => {
      state.value = state.value.filter(nominee => nominee.imdbID !== action.payload.imdbID);
    },
    setNominees: (state, action) => {
      state.value = action.payload;
    },
    clearNominees: (state) => {
      state.value = []
    },
    openDialog: (state) => {
      state.isDialogShown = true;
    }, 
    closeDialog: (state) => {
      state.isDialogShown = false
    }
  },
});

export const { addNominee, removeNominee, setNominees, clearNominees, openDialog, closeDialog } = nomineeListSlice.actions;

export const selectNominees = state => state.nominees.value;

export const selectIsDialogShown = state => state.nominees.isDialogShown

export default nomineeListSlice.reducer;

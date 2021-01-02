import { createSlice } from '@reduxjs/toolkit';
import { loadNominees } from '../../app/localstorage';

/**
 * Redux slice for nominee list and showing nominee list dialog box 
 * including name, initial state, reducers, actions, and selectors
 */
export const nomineeListSlice = createSlice({
  name: 'NomineeList',
  initialState: {
    // loads nominees from local storage as initial list
    list: loadNominees(),
    isDialogShown: false
  },
  reducers: {
    addNominee: (state, action) => {
      state.list.push(action.payload);
    },
    removeNominee: (state, action) => {
      state.list = state.list.filter(nominee => nominee.imdbID !== action.payload.imdbID);
    },
    clearNominees: (state) => {
      state.list = []
    },
    openDialog: (state) => {
      state.isDialogShown = true;
    }, 
    closeDialog: (state) => {
      state.isDialogShown = false
    }
  },
});

export const { addNominee, removeNominee, clearNominees, openDialog, closeDialog } = nomineeListSlice.actions;

export const selectNominees = state => state.nominees.list;

export const selectIsDialogShown = state => state.nominees.isDialogShown

export default nomineeListSlice.reducer;

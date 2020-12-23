import { createSlice } from '@reduxjs/toolkit';

export const nomineeListSlice = createSlice({
  name: 'NomineeList',
  initialState: {
    value: [],
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
    }
  },
});

export const { addNominee, removeNominee, setNominees, clearNominees } = nomineeListSlice.actions;

export const selectNominees = state => state.nominees.value;

export default nomineeListSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

export const searchResultsSlice = createSlice({
  name: 'Search Results',
  initialState: {
    value: [],
    totalResults: 0
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.value = action.payload;
    },
    clearSearchResults: (state) => {
        state.value = []
    }, 
    addSearchResults: (state, action) => {
      state.value = state.value.concat(action.payload);
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload
    }
  },
});

export const { setSearchResults, clearSearchResults, addSearchResults, setTotalResults } = searchResultsSlice.actions;

export const selectSearchResults = state => state.searchResults.value;

export const selectSearchTotal = state => state.searchResults.totalResults;

export default searchResultsSlice.reducer;

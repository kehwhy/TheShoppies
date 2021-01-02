import { configureStore } from '@reduxjs/toolkit';
import nomineeListReducer from '../features/NomineeList/nomineeListSlice'
import searchResultsReducer from '../features/SearchResultsTable/searchResultsSlice'

export default configureStore({
  reducer: {
    nominees: nomineeListReducer, 
    searchResults: searchResultsReducer
  },
});

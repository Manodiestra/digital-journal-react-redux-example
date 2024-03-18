import { configureStore } from '@reduxjs/toolkit';
import journalReducer from '../reducers/journalSlice';

const store = configureStore({
  reducer: {
    journal: journalReducer,
    // Add other slices here if needed
  },
  // The middleware field is optional if you're just using the defaults
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import journalReducer from '../reducers/journalSlice';

const store = configureStore({
  reducer: {
    journal: journalReducer,
    // Add other reducers here if needed
  },
});

export default store;

import { configureStore } from '@reduxjs/toolkit';
import journalReducer from '../reducers/journalSlice';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    journal: journalReducer,
    // Add other reducers here if needed
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

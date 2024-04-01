import { configureStore } from '@reduxjs/toolkit';
import journalReducer from '../reducers/journalSlice';
import authReducer from '../reducers/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    journal: journalReducer,
  },
});

export default store;

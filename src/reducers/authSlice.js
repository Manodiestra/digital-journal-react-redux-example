import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  id: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = null;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    clearId(state) {
      state.id = null;
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export const { setId, clearId } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectId = (state) => state.auth.id;

export default authSlice.reducer;

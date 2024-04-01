import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getCsrfToken = () => {
  const csrfToken = document.cookie.split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];
  return csrfToken;
};

const initialState = {
  entries: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

export const fetchJournalEntries = createAsyncThunk(
  'journal/fetchJournalEntries',
  async (_, { getState }) => {
    const { token, id } = getState().auth; // Destructure to get token and user ID from auth state
    const response = await fetch('/api/journal/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-User-ID': id,
      },
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
);

export const addJournalEntry = createAsyncThunk(
  'journal/addJournalEntry',
  async (newEntry, { getState }) => {
    const { token, id } = getState().auth;
    const response = await fetch('/api/journal/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...newEntry, user_id: id })
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  }
);

export const editJournalEntry = createAsyncThunk(
  'journal/editJournalEntry',
  async ({ id, updatedEntry }, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`/api/journal/${id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': getCsrfToken(),
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedEntry)
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json(); // Assuming your server responds with the updated entry
  }
);

export const deleteJournalEntry = createAsyncThunk(
  'journal/deleteJournalEntry',
  async (id, { getState }) => {
    const token = getState().auth.token;
    const response = await fetch(`/api/journal/${id}/`, {
      method: 'DELETE',
      headers: {
        'X-CSRFToken': getCsrfToken(),
        'Authorization': `Bearer ${token}`,
      }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return id;
  }
);

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch entries
      .addCase(fetchJournalEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJournalEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = action.payload;
      })
      .addCase(fetchJournalEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Add entry
      .addCase(addJournalEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addJournalEntry.fulfilled, (state, action) => {
        state.entries.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(addJournalEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Edit entry
      .addCase(editJournalEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(editJournalEntry.fulfilled, (state, action) => {
        const index = state.entries.findIndex(entry => entry.id === action.payload.id);
        if (index !== -1) {
          state.entries[index] = { ...state.entries[index], ...action.payload };
        }
        state.status = 'succeeded';
      })
      .addCase(editJournalEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(deleteJournalEntry.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteJournalEntry.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.entries = state.entries.filter(entry => entry.id !== action.payload); // Remove the deleted entry from the state
      })
      .addCase(deleteJournalEntry.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default journalSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  entries: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

// Async thunk actions
export const fetchJournalEntries = createAsyncThunk('journal/fetchJournalEntries', async () => {
  const response = await fetch('/api/journal');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json(); // Assuming your server responds with the list of entries
});

export const addJournalEntry = createAsyncThunk('journal/addJournalEntry', async (newEntry) => {
  const response = await fetch('/api/journal', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newEntry) // Removing the client-side ID generation
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json(); // Assuming your server responds with the newly added entry
});

export const editJournalEntry = createAsyncThunk('journal/editJournalEntry', async ({ id, updatedEntry }) => {
  const response = await fetch(`/api/journal/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updatedEntry)
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return await response.json(); // Assuming your server responds with the updated entry
});

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
      });
  },
});

export default journalSlice.reducer;

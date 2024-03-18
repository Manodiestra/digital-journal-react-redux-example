import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios'; // Assuming you are using axios for HTTP requests

const initialState = {
  entries: [],
  status: 'idle', // 'idle', 'loading', 'succeeded', 'failed'
  error: null
};

// Async thunk actions
export const fetchJournalEntries = createAsyncThunk('journal/fetchJournalEntries', async () => {
  const response = await axios.get('/api/journal');
  return response.data; // Assuming your server responds with the list of entries
});

export const addJournalEntry = createAsyncThunk('journal/addJournalEntry', async (newEntry) => {
  const response = await axios.post('/api/journal', {
    id: uuidv4(), // Generate a UUID server-side if possible
    ...newEntry
  });
  return response.data; // Assuming your server responds with the newly added entry
});

export const editJournalEntry = createAsyncThunk('journal/editJournalEntry', async ({ id, updatedEntry }) => {
  const response = await axios.put(`/api/journal/${id}`, updatedEntry);
  return response.data; // Assuming your server responds with the updated entry
});

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJournalEntries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJournalEntries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Add any fetched entries to the array
        state.entries = action.payload;
      })
      .addCase(fetchJournalEntries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Handling pending state for adding a journal entry
    .addCase(addJournalEntry.pending, (state) => {
      state.status = 'loading';
    })
    // Handling fulfilled state for adding a journal entry
    .addCase(addJournalEntry.fulfilled, (state, action) => {
      state.entries.push(action.payload);
      state.status = 'succeeded';
    })
    // Handling rejected state for adding a journal entry
    .addCase(addJournalEntry.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
    // Handling pending state for editing a journal entry
    .addCase(editJournalEntry.pending, (state) => {
      state.status = 'loading';
    })
    // Handling fulfilled state for editing a journal entry
    .addCase(editJournalEntry.fulfilled, (state, action) => {
      const index = state.entries.findIndex(entry => entry.id === action.payload.id);
      if (index !== -1) {
        state.entries[index] = { ...state.entries[index], ...action.payload };
      }
      state.status = 'succeeded';
    })
    // Handling rejected state for editing a journal entry
    .addCase(editJournalEntry.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });

    /**
     * If you wanted to implement an optimistic updates strategy
     * you could set up the add and edit reducers like this:

      .addCase(addJournalEntry.fulfilled, (state, action) => {
        // Assuming the server gives you the complete entry back, including the id
        state.entries.push(action.payload);
      })
      .addCase(editJournalEntry.fulfilled, (state, action) => {
        const { id, ...updatedEntry } = action.payload;
        const index = state.entries.findIndex(entry => entry.id === id);
        if (index !== -1) {
          state.entries[index] = { ...state.entries[index], ...updatedEntry };
        }
      });
     */
  },
});

export default journalSlice.reducer;

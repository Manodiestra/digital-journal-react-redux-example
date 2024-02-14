import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  entries: []
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addJournalEntry: (state, action) => {
      const newEntry = {
        id: uuidv4(), // Generate a UUID
        ...action.payload
      };
      state.entries.push(newEntry);
    },
    getJournalEntries: (state) => {
      return state;
    },
    getJournalEntry: (state, action) => {
      const entryId = action.payload;
      const entry = state.entries.find(entry => entry.id === entryId);
      return entry ? entry : state;
    },
    editJournalEntry: (state, action) => {
      const { id, updatedEntry } = action.payload;
      const updatedEntries = state.entries.map(entry =>
        entry.id === id ? updatedEntry : entry
      );
      state.entries = updatedEntries;
    },
  },
});

export const { addJournalEntry, getJournalEntries, getJournalEntry, editJournalEntry } = journalSlice.actions;
export default journalSlice.reducer;

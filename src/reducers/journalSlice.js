import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  entries: [],
};

const journalSlice = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    addJournalEntry: (state, action) => {
      state.entries.push(action.payload);
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

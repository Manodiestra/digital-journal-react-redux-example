export const addJournalEntry = (entryData) => {
  return {
    type: 'ADD_JOURNAL_ENTRY',
    payload: entryData,
  };
};

export const getJournalEntries = () => {
  return {
    type: 'GET_JOURNAL_ENTRIES',
  };
};

export const getJournalEntry = (id) => {
  return {
    type: 'GET_JOURNAL_ENTRY',
    payload: id,
  };
};

export const editJournalEntry = (id, updatedEntry) => {
  return {
    type: 'EDIT_JOURNAL_ENTRY',
    payload: { id, updatedEntry },
  };
};

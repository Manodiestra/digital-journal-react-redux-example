import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getJournalEntries } from '../actions/journalActions';

const JournalListPage = ({ entries, getEntries }) => {
  useEffect(() => {
    getEntries();
  }, [getEntries]);

  return (
    <div>
      <h1>Journal Entries</h1>
      {/* Display journal entries */}
    </div>
  );
};

const mapStateToProps = (state) => ({
  entries: state.journal.entries,
});

const mapDispatchToProps = (dispatch) => ({
  getEntries: () => dispatch(getJournalEntries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalListPage);

import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getJournalEntries } from '../reducers/journalSlice';
import { Link } from 'react-router-dom';
import JournalEntrySummary from '../components/JournalEntrySummary';
import './JournalListPage.styles.css'; // Import external stylesheet

const JournalListPage = ({ entries, getEntries }) => {
  useEffect(() => {
    getEntries();
  }, [getEntries]);

  return (
    <div className="container">
      <h1>Journal Entries</h1>
      <div className="navigation">
        <Link to="/calendar" className="button">Go to Calendar</Link>
        <Link to="/new-entry" className="button">Go to New Entry</Link>
      </div>
      <div className="entries-list">
        {entries.map(entry => (
          <JournalEntrySummary key={entry.id} entry={entry} />
        ))}
      </div>
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

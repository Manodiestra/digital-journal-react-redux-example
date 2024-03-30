import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchJournalEntries } from '../reducers/journalSlice';
import { Link, useNavigate } from 'react-router-dom';
import JournalEntrySummary from '../components/JournalEntrySummary';
import './JournalListPage.styles.css';
import { isLoggedIn, parseTokenFromUrl, redirectToLogin, logout } from '../services/authService';

const JournalListPage = ({ entries, getEntries }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in
    if (!isLoggedIn()) {
      redirectToLogin(); // Redirect to Cognito login page if not logged in
    } else {
      getEntries(); // Fetch journal entries if logged in
    }
  }, [getEntries]);

  useEffect(() => {
    // Parse the token from the URL if present and save it
    const token = parseTokenFromUrl();
    if (token) {
      localStorage.setItem('idToken', token); // Save the token in local storage
      navigate('/'); // Navigate to the home page
      window.location.hash = ''; // Clear the hash from the URL
    }
  }, []);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="container">
      <h1>Journal Entries</h1>
      <div className="navigation">
        <Link to="/" className="button">Go to List View</Link>
        <Link to="/calendar" className="button">Go to Calendar</Link>
        <Link to="/new-entry" className="button">Go to New Entry</Link>
        <button onClick={handleLogout} className="button">Logout</button>
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
  getEntries: () => dispatch(fetchJournalEntries()),
});

export default connect(mapStateToProps, mapDispatchToProps)(JournalListPage);

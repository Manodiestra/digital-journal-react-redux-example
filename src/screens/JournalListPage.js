import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { fetchJournalEntries } from '../reducers/journalSlice';
import { selectToken, clearToken } from '../reducers/authSlice';
import JournalEntrySummary from '../components/JournalEntrySummary';
import './JournalListPage.styles.css';
import { parseTokenFromUrl, redirectToLogin, logout, saveTokenToState, saveIdToState } from '../services/authService';
import { jwtDecode } from 'jwt-decode';

const JournalListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const entries = useSelector((state) => state.journal.entries);
  const [tokenProcessed, setTokenProcessed] = useState(false); // State to track if the token has been processed
  const token = useSelector(selectToken);

  useEffect(() => {
    const urlToken = parseTokenFromUrl(); // Attempt to retrieve the token from the URL first
    if (!token && !urlToken) { // If there's no token in either Redux state or URL, redirect to login
      redirectToLogin();
    } else if (urlToken) {
      const decoded = jwtDecode(urlToken);
      const userId = decoded?.sub;
      dispatch(saveIdToState(userId));
      dispatch(saveTokenToState(urlToken)); // Save the token from URL to Redux state
      window.location.hash = ''; // Clear the hash from the URL
      setTokenProcessed(true);
    } else if (token) {
      setTokenProcessed(true); // If there's already a token in the Redux state, proceed
    }
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (tokenProcessed) {
      dispatch(fetchJournalEntries()); // Fetch journal entries once the token is processed
    }
  }, [dispatch, tokenProcessed]); // Depend on tokenProcessed to trigger journal entries fetching

  const handleLogout = () => {
    logout();
    dispatch(clearToken());
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

export default JournalListPage;

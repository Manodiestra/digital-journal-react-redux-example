import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { fetchJournalEntries } from '../reducers/journalSlice';
import { selectToken, clearToken } from '../reducers/authSlice';
import JournalEntrySummary from '../components/JournalEntrySummary';
import { parseTokenFromUrl, redirectToLogin, logout, saveTokenToState, saveIdToState } from '../services/authService';
import { jwtDecode } from 'jwt-decode';
import { Container, Button, Typography, Grid, Link } from '@mui/material';

const JournalListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const entries = useSelector((state) => state.journal.entries);
  const [tokenProcessed, setTokenProcessed] = useState(false);
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
  }, [dispatch, tokenProcessed]);

  const handleLogout = () => {
    logout();
    dispatch(clearToken());
  };

  return (
    <Container maxWidth="sm" sx={{ padding: '20px', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h4" gutterBottom>
        Journal Entries
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
        <Grid item>
          <Button component={RouterLink} to="/" variant="contained" color="primary">
            Go to List View
          </Button>
        </Grid>
        <Grid item>
          <Button component={RouterLink} to="/calendar" variant="contained" color="primary">
            Go to Calendar
          </Button>
        </Grid>
        <Grid item>
          <Button component={RouterLink} to="/new-entry" variant="contained" color="primary">
            Go to New Entry
          </Button>
        </Grid>
        <Grid item>
          <Button onClick={handleLogout} variant="contained" color="secondary">
            Logout
          </Button>
        </Grid>
      </Grid>
      <div>
        {entries.map(entry => (
          <JournalEntrySummary key={entry.id} entry={entry} />
        ))}
      </div>
    </Container>
  );
};

export default JournalListPage;

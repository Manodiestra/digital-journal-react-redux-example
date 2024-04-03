import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addJournalEntry } from '../reducers/journalSlice';
import { Link, useLocation } from 'react-router-dom';
import { Container, TextField, Button, Box, Typography } from '@mui/material';
import { Link as MuiLink } from '@mui/material';

const NewEntryPage = ({ addJournalEntry }) => {
  const location = useLocation(); // Initialize useLocation hook to access location object

  // Function to format a Date object to "YYYY-MM-DDTHH:MM"
  const formatDateToDateTimeLocal = (inputDate) => {
    // Create a new Date object from the input date
    const date = new Date(inputDate);

    // Adjust for time zone
    const userTimezoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconds
    const adjustedDate = new Date(date.getTime() + userTimezoneOffset); // Add offset for time zones ahead of UTC

    // Format the adjusted date to "YYYY-MM-DDTHH:MM"
    return `${adjustedDate.getFullYear()}-${String(adjustedDate.getMonth() + 1).padStart(2, '0')}-${String(adjustedDate.getDate()).padStart(2, '0')}T00:00`;
  };

  // Check if there's a date passed in location state and initialize dateTime with it
  const initialDateTime = location.state?.date
    ? formatDateToDateTimeLocal(new Date(location.state.date))
    : new Date().toISOString().slice(0, 16); // format: YYYY-MM-DDTHH:MM

  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(initialDateTime);
  const [content, setContent] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = () => {
    // Call Redux action to add journal entry
    addJournalEntry({
      title: title,
      dateTime: dateTime,
      content: content,
    });

    // Reset fields after submission
    setTitle('');
    setDateTime(new Date().toISOString().slice(0, 16));
    setContent('');
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>New Entry</Typography>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <MuiLink component={Link} to="/" underline="none">
          <Button variant="contained">Go to List View</Button>
        </MuiLink>
        <MuiLink component={Link} to="/calendar" underline="none">
          <Button variant="contained">Go to Calendar</Button>
        </MuiLink>
        <MuiLink component={Link} to="/new-entry" underline="none">
          <Button variant="contained">Go to New Entry</Button>
        </MuiLink>
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Title"
          variant="outlined"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          type="datetime-local"
          label="Date and Time"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          value={dateTime}
          onChange={e => setDateTime(e.target.value)}
        />
      </Box>
      <Box mb={2}>
        <TextField
          fullWidth
          label="Journal Entry"
          multiline
          rows={6}
          variant="outlined"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </Box>
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Submit Entry
      </Button>
    </Container>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addJournalEntry: (entry) => dispatch(addJournalEntry(entry)),
});

export default connect(null, mapDispatchToProps)(NewEntryPage);

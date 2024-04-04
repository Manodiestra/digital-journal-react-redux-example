import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteJournalEntry } from '../reducers/journalSlice';
import { Card, CardContent, Typography, Button } from '@mui/material';

const JournalEntrySummary = ({ entry }) => {
  const dispatch = useDispatch(); // Initialize the useDispatch hook

  if (!entry) {
    console.log("No valid entry data:", entry);
    return null;
  }

  // Function to shorten the body if it's longer than 300 characters
  const shortenContent = (body) => {
    if (body.length > 300) {
      return body.substring(0, 300) + '...';
    }
    return body;
  };

  // Function to handle the delete button click
  const handleDeleteClick = () => {
    dispatch(deleteJournalEntry(entry.id)); // Dispatch the delete action with the entry's ID
  };

  return (
    <Card sx={{ marginBottom: '10px' }}>
      <CardContent>
        <Typography variant="h6" component="div">
          {entry.title}
        </Typography>
        <Typography sx={{ fontSize: 14, marginTop: '5px' }} color="text.secondary" gutterBottom>
          Date: {new Date(entry.dateTime).toLocaleString()}
        </Typography>
        <Typography variant="body2" sx={{ marginTop: '10px' }}>
          {shortenContent(entry.content)}
        </Typography>
        <Button onClick={handleDeleteClick} sx={{ marginTop: '10px' }} variant="outlined" color="error">
          Delete
        </Button>
      </CardContent>
    </Card>
  );
};

export default JournalEntrySummary;

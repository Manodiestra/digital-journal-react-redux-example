import React from 'react';
import { useDispatch } from 'react-redux'; 
import { deleteJournalEntry } from '../reducers/journalSlice';
import './JournalEntrySummary.styles.css'; 

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
    <div className="entry-summary">
      <div className="entry-title">{entry.title}</div>
      <div className="entry-date">Date: {new Date(entry.dateTime).toLocaleString()}</div>
      <div className="entry-body">{shortenContent(entry.content)}</div>
      <button onClick={handleDeleteClick} className="delete-button">Delete</button> {/* Add delete button */}
    </div>
  );
};

export default JournalEntrySummary;

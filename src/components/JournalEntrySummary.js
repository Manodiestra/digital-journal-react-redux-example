import React from 'react';
import './JournalEntrySummary.styles.css'; // Import external stylesheet

const JournalEntrySummary = ({ entry }) => {
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

  return (
    <div className="entry-summary">
      <div className="entry-title">{entry.title}</div>
      <div className="entry-date">Date: {new Date(entry.dateTime).toLocaleString()}</div>
      <div className="entry-body">{shortenContent(entry.content)}</div>
    </div>
  );
};

export default JournalEntrySummary;

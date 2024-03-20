import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addJournalEntry } from '../reducers/journalSlice';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation
import './NewEntryPage.styles.css'; // Import external stylesheet

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
    <div className="container">
      <h1>New Entry</h1>
      <div className="navigation">
        <Link to="/" className="button">Go to List View</Link>
        <Link to="/calendar" className="button">Go to Calendar</Link>
        <Link to="/new-entry" className="button">Go to New Entry</Link>
      </div>
      <div className="form-group">
        <label className="label">Title:</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={handleTitleChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Date and Time:</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={handleDateTimeChange}
          className="input"
        />
      </div>
      <div className="form-group">
        <label className="label">Journal Entry:</label>
        <textarea
          placeholder="Enter your journal entry here"
          value={content}
          onChange={handleContentChange}
          rows={6}
          className="textarea"
        />
      </div>
      <button onClick={handleSubmit} className="button">Submit Entry</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addJournalEntry: (entry) => dispatch(addJournalEntry(entry)),
});

export default connect(null, mapDispatchToProps)(NewEntryPage);

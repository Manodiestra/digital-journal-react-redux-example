import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addJournalEntry } from '../reducers/journalSlice';
import { Link } from 'react-router-dom';
import './NewEntryPage.styles.css'; // Import external stylesheet

const NewEntryPage = ({ addJournalEntry }) => {
  const [title, setTitle] = useState('');
  const [dateTime, setDateTime] = useState(new Date().toISOString().slice(0, 16)); // format: YYYY-MM-DDTHH:MM
  const [body, setBody] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDateTimeChange = (e) => {
    setDateTime(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBody(e.target.value);
  };

  const handleSubmit = () => {
    // Call Redux action to add journal entry
    addJournalEntry({
      title,
      dateTime,
      body,
    });

    // Reset fields after submission
    setTitle('');
    setDateTime(new Date().toISOString().slice(0, 16));
    setBody('');
  };

  return (
    <div className="container">
      <h1>New Entry</h1>
      <div className="navigation">
        <Link to="/" className="button">Go to List View</Link>
        <Link to="/calendar" className="button">Go to Calendar</Link>
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
          value={body}
          onChange={handleBodyChange}
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

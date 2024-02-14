// CalendarPage.js
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getJournalEntries } from '../reducers/journalSlice';
import { Link } from 'react-router-dom';
import './CalendarPage.styles.css'; // Import external stylesheet

const CalendarPage = ({ entries, getEntries }) => {
  useEffect(() => {
    getEntries();
  }, [getEntries]);

  // Get current date
  const currentDate = new Date();

  // Get current month and year
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Get the number of days in the current month
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Get the day of the week that the month starts on
  const monthStartDay = new Date(currentYear, currentMonth, 1).getDay();

  // Array to store journal entry dates
  const journalEntryDates = entries.map(entry => new Date(entry.dateTime).getDate());

  // Generate calendar grid
  const calendarGrid = [];
  let dayCounter = 1;
  let currentWeek = [];

  // Calculate the number of weeks needed
  const numWeeks = Math.ceil((daysInMonth + monthStartDay) / 7);

  for (let i = 0; i < numWeeks; i++) {
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < monthStartDay) {
        // Fill empty cells before the start of the month
        currentWeek.push(null);
      } else if (dayCounter <= daysInMonth) {
        // Check if there is a journal entry for the current date
        const hasJournalEntry = journalEntryDates.includes(dayCounter);
        currentWeek.push({ day: dayCounter, hasJournalEntry });
        dayCounter++;
      } else {
        // Fill empty cells after the end of the month
        currentWeek.push(null);
      }

      // If the current week is complete, add it to the calendar grid and start a new week
      if (currentWeek.length === 7) {
        calendarGrid.push(currentWeek);
        currentWeek = [];
      }
    }
  }

  return (
    <div className="container">
      <h1>Calendar</h1>
      <div className="navigation">
        <Link to="/" className="button">Go to List View</Link>
        <Link to="/new-entry" className="button">Go to New Entry</Link>
      </div>
      <div className="calendar">
        <div className="header">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        {calendarGrid.map((week, index) => (
          <div key={index} className="week">
            {week.map((day, idx) => (
              <div key={idx} className={`day ${day && day.hasJournalEntry ? 'has-entry' : ''}`}>
                {day && day.day}
              </div>
            ))}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(CalendarPage);

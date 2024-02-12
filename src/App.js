import React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import JournalListPage from './screens/JournalListPage';
import CalendarPage from './screens/CalendarPage';
import NewEntryPage from './screens/NewEntryPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <JournalListPage/>,
  },
  {
    path: "/calendar",
    element: <CalendarPage/>,
  },
  {
    path: "/new-entry",
    element: <NewEntryPage/>,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;

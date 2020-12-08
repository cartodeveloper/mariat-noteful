import React from "react";

const NotefulContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
  updateNote: () => {},
});

export default NotefulContext;

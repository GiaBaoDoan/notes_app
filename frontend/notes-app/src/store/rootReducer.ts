import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "../slice/user.slice";
import notesReducer from "../slice/notes.slice";
import deleteNoteReducer from "../slice/delete-note.slice";
import postNoteReducer from "../slice/post-note.slice";
import pinNoteReducer from "../slice/pin-note.slice";
import updateNoteReducer from "../slice/update-note.slice";
import searchNoteSlice from "../slice/search-note.slice";

const rootReducer = combineReducers({
  userReducer,
  notesReducer,
  deleteNoteReducer,
  postNoteReducer,
  pinNoteReducer,
  updateNoteReducer,
  searchNoteSlice,
});

export default rootReducer;

import { createSlice } from "@reduxjs/toolkit";
import { searchNote } from "../thunk/search-note.thunk";
import { Note } from "./notes.slice";

type initialState = {
  isLoading: boolean;
  errorMessage: string;
  notesSearch: Note[];
};

const initialState: initialState = {
  isLoading: false,
  errorMessage: "",
  notesSearch: [],
};

const searchNoteSlice = createSlice({
  name: "notes/deleteNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(searchNote.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notesSearch = action.payload;
    });
    builder.addCase(searchNote.rejected, (state, action: any) => {
      state.isLoading = false;
      state.errorMessage = action.payload.response?.data?.message;
    });
  },
});

export const {} = searchNoteSlice.actions;

export default searchNoteSlice.reducer;

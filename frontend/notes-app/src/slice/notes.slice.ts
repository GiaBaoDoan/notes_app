import { createSlice } from "@reduxjs/toolkit";
import { getNotes } from "../thunk/notes.thunk";

export type Note = {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  isPinned: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
};

type initialState = {
  isLoading: boolean;
  errorMessage: string;
  notes: Note[];
};

const initialState: initialState = {
  isLoading: false,
  errorMessage: "",
  notes: [],
};

const notesSlice = createSlice({
  name: "notes/getNotes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotes.pending, (state) => {
      state.isLoading = true;
      state.notes = [];
    });
    builder.addCase(getNotes.fulfilled, (state, action) => {
      state.isLoading = false;
      state.notes = action.payload;
    });
    builder.addCase(getNotes.rejected, (state, action: any) => {
      state.isLoading = false;
      state.errorMessage = action.payload.response?.data?.message;
    });
  },
});

export const {} = notesSlice.actions;

export default notesSlice.reducer;

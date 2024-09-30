import { createSlice } from "@reduxjs/toolkit";
import { deleteNote } from "../thunk/delete-note.thunk";
import { toast } from "react-toastify";

type initialState = {
  isLoading: boolean;
  errorMessage: string;
};

const initialState: initialState = {
  isLoading: false,
  errorMessage: "",
};

const deleteNoteSlice = createSlice({
  name: "notes/deleteNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteNote.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("Delete note successfully!");
    });
    builder.addCase(deleteNote.rejected, (state, action: any) => {
      state.isLoading = false;
      state.errorMessage = action.payload.response?.data?.message;
    });
  },
});

export const {} = deleteNoteSlice.actions;

export default deleteNoteSlice.reducer;

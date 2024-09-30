import { createSlice } from "@reduxjs/toolkit";
import { updateNote } from "../thunk/update-note.thunk";
import { toast } from "react-toastify";

type initialState = {
  isLoading: boolean;
  errorMessage: string;
};

const initialState: initialState = {
  isLoading: false,
  errorMessage: "",
};

const updateNoteSlice = createSlice({
  name: "notes/updateNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateNote.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("Update note successfully!");
    });
    builder.addCase(updateNote.rejected, (state, action: any) => {
      state.isLoading = false;
      state.errorMessage = action.payload.response?.data?.message;
    });
  },
});

export const {} = updateNoteSlice.actions;

export default updateNoteSlice.reducer;

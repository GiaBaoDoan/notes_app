import { createSlice } from "@reduxjs/toolkit";
import { postNote } from "../thunk/post-note.thunk";
import { toast } from "react-toastify";

type initialState = {
  isLoading: boolean;
  errorMessage: string;
};

const initialState: initialState = {
  isLoading: false,
  errorMessage: "",
};

const postNoteSlice = createSlice({
  name: "notes/postNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postNote.fulfilled, (state) => {
      state.isLoading = false;
      toast.success("Create new note successfully!");
    });
    builder.addCase(postNote.rejected, (state, action: any) => {
      state.isLoading = false;
      state.errorMessage = action.payload.response?.data?.message;
    });
  },
});

export const {} = postNoteSlice.actions;

export default postNoteSlice.reducer;

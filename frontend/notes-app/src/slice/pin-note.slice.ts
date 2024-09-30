import { createSlice } from "@reduxjs/toolkit";
import { pinNote } from "../thunk/pin-note.thunk";

type initialState = {
  isLoading: boolean;
  errorMessage: string;
};

const initialState: initialState = {
  isLoading: false,
  errorMessage: "",
};

const pinNoteSlice = createSlice({
  name: "notes/pinNote",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(pinNote.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(pinNote.fulfilled, (state) => {
      state.isLoading = false;
    });
    builder.addCase(pinNote.rejected, (state, action: any) => {
      state.isLoading = false;
      state.errorMessage = action.payload.response?.data?.message;
    });
  },
});

export const {} = pinNoteSlice.actions;

export default pinNoteSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../untils/axiosIntance";
import { getNotes } from "./notes.thunk";

type Note = {
  title: string;
  content: string;
  tags: string[];
};
type Data = {
  id: string;
  note: Note;
};

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (data: Data, { rejectWithValue, dispatch }) => {
    try {
      const res = await axiosInstance.put(
        `/notes/edit-note/${data.id}`,
        data.note
      );
      dispatch(getNotes(""));
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

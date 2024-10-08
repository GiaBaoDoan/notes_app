import { createSlice } from "@reduxjs/toolkit";
import { userThunk } from "../thunk/user.thunk";
import { UserType } from "..";

type user = {
  currentUser: UserType | null;
  isLoading: boolean;
  error: string;
};
const initialState: user = {
  currentUser: null,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user/getUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(userThunk.fulfilled, (state, action) => {
      state.currentUser = action.payload;
      state.isLoading = false;
    });
    builder.addCase(userThunk.rejected, (state, action: any) => {
      state.isLoading = false;
      state.currentUser = null;
      state.error = action.payload.response?.data?.error;
    });
  },
});

export const {} = userSlice.actions;
export default userSlice.reducer;

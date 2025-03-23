import { createSlice } from "@reduxjs/toolkit";

const user = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => action.payload,
    removeUser: () => null,
  },
});

export const { addUser, removeUser } = user.actions;

export default user.reducer;

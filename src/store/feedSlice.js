import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeUserFeed: (state, action) => {
      const removedUser = state.filter((feed) => feed._id != action.payload);
      return removedUser;
    },
    removeFeed: (state, action) => null,
  },
});
export const { addFeed, removeUserFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;

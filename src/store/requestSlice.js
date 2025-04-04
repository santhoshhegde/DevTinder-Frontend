import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeReviewedRequest: (state, action) => {
      const removeRequestList = state.filter(
        (req) => req._id != action.payload
      );
      return removeRequestList;
    },
    removeRequest: () => {
      return null;
    },
  },
});

export const { addRequest, removeReviewedRequest, removeRequest } =
  requestSlice.actions;
export default requestSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import userSliceReduce from "./userSlice";

const store = configureStore({
  reducer: {
    user: userSliceReduce,
  },
});

export default store;

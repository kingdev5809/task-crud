import { configureStore } from "@reduxjs/toolkit";
import PostSlice from "./PostSlice/PostSlice";

const store = configureStore({
  reducer: {
    PostSlice: PostSlice,
  },
});

export default store;

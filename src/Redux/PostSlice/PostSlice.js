import { createSlice } from "@reduxjs/toolkit";
import {
  getAllPosts,
  getOnePost,
  getOneUser,
  getPostComments,
  getPostPhotos,
} from "../extraReducers";

const initialState = {
  loading: false,
  error: "",
  AllPosts: [],
  post: {},
  comments: [],
  photos: [],
  user: [],
};
const PostSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePost: (state, action) => {
      const { updatedBody } = action.payload;
      const postToUpdate = state.AllPosts.find(
        (post) => post.id === updatedBody.id
      );
      if (postToUpdate) {
        // Update the post with the updatedData
        Object.assign(postToUpdate, updatedBody);
      }
    },
    deletePost: (state, { payload }) => {
      const filteredPosts = state.AllPosts.filter(
        (post) => post.id !== payload
      );
      state.AllPosts = filteredPosts;
    },

    addPost: (state, { payload }) => {
      state.AllPosts = [payload, ...state.AllPosts];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllPosts.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.AllPosts = action.payload;
    });
    builder.addCase(getAllPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getPostComments.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPostComments.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getPostComments.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getPostPhotos.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPostPhotos.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getPostPhotos.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getOnePost.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOnePost.fulfilled, (state, action) => {
      state.loading = false;
      state.post = action.payload;
    });
    builder.addCase(getOnePost.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    builder.addCase(getOneUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getOneUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    builder.addCase(getOneUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export const { updatePost, deletePost, addPost, getUser } = PostSlice.actions;
export default PostSlice.reducer;

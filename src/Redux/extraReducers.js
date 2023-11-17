import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { GetAllPosts, GetOnePhoto, GetUser } from "./Api";

//Posts
export const getAllPosts = createAsyncThunk("get/allposts", async () => {
  return axios({
    method: "GET",
    url: GetAllPosts,
  }).then((res) => res.data);
});

//One Post
export const getOnePost = createAsyncThunk("get/onepost", async (id) => {
  return axios({
    method: "GET",
    url: GetAllPosts + "/" + id,
  }).then((res) => res.data);
});

//comment
export const getPostComments = createAsyncThunk("get/comments", async (id) => {
  return axios({
    method: "GET",
    url: GetAllPosts + "/" + id + "/" + "comments",
  }).then((res) => res.data);
});

//photos
export const getPostPhotos = createAsyncThunk("get/photos", async () => {
  return axios({
    method: "GET",
    url: GetOnePhoto,
  }).then((res) => res.data);
});

//user
export const getOneUser = createAsyncThunk("get/user", async (id) => {
  return axios({
    method: "GET",
    url: GetUser + "/" + id,
  }).then((res) => res.data);
});

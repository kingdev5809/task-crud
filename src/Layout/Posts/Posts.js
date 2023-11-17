import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../Redux/extraReducers";
import PostCard from "./Components/PostCard/PostCard";
import "./Posts.scss";
import UpdatePost from "./Components/UpdatePost/UpdatePost";

import { addPost, deletePost } from "../../Redux/PostSlice/PostSlice";
import AddPost from "./Components/AddPost/AddPost";
import Search from "./Components/Search/Search";
function Posts() {
  const dispatch = useDispatch();
  const { AllPosts, loading } = useSelector((state) => state.PostSlice);
  const [sortOrder, setSortOrder] = useState("asc");
  const [posts, setPosts] = useState([]);
  const [updatedBody, setUpdatedBody] = useState({
    body: null,
    title: null,
    author: null,
  });
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllPosts());
  }, []);

  useEffect(() => {
    setPosts(AllPosts);
  }, [AllPosts]);

  // delete posts
  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePost(id));
    }
  };

  const handleAddPost = (item) => {
    dispatch(addPost(item));
    setPosts([item, ...posts]);
    setAddPostModalVisible(false);
  };

  // search by id or name  posts
  const handleSearch = (item, type) => {
    if (type === "close") {
      setSearchVisible("");
      setPosts(AllPosts);
    }
    if (type === "id") {
      setSearchVisible("id");
    }
    if (type === "name") {
      setSearchVisible("name");
    }
    if (type === "search") {
      if (!item) {
        setPosts(AllPosts);
        return;
      }
      let filteredData;
      if (searchVisible == "id") {
        filteredData = AllPosts.filter((post) => post.id == item);
      } else {
        filteredData = AllPosts.filter((post) =>
          post.title.toLowerCase().includes(item.toLowerCase())
        );
      }
      setPosts(filteredData);
    }
  };
  const handleSortData = (order) => {
    let sortedData = [...AllPosts];
    if (order === "asc") {
      sortedData.sort((a, b) => a.id - b.id);
    } else if (order === "desc") {
      sortedData.sort((a, b) => b.id - a.id);
    }
    setPosts(sortedData);
  };

  const handleSortChange = (data) => {
    setSortOrder(data);
    handleSortData(data);
  };

  return (
    <div className="container">
      <div className="top ">
        <div className="flex">
          <h1 className="title">Posts</h1>
          <div className="add-post">
            <button onClick={() => setAddPostModalVisible(true)}>
              Add Post
            </button>
          </div>
        </div>
        <div className="flex filte-div">
          <Search handleSearch={handleSearch} searchVisible={searchVisible} />
          <div className="filterByOrder">
            <select
              name="order"
              id="order"
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
        </div>
      </div>
      <div className="posts">
        {posts?.map((item) => (
          <PostCard
            key={item.id}
            item={item}
            handleDelete={handleDelete}
            setUpdatedBody={setUpdatedBody}
            setUpdateModalVisible={setUpdateModalVisible}
          />
        ))}
      </div>

      {updateModalVisible ? (
        <UpdatePost
          setUpdatedBody={setUpdatedBody}
          updatedBody={updatedBody}
          setUpdateModalVisible={setUpdateModalVisible}
        />
      ) : (
        ""
      )}
      {addPostModalVisible ? (
        <AddPost
          setAddPostModalVisible={setAddPostModalVisible}
          handleAddPost={handleAddPost}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default Posts;

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetOnePhoto } from "../../Redux/Api";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  getOnePost,
  getOneUser,
  getPostComments,
} from "../../Redux/extraReducers";
import { addPost, deletePost } from "../../Redux/PostSlice/PostSlice";
import UpdatePost from "./Components/UpdatePost/UpdatePost";
import AddPost from "./Components/AddPost/AddPost";

const PostDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { post, comments, user } = useSelector((state) => state.PostSlice);
  const navigate = useNavigate();
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [addPostModalVisible, setAddPostModalVisible] = useState(false);
  const [updatedBody, setUpdatedBody] = useState({
    body: null,
    title: null,
    author: null,
  });
  console.log(comments);
  const [postImage, setPostImage] = useState("");
  const handleGetPostPhoto = async () => {
    await axios
      .get(`${GetOnePhoto}/${id}`)
      .then((res) => {
        setPostImage(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetPostPhoto();
    dispatch(getOnePost(id));
    dispatch(getPostComments(id));
  }, []);
  useEffect(() => {
    dispatch(getOneUser(post.userId));
  }, [post]);

  const handleDelete = () => {
    if (window.confirm("Are you sure?")) {
      dispatch(deletePost(id));
      navigate("/");
    }
  };

  const handleAddPost = (item) => {
    dispatch(addPost(item));
    setAddPostModalVisible(false);
  };

  const handleSetUpdatedPost = () => {
    setUpdatedBody(post);
    setUpdateModalVisible(true);
  };

  return (
    <>
      <div className="post-detail">
        <div className="content">
          <img src={postImage?.url} alt="" />

          <h2>{post?.title}</h2>
          <p>{post?.body}</p>
          <div className="buttons">
            <button onClick={() => setAddPostModalVisible(true)}>Create</button>
            <button onClick={() => handleSetUpdatedPost()}>Update</button>
            <button onClick={() => handleDelete()}>Delete</button>
          </div>
          <div className="author">
            <h1>Author</h1>
            <h3>Name: {user?.name}</h3>
            <h3>User Name: {user?.username}</h3>
            <h3>User Web site: {user?.website}</h3>
            <h2>Author Address</h2>
            <p>
              {user?.address?.city} city, {user?.address?.street} street,
              {user?.address?.suite} suite
            </p>
          </div>
        </div>
      </div>
      <div className="detail-comments">
        <h1>Comments</h1>
        {comments?.map((comment) => (
          <div className="comment__item comment__item--sub" key={comment.id}>
            <div className="flex">
              <img
                src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg"
                alt="avatar"
                className="comment__item__avatar"
              />
              <div className="flex-grow">
                <h3 className="comment__item__title">{user?.name}</h3>
                <h4 className="comment__item__subtitle">{comment.email}</h4>
              </div>
            </div>
            <p className="comment__item__content">{comment.body}</p>
          </div>
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
    </>
  );
};

export default PostDetail;

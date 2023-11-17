import React, { useEffect, useState } from "react";
import "./PostCard.scss";
import { BsTrash } from "react-icons/bs";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";

function PostCard({
  item,
  handleDelete,
  setUpdateModalVisible,
  setUpdatedBody,
}) {
  const [commentsVisible, setCommentsVisible] = useState(false);

  const handleSetUpdatedPost = (item) => {
    setUpdatedBody(item);
    setUpdateModalVisible(true);
  };

  return (
    <>
      <div className="post-card">
        <h1 className="post_title">{item.title}</h1>
        <p className="post_body">{item.body}</p>
        <div className="buttons">
          <Link to={`post/${item.id}`}>
            <button className="detail">
              <AiFillEye /> Detail
            </button>
          </Link>
          <div className="edit-delete">
            <p className="edit" onClick={() => handleSetUpdatedPost(item)}>
              <span>
                <AiFillEdit />
              </span>
              edit
            </p>
            <p className="delete" onClick={() => handleDelete(item.id)}>
              <span>
                <BsTrash />
              </span>
              delete
            </p>
          </div>
        </div>
        <h4 className="open-comments" onClick={() => setCommentsVisible(true)}>
          Open Comments
        </h4>
      </div>
      {commentsVisible ? (
        <Comments item={item} setCommentsVisible={setCommentsVisible} />
      ) : (
        ""
      )}
    </>
  );
}

export default PostCard;

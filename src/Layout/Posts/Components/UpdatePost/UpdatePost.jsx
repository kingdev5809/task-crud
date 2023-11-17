import React from "react";
import "./UpdatePost.scss";
import { useDispatch } from "react-redux";
import { updatePost } from "../../../../Redux/PostSlice/PostSlice";
function UpdatePost({ updatedBody, setUpdatedBody, setUpdateModalVisible }) {
  const dispatch = useDispatch();
  const handleUpdate = (updatedBody) => {
    dispatch(updatePost({ updatedBody }));
    setUpdatedBody();
    setUpdateModalVisible();
  };
  return (
    <>
      <div className="updatePost">
        <div className="updatePost_inner">
          <div
            className="close-modal"
            onClick={() => setUpdateModalVisible(null)}
          >
            x
          </div>
          <div className="submitBox">
            <div className="inputs">
              <div className="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={updatedBody.title}
                  onChange={(e) =>
                    setUpdatedBody({ ...updatedBody, title: e.target.value })
                  }
                />
                <label htmlFor="name" className="form__label">
                  Enter post title
                </label>
              </div>

              <div className="form__group field">
                <textarea
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  name="name"
                  id="name"
                  required
                  value={updatedBody.body}
                  rows={10}
                  onChange={(e) =>
                    setUpdatedBody({ ...updatedBody, body: e.target.value })
                  }
                />
                <label htmlFor="name" className="form__label">
                  Enter post content
                </label>
              </div>
            </div>
            <button
              className="button"
              onClick={() => handleUpdate(updatedBody)}
            >
              <span className="text">Submit</span>
            </button>
          </div>
        </div>
      </div>
      <div
        className="w-screen"
        onClick={() => setUpdateModalVisible(null)}
      ></div>
    </>
  );
}

export default UpdatePost;

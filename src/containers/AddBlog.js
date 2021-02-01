import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch, useSelector } from "react-redux";
import PublicNavBar from "../components/PublicNavBar";
import blogActions from "../redux/actions/blog.actions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router";

const AddBlog = () => {
  const [newBlog, setNewblog] = useState({
    title: "",
    content: "",
    images: [],
  });

  const { action, blogId } = useParams();
  console.log("action blog id", action + blogId);
  const dispatch = useDispatch();

  useEffect(() => {}, [newBlog, blogId]);
  console.log("new blog", newBlog);

  const handleClickPicture = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_CLOUDINARY_PRESET,
      },
      function (error, result) {
        if (result && result.length) {
          setNewblog({
            ...newBlog,
            images: result.map((res) => res.secure_url),
          });
        }
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (action === "edit") {
      dispatch(blogActions.updateBlog(blogId, newBlog));
    } else {
      console.log("newBlog ne", newBlog);
      dispatch(blogActions.createBlog(newBlog));
    }
  };
  return (
    <div>
      <PublicNavBar />
      <Container className="col-sm-6 pt-5">
        <form>
          <div className="form-outline mb-4">
            <input
              type="text"
              id="form4Example1"
              className="form-control"
              placeholder="Title"
              onChange={(e) =>
                setNewblog({
                  ...newBlog,
                  title: e.target.value,
                })
              }
            />
          </div>

          <div className="form-outline mb-4">
            <textarea
              className="form-control"
              id="form4Example3"
              rows="4"
              placeholder="What's on your mind"
              onChange={(e) =>
                setNewblog({
                  ...newBlog,
                  content: e.target.value,
                })
              }
            ></textarea>
          </div>

          <button
            type="button"
            class="btn btn-primary mb-4"
            onClick={handleClickPicture}
          >
            Add Picture
          </button>

          <div className="d-flex btn-group">
            <button
              type="submit"
              className="btn btn-success  btn-xs mb-4 col-sm-6 mr-3"
              onClick={handleSubmit}
            >
              Post
            </button>
            <button
              type="submit"
              className="btn btn-secondary mb-4 col-sm-6 ml-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-danger mb-4 col-sm-6 ml-3"
              onClick={(e) => {
                e.preventDefault();
                dispatch(blogActions.deleteBlog(blogId));
                window.location.replace("http://localhost:3000/");
                toast.configure();
                toast.warning("😿 You just delete your blog!", {
                  position: "top-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }}
            >
              Delete
            </button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default AddBlog;

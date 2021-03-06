import * as types from "../constants/blog.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getBlogs = (pageNum, limit, field_name) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST });
  try {
    let query = "";
    if (field_name) {
      query = `&title[$regex]=${field_name}&title[$options]=i`;
    }
    const url = `/blogs?page=${pageNum}&limit=${limit}${query}&sortBy[createdAt]=1`;
    const res = await api.get(url);
    console.log(" success", res.data.success);
    if (res.data.success === true) {
      console.log("data", res.data.data.totalPages);
      dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
    }
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: error });
  }
};

const getSingleBlog = (id) => async (dispatch) => {
  dispatch({ type: types.GET_SINGLE_BLOGS_REQUEST });
  try {
    const res = await api.get(`/blogs/${id}`);
    console.log("single data", res);
    dispatch({ type: types.GET_SINGLE_BLOGS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_SINGLE_BLOGS_FAILURE, payload: error });
  }
};

const createReview = (blogId, review) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST });
  console.log("blog id");
  try {
    const res = await api.post(`/reviews/blogs/${blogId}`, {
      content: review,
    });
    console.log("create blog", res.data.data);
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: error });
  }
};

const createBlog = (newBlog) => async (dispatch) => {
  dispatch({ type: types.CREATE_BLOG_REQUEST, payload: null });

  try {
    const res = await api.post("/blogs", newBlog);
    dispatch({
      type: types.CREATE_BLOG_SUCCESS,
      payload: res.data.data,
    });
    toast.configure();
    await toast.success("🦄 Woohoo, New Blog Has Been Created!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //go back to home temorarily
    window.location.replace("http://localhost:3000/");
  } catch (error) {
    dispatch({ type: types.CREATE_BLOG_FAILURE, payload: error });
  }
};

const sendReact = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.REACTION_REQUEST });
  try {
    const response = await api.post(`/reactions`, {
      targetType,
      targetId,
      emoji,
    });

    if (targetType === "Blog") {
      if (response.data.success === true) {
        dispatch({ type: types.REACTION_SUCCESS, payload: response.data.data });
      }
    }
    if (targetType === "Review") {
      console.log("reviewingg reaction");
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: response.data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    dispatch({ type: types.REACTION_FAILURE, payload: error.message });
  }
};

const updateBlog = (blogId, newBlog) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    const res = await api.put(`/blogs/${blogId}`, newBlog);
    console.log("new blog", newBlog);

    dispatch({
      type: types.UPDATE_BLOG_SUCCESS,
      payload: res.data.data,
      
    });
    toast.configure();
    await toast.success("🦄 Woohoo, Your Blog Has Been Updated!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    window.location.replace("http://localhost:3000/");

  } catch (error) {
    dispatch({ type: types.UPDATE_BLOG_FAILURE, payload: error });
  }
};
const deleteBlog = (blogId) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST });
  try {
    console.log("blogid", blogId);
    const res = await api.delete(`/blogs/${blogId}`);
    console.log("delete", res);
    dispatch({
      type: types.DELETE_BLOG_SUCCESS,
    });
  } catch (error) {
    dispatch({ type: types.DELETE_BLOG_FAILURE });
  }
};

const blogActions = {
  getBlogs,
  getSingleBlog,
  createReview,
  createBlog,
  sendReact,
  updateBlog,
  deleteBlog,
};

export default blogActions;

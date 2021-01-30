import * as types from "../constants/blog.constants";
import api from "../../apiService";

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
const blogActions = {
  getBlogs,
  getSingleBlog,
};

export default blogActions;

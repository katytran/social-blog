import * as types from "../constants/blog.constants";

const initialState = {
  // all blogs
  blogPosts: [],
  loading: true,
  totalPages: null,

  //single blog
  selectedBlog: null,
  loadingSelectedBlog: true,
  loadingSubmitReview: true,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    // get Blogs
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true };
    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogPosts: payload.blogs,
        totalPages: payload.totalPages,
        loading: false,
      };
    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false };

    // single blog
    case types.GET_SINGLE_BLOGS_REQUEST:
      return { ...state, loadingSelectedBlog: true };
    case types.GET_SINGLE_BLOGS_SUCCESS:
      return { ...state, loadingSelectedBlog: false, selectedBlog: payload };
    case types.GET_SINGLE_BLOGS_FAILURE:
      return { ...state, loadingSelectedBlog: false };

    // create reviews
    case types.CREATE_REVIEW_REQUEST:
      return { ...state, loadingSubmitReview: true };
    case types.CREATE_REVIEW_SUCCESS:
      return {
        ...state,
        loadingSubmitReview: false,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [...state.selectedBlog.reviews, payload],
        },
      };
    case types.CREATE_REVIEW_FAILURE:
      return { ...state, loadingSubmitReview: false };
    default:
      return state;
  }
};

export default blogReducer;

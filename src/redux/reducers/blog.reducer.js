import * as types from "../constants/blog.constants";

const initialState = {
  // all blogs
  blogPosts: [],
  loading: true,
  totalPages: null,

  //single blog
  selectedBlog: null,
  loadingSelectedBlog: true,
  loadingSubmitReview: false,
  loadingSubmitReaction: true,
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

    case types.REACTION_REQUEST:
      return { ...state, loadingSubmitReaction: true };

    case types.REACTION_SUCCESS:
      return {
        ...state,
        selectedBlog: { ...state.selectedBlog, reactions: payload },
        loadingSubmitReaction: false,
      };
    case types.REVIEW_REACTION_SUCCESS:
      console.log("hehe", payload.reviewId);
      return {
        ...state,
        selectedBlog: {
          ...state.selectedBlog,
          reviews: [
            ...state.selectedBlog.reviews.map((review) => {
              if (review._id !== payload.reviewId) return review;
              return { ...review, reactions: payload.reactions };
            }),
          ],
        },
        loadingSubmitReaction: false,
      };

    case types.UPDATE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        selectedBlog: payload,
        loading: false,
      };
    case types.UPDATE_BLOG_FAILURE:
      return { ...state, loading: false };
    case types.REACTION_FAILURE:
      return { ...state, loadingSelectedBlog: false };
    //delete blog:
    case types.DELETE_BLOG_REQUEST:
      return { ...state, loading: true };
    case types.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false,
        selectedBlog: {},
      };
    case types.DELETE_BLOG_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export default blogReducer;

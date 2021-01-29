import * as types from "../constants/blog.constants";

const initialState = {
  blogPosts : [],
  loading : true,
  selectedPost : null,
};

const blogReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case types.GET_POSTS_REQUEST:
      return {...state, loading : true};
    case types.GET_POSTS_SUCCESS:
      return {...state, blogPosts: payload, loading : false };
    case types.GET_POSTS_FAILURE:
      return {...state, loading : false};
    default:
      return state;
  }
  
};

export default blogReducer;

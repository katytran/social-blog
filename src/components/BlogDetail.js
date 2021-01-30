import React from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";

function BlogDetail({ id }) {
  const blogDetail = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loadingSelectedBlog);

  return <div>{id}</div>;
}

export default BlogDetail;

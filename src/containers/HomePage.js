import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import blogActions from "../redux/actions/blog.actions";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [field_name, setField_name] = useState("");
  const blogs = useSelector((state) => state.blog.blogPosts);
  const loading = useSelector((state) => state.blog.loading);
  const limit = 10;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(blogActions.getPosts(pageNum, limit, field_name) );
  },[
    dispatch,
    pageNum,
    limit,
    field_name,
  ]);
  const handleClickBlogCard = (id) => {
    history.push(`/blogs/${id}`)
  }
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <Container>
          {blogs.map((blog) => (
            <BlogCard blog={blog} key={blog._id} handleClickBlogCard={handleClickBlogCard} />
          ))}

          </Container>
          
        </div>
      )}
    </div>
  );
};

export default HomePage;

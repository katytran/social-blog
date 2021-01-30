import React, { useState, useEffect } from "react";
import { CardDeck } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import BlogCard from "../components/BlogCard";
import blogActions from "../redux/actions/blog.actions";
import PaginationBar from "../components/PaginationBar";
import Grid from "@material-ui/core/Grid";
const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [field_name, setField_name] = useState("");
  const blogs = useSelector((state) => state.blog.blogPosts);
  const loading = useSelector((state) => state.blog.loading);
  const totalPages = useSelector((state) => state.blog.totalPages);
  const limit = 10;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum, limit, field_name));
  }, [dispatch, pageNum, limit, field_name]);

  const handleClickBlogCard = (id) => {
    history.push(`/blogs/${id}`);
  };

  return (
    <div>
      {loading || blogs === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
          />
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
              item
              lg={9}
              spacing={4}
            >
              {blogs.map((blog) => (
                <BlogCard
                  blog={blog}
                  key={blog._id}
                  handleClickBlogCard={handleClickBlogCard}
                />
              ))}
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

export default HomePage;

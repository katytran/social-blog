import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { Carousel, Jumbotron, Button } from "react-bootstrap";
import img1 from "../images/img1.png";
import img2 from "../images/img2.png";
import img3 from "../images/img3.png";
import BlogCard from "../components/BlogCard";
import blogActions from "../redux/actions/blog.actions";
import PaginationBar from "../components/PaginationBar";
import Grid from "@material-ui/core/Grid";
import ClipLoader from "react-spinners/ClipLoader";

const HomePage = () => {
  const [pageNum, setPageNum] = useState(1);
  const [field_name, setField_name] = useState("");
  const blogs = useSelector((state) => state.blog.blogPosts);
  const loading = useSelector((state) => state.blog.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
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
  const carousel = (
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          style={{ height: "30em" }}
          className="d-block w-100"
          src={img1}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item interval={500}>
        <img
          style={{ height: "30em" }}
          className="d-block w-100"
          src={img2}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ height: "30em" }}
          className="d-block w-100"
          src={img3}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
  const jumbotron = (
    <Jumbotron className="jumbotron">
      <h1>Travel Blog</h1>
      <p>Share your amazing experience!!!</p>
      <p>
        <Link to="/blogs/add">
          <Button variant="primary">Write now</Button>
        </Link>
      </p>
    </Jumbotron>
  );

  return (
    <div>
      {loading || blogs === undefined ? (
        <ClipLoader color="blue" loading={loading} size={150} />
      ) : (
        <div>
          {!isAuthenticated? carousel: jumbotron}
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

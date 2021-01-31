import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../../../redux/actions/blog.actions";
import authActions from "../../../redux/actions/auth.actions";
import ClipLoader from "react-spinners/ClipLoader";
import PaginationBar from "../../../components/PaginationBar";
import { Container, Table, Row, Col, FormCheck } from "react-bootstrap";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Search from "../../../components/Search";

const BlogTablePage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [pageNum, setPageNum] = useState(1);
  const [field_name, setField_name] = useState("");
  const [myBlogOnly, setMyBlogOnly] = useState(false);
  const blogs = useSelector((state) => state.blog.blogPosts);
  const loading = useSelector((state) => state.blog.loading);
  const totalPages = useSelector((state) => state.blog.totalPages);
  const currentUser = useSelector((state) => state.auth.user);
  const limit = 10;
  const dispatch = useDispatch();
  console.log("currentUser", currentUser._id);

  useEffect(() => {
    dispatch(authActions.getCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum, limit, field_name, myBlogOnly));
  }, [dispatch, pageNum, limit, field_name,myBlogOnly]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if(searchInput !== "") {
        setField_name(searchInput);
    } else {
        setField_name("")
    }
    
  };
  const handleCheckMyBlogOnly = () => {
    if (myBlogOnly) {
      setMyBlogOnly(false);
    } else {
      setMyBlogOnly(currentUser._id);
    }
  };
  return (
    <div>
      {loading ? (
        <ClipLoader color="blue" loading={loading} size={150} />
      ) : (
        <div>
          <h1>Blog Manage</h1>
          <Container>
            <Row>
              <Col md={4}>
                <Search
                  searchInput={searchInput}
                  handleSearchChange={handleSearchChange}
                  handleSearchSubmit={handleSearchSubmit}
                />
                ;
              </Col>
              <Col
                md={4}
                className="d-flex justify-content-end align-items-start"
              >
                <FormCheck
                  type="checkbox"
                  label="My Blogs only"
                  checked={myBlogOnly}
                  onChange={handleCheckMyBlogOnly}
                />
              </Col>
              <Col
                md={4}
                className="d-flex justify-content-end align-items-start"
              >
                <Link className="btn btn-primary" to="/blogs/add">
                  Add
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Table striped bordered hover>
                  <thead>
                    <tr >
                      <th>Title</th>
                      <th>Author</th>
                      <th>Review Count</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr key = {blog._id}>
                        <td>
                          <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
                        </td>
                        <td>{blog.author.name}</td>
                        <td>{blog.reviewCount}</td>
                        <td>{<Moment fromNow>{blog.createdAt}</Moment>}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>

          <PaginationBar
            pageNum={pageNum}
            setPageNum={setPageNum}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default BlogTablePage;

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../../../redux/actions/blog.actions";
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
  const blogs = useSelector((state) => state.blog.blogPosts);
  const loading = useSelector((state) => state.blog.loading);
  const totalPages = useSelector((state) => state.blog.totalPages);
  const limit = 10;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogActions.getBlogs(pageNum, limit, field_name));
  }, [dispatch, pageNum, limit, field_name]);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setField_name(searchInput);
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
                  //   checked={myBlogOnly}
                  //   onChange={handleCheckMyBlogOnly}
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
                    <tr>
                      <th>Title</th>
                      <th>Author</th>
                      <th>Review Count</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {blogs.map((blog) => (
                      <tr>
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

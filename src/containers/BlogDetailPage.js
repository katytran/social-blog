import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { useParams } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import ReviewBlog from "../components/ReviewBlog";
import authActions from "../redux/actions/auth.actions";
import { makeStyles } from "@material-ui/core/styles";
import Reviews from "../components/Reviews";
import ReviewReactions from "../components/ReviewReactions";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const useStyles = makeStyles((theme) => ({
  root: {
    alignItems: "center",
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function BlogDetailPage() {
  const classes = useStyles();
  const { blogId } = useParams();
  const blogDetail = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loadingSelectedBlog);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [review, setReview] = useState("");
  const loadingSubmit = useSelector((state) => state.blog.loadingSubmitReview);
  const currentUserId = useSelector((state) => state.auth.user._id);

  // console.log("Loading submit review", loadingSubmit);
  // console.log("current user", currentUserId);
  // console.log("blog", blogAuthorId);

  useEffect(() => {
    dispatch(blogActions.getSingleBlog(blogId));
    dispatch(authActions.getCurrentUser());
  }, [dispatch, blogId]);

  const handleInputChange = (e) => {
    setReview(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(blogActions.createReview(blogId, review));
    setReview("");
  };

  console.log("blog detail", blogDetail);

  if (!(loading || blogDetail === undefined)) {
    const reactions = blogDetail.reactions;
    const id = blogDetail._id;
    const blogAuthorId = blogDetail.author._id;

    return (
      <div>
        {currentUserId === blogAuthorId ? (
          <Link to={`/blogs/edit/${id}`}>
            {" "}
            <button
              type="button"
              class="btn btn-info mt-2"
              style={{ marginLeft: "90%" }}
            >
              Edit
            </button>
          </Link>
        ) : (
          <></>
        )}
        <div id="wrapper">
          <div id="leftmenu">
            <img
              src={
                blogDetail.images.length
                  ? blogDetail.images[0]
                  : "https://image.freepik.com/free-vector/travel-booklet-active-girls-cartoon-flat-ideas-varied-summer_81522-3183.jpg"
              }
              height="100%"
              width="100%"
            />
          </div>
          <div id="maincontent" className="mt-2">
            <div>
              <div>
                <div>
                  <div className={classes.root}>
                    <Avatar
                      aria-label="avatar"
                      src={blogDetail.author.avatarUrl}
                      className="ml-5"
                      margin="0px"
                    ></Avatar>
                    <div
                      className="ml-2"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                    >
                      {blogDetail.author.name}
                    </div>
                  </div>

                  <div className="card-title">
                    {blogDetail.title}
                    <p className="card-text">{blogDetail.content}</p>
                    {<Moment fromNow>{blogDetail.createdAt}</Moment>}
                  </div>
                </div>
              </div>

              <div>
                <ReviewReactions
                  targetType="Blog"
                  id={id}
                  reactions={reactions}
                />
              </div>

              <div>
                <Reviews targetType="Blog" reviews={blogDetail.reviews} />
              </div>
              <div>
                {isAuthenticated && (
                  <ReviewBlog
                    review={review}
                    handleInputChange={handleInputChange}
                    handleSubmitReview={handleSubmitReview}
                    loading={loadingSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <ClipLoader color="blue" loading={loading} size={150} />
    </div>
  );
}

export default BlogDetailPage;

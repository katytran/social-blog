import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { useParams } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import IconButton from "@material-ui/core/IconButton";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import FavoriteIcon from "@material-ui/icons/Favorite";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import MoodBadIcon from "@material-ui/icons/MoodBad";
import SvgIcon from "@material-ui/core/SvgIcon";
import api from "../apiService";
import ReviewBlog from "../components/ReviewBlog";

function BlogDetailPage() {
  const { blogId } = useParams();
  const blogDetail = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loadingSelectedBlog);
  const dispatch = useDispatch();
  // get uselector
  const isAuthenticated = true;
  const [review, setReview] = useState("");
  // useselector
  const loadingSubmit = false;

  useEffect(() => {
    dispatch(blogActions.getSingleBlog(blogId));
  }, [dispatch, blogId]);

  const updateNumReact = async () => {
    // const res = await api.post(`/reactions`);
    // console.log("res", res);
  };

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
    return (
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
        <div id="maincontent" className="mt-5">
          <div>
            <div className="d-flex justify-content-center align-items-center">
              <Avatar
                width="50%"
                aria-label="avatar"
                src={blogDetail.author.avatarUrl}
              ></Avatar>
              <Typography component="h5" variant="h5" className="ml-3">
                {blogDetail.author.name}
              </Typography>
              <Typography component="h5" variant="h6" className="ml-3">
                {<Moment fromNow>{blogDetail.createdAt}</Moment>}
              </Typography>
            </div>

            <Typography variant="subtitle1" color="textSecondary">
              {blogDetail.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {blogDetail.content}
            </Typography>

            <div>
              <IconButton aria-label="like" onClick={updateNumReact}>
                <ThumbUpIcon color="primary" />
              </IconButton>
              {reactions.like}
              <IconButton aria-label="love">
                <FavoriteIcon color="secondary" />
              </IconButton>{" "}
              {reactions.love}
              <IconButton aria-label="laugh">
                <EmojiEmotionsIcon
                  style={{ color: "#ffea00", backgroundColor: "black" }}
                />
              </IconButton>{" "}
              {reactions.laugh}
              <IconButton aria-label="sad">
                <MoodBadIcon style={{ color: "#8561c5" }} />
              </IconButton>{" "}
              {reactions.sad}
              <IconButton aria-label="angry">
                <SvgIcon style={{ color: "#e91e63" }}>
                  <path
                    fill="currentColor"
                    d="M22 14H21C21 10.13 17.87 7 14 7H13V5.73C13.6 5.39 14 4.74 14 4C14 2.9 13.11 2 12 2S10 2.9 10 4C10 4.74 10.4 5.39 11 5.73V7H10C6.13 7 3 10.13 3 14H2C1.45 14 1 14.45 1 15V18C1 18.55 1.45 19 2 19H3V20C3 21.11 3.9 22 5 22H19C20.11 22 21 21.11 21 20V19H22C22.55 19 23 18.55 23 18V15C23 14.45 22.55 14 22 14M7.5 18C6.12 18 5 16.88 5 15.5C5 14.68 5.4 13.96 6 13.5L9.83 16.38C9.5 17.32 8.57 18 7.5 18M16.5 18C15.43 18 14.5 17.32 14.17 16.38L18 13.5C18.6 13.96 19 14.68 19 15.5C19 16.88 17.88 18 16.5 18Z"
                  />
                </SvgIcon>{" "}
              </IconButton>{" "}
              {reactions.angry}
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
    );
  }
  return <div>hellloo</div>;
}

export default BlogDetailPage;

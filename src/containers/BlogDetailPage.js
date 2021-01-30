import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogActions from "../redux/actions/blog.actions";
import { useParams } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Moment from "react-moment";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import SkipNextIcon from "@material-ui/icons/SkipNext";
import { makeStyles, useTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  cover: {
    width: 151,
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function BlogDetailPage() {
  const classes = useStyles();
  const theme = useTheme();
  const { blogId } = useParams();
  const blogDetail = useSelector((state) => state.blog.selectedBlog);
  const loading = useSelector((state) => state.blog.loadingSelectedBlog);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(blogActions.getSingleBlog(blogId));
  }, [dispatch]);

  // if (!loading && blogDetail.images !== null) {
  return (
    <Card>
      <div>
        <CardContent>
          <Typography component="h5" variant="h5">
            Live From Space
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
        <div>
          <IconButton aria-label="previous">
            {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === "rtl" ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
        </div>
      </div>
      <CardMedia
      //   image={
      //     blogDetail.images.length && blogDetail.images !== null
      //       ? blogDetail.images[0]
      //       : "https://image.freepik.com/free-vector/travel-booklet-active-girls-cartoon-flat-ideas-varied-summer_81522-3183.jpg"
      //   }
      //   title="Live from space album cover"
      />
      <img src="https://image.freepik.com/free-vector/travel-booklet-active-girls-cartoon-flat-ideas-varied-summer_81522-3183.jpg"></img>
    </Card>
  );
  // }
  // return <div>hellloo</div>;
}

export default BlogDetailPage;

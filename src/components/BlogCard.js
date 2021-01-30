import React from "react";
//import { Card } from "react-bootstrap";
import Moment from "react-moment";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

const BlogCard = ({ blog, handleClickBlogCard }) => {
  const classes = useStyles();

  return (
    <Grid item xl={12}>
      <Card
        className={classes.root}
        style={{ width: "18rem", height: "100%" }}
        onClick={() => handleClickBlogCard(blog._id)}
      >
        <CardHeader
          avatar={
            <Avatar
              aria-label="avatar"
              className={classes.avatar}
              src={blog.author.avatarUrl}
            ></Avatar>
          }
          title={blog.author.name}
        />
        <CardMedia
          className={classes.media}
          image={
            blog.images.length && blog.images !== null
              ? blog.images[0]
              : "https://image.freepik.com/free-vector/travel-booklet-active-girls-cartoon-flat-ideas-varied-summer_81522-3183.jpg"
          }
          title={blog.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {blog.content.length <= 100
              ? blog.content
              : blog.content.slice(0, 100) + "..."}
            <br /> {<Moment fromNow>{blog.createdAt}</Moment>}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default BlogCard;

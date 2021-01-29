import React from "react";
import {Card} from "react-bootstrap";
import Moment from 'react-moment';

const BlogCard = ({ blog, handleClickBlogCard }) => {
  return (
    <div>
      <Card style={{ width: "18rem" }} onClick = {()=> handleClickBlogCard(blog._id)}>
        <Card.Img variant="top" src={blog.images.length? blog.images[0] : "https://image.freepik.com/free-vector/travel-booklet-active-girls-cartoon-flat-ideas-varied-summer_81522-3183.jpg" } />
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
            {blog.content.length <= 100 ? blog.content : blog.content.slice(0,100)+"..."}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">
          <span>@{blog.author.name}</span> <br>
          <span><Moment fromNow>{blog.createdAt}</Moment></span> </br>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default BlogCard;

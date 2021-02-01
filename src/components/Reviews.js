import React from "react";
import Moment from "react-moment";
import ReviewReactions from "./ReviewReactions";

function Reviews({ reviews }) {
  console.log(reviews);
  const reviewsList = reviews.map((review) => (
    <div class="card">
      <div class="card-header"></div>
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>{review.content}</p>
          <footer class="blockquote-footer">
            Created by {review.user.name}{" "}
            <div>
              {" "}
              from
              <cite title="Source Title">
                {" "}
                {<Moment fromNow>{review.createdAt}</Moment>}
              </cite>
            </div>
          </footer>
        </blockquote>
        <div>
          <ReviewReactions
            targetType="Review"
            id={review._id}
            reactions={review.reactions}
          />
        </div>
      </div>
    </div>
  ));

  return <div>{reviewsList ? reviewsList : null}</div>;
}

export default Reviews;

import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ReviewBlog({
  review,
  handleInputChange,
  handleSubmitReview,
  loading,
}) {
  return (
    <div>
      <Form onSubmit={handleSubmitReview}>
        <Form.Group as={Row}>
          <Form.Label htmlFor="review" column sm="2" className="ml-2">
            Review:
          </Form.Label>
          <Col sm="7">
            <Form.Control
              id="review"
              type="text"
              value={review}
              onChange={handleInputChange}
            />
          </Col>
          {loading ? (
            <Button variant="primary" type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting ..
            </Button>
          ) : (
            <Button type="submit" disabled={!review}>
              Submit
            </Button>
          )}
        </Form.Group>
      </Form>
    </div>
  );
}

export default ReviewBlog;

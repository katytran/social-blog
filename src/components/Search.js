import React from "react";
import { Form , Col,Button} from "react-bootstrap";

const Search = ({ searchInput, handleSearchChange, handleSearchSubmit }) => {
  return (
    <div>
      <Form onSubmit={handleSearchSubmit}>
        <Form.Row>
          <Col>
            <Form.Control
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={handleSearchChange}
            />
          </Col>
          <Col>
            <Button variant="primary" type="submit">
              Search
            </Button>
          </Col>
        </Form.Row>
      </Form>
    </div>
  );
};

export default Search;

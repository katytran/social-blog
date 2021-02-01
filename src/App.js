import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import HomePage from "./containers/HomePage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import AdminPage from "./containers/Admin/AdminPage";
import BlogDetailPage from "./containers/BlogDetailPage";
import AddBlog from "./containers/AddBlog";
import { BrowserRouter as Router } from "react-router-dom";
import PublicNavBar from "./components/PublicNavBar";
import { Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Router>
        {/* <Row>
          <Col xs={12} className="">
            <PublicNavBar />
          </Col>
        </Row> */}

        <Switch>
          <Route path="/admin" component={AdminPage} />
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route exact path="/blogs/:action/:blogId" component={AddBlog} />
          <Route path="/blogs/add" component={AddBlog} />
          <Route exact path="/blogs/:blogId" component={BlogDetailPage} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;

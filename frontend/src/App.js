import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//All components
import Navbar from "./components/Navbar.component";
import CreatePost from "./components/CreatePosts.component";
import EditPost from "./component/EditPost.component";
import PostsList from "./components/PostsList.component";

const App = () => (
    <div className="container">
        <Navbar />
        <br />
        <Router>
            <Route path="/" exact component={PostsList}></Route>
            <Route path="/posts/add" component={CreatePost}></Route>
            <Route path="/posts/edit/:id" component={EditPost}></Route>
        </Router>
    </div>
);

export default App;

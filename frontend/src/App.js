import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import all components
import Navbar from "./components/Navbar.component";
import Post from "./components/Post.component";
import CreatePost from "./components/CreatePosts.component";
import EditPost from "./components/EditPost.component";
import PostsList from "./components/PostsList.component";

const App = () => (
    <div className="container">
        <Router>
            <Navbar />
            <br />
            <Route path="/" exact component={PostsList}></Route>
            <Route path="/posts/edit/:id" component={EditPost}></Route>
            <Route path="/posts/show/:id" component={Post}></Route>
            <Route path="/posts/create/" component={CreatePost}></Route>
        </Router>
    </div>
);

export default App;

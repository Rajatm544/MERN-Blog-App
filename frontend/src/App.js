import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//All components
import Navbar from "./components/Navbar.component";
import Post from "./components/Post.component";
import CreatePost from "./components/CreatePosts.component";
import EditPost from "./components/EditPost.component";
import PostsList from "./components/PostsList.component";

const App = () => (
    <div className="container">
        <Router>
            <Navbar />
            <Route path="/" exact component={PostsList}></Route>
            <Route path="/posts/edit/:id" component={EditPost}></Route>
            <Route path="/posts/:id" exact component={Post}></Route>
            <Route path="/create" component={CreatePost}></Route>
        </Router>
    </div>
);

export default App;

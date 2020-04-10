import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

//Import style
import "./stylesheets/index.css";

//Import all components
import Navbar from "./components/Navbar.component";
import Landing from "./components/Landing.component";
import Post from "./components/Post.component";
import CreatePost from "./components/CreatePosts.component";
import EditPost from "./components/EditPost.component";
import PostsList from "./components/PostsList.component";
import Login from "./components/Login.component";
import About from "./components/About.component";
import Footer from "./components/Footer.component";

const App = () => (
    <div className="container">
        <Router>
            <Navbar />
            <Route path="/" exact component={Landing}></Route>
            <Route path="/posts" exact component={PostsList}></Route>
            <Route path="/posts/edit/:id" component={EditPost}></Route>
            <Route path="/posts/show/:id" component={Post}></Route>
            <Route path="/posts/create/" component={CreatePost}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/about" exact component={About}></Route>
            <Footer />
        </Router>
    </div>
);

export default App;

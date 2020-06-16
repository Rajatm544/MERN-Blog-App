import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

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
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/posts" exact component={PostsList} />
                <Route path="/posts/new/" exact component={CreatePost} />
                <Route path="/posts/:id" exact component={Post} />
                <Route path="/posts/edit/:id" exact component={EditPost} />
                <Route path="/login" component={Login} />
                <Route path="/about" component={About} />
            </Switch>
            <Footer />
        </Router>
    </div>
);

export default App;

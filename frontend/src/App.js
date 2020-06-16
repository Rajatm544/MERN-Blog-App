import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//Import style
import "./stylesheets/index.css";

//Import all components
import Navbar from "./components/Navbar";
import Landing from "./components/Landing";
import Post from "./components/Post";
import CreatePost from "./components/CreatePosts";
import EditPost from "./components/EditPost";
import PostsList from "./components/PostsList";
import Login from "./components/Login";
import About from "./components/About";
import Footer from "./components/Footer";

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

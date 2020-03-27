import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light bg-light navbar-expand-lg">
                <Link to="/" className="navbar-brand">
                    Blog.It
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarTogglerDemo01"
                    aria-controls="navbarTogglerDemo01"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarTogglerDemo01"
                >
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="navbar-item">
                            <Link to="/posts" className="nav-link">
                                Posts
                            </Link>
                        </li>
                        {/* <li className="navbar-item">
                            <Link to="/register" className="nav-link">
                                Register
                            </Link>
                        </li>
                        <li className="navbar-item">
                            <Link to="/login" className="nav-link">
                                Login
                            </Link>
                        </li> */}
                        <li className="navbar-item">
                            <Link to="/posts/create" className="nav-link">
                                New Post
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

export default Navbar;

import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
    <div className="container">
        <h1>
            <center>LANDING PAGE</center>
        </h1>
        <h4>Build a Blog from scratch</h4>
        <p>
            Create a (minimal) full-stack Blog app with user authentication via
            passport and JWTs
        </p>
        <br />
        <Link to="/register" className="btn btn-primary">
            Register
        </Link>{" "}
        <Link to="/login" className="btn btn-secondary">
            Log In
        </Link>
    </div>
);

export default Landing;

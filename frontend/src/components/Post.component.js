import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Post = props => {
    if (props.post) {
        return (
            <div className="card">
                <div className="card-body">
                    <h1>{props.post.title}</h1>
                    <h4>{props.post.author}</h4>
                    <p> {props.post.body.substring(0, 100) + "..."}</p>
                    <time>{props.post.date}</time>
                    <br />
                    <Link to={"/posts/show/" + props.post._id}>Read More</Link>
                </div>
            </div>
        );
    } else {
        return (
            <div>
                {axios
                    .get("http://localhost:5000/posts/" + props.match.params.id)
                    .then(response => (
                        <h1>{response.data.title}</h1>
                    ))}
            </div>
        );
    }
};

export default Post;

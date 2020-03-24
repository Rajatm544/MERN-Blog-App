import React, { Component } from "react";
import axios from "axios";
import Post from "./Post.component";

class PostsList extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/posts/")
            .then(response => {
                this.setState({ posts: response.data });
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <div>
                <h2>Top 5 Blogs:</h2>

                {this.state.posts
                    .reverse()
                    .slice(0, 5)
                    .map(currentPost => (
                        <Post
                            post={currentPost}
                            key={currentPost._id}
                            from="home"
                        />
                    ))}
            </div>
        );
    }
}

export default PostsList;

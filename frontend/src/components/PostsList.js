import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";

const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

class PostsList extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            // Set the no of posts to be rendered to 5
            noOfPosts: 5,
        };
    }

    componentDidMount() {
        axios
            .get(`${baseURL}/server/posts/`)
            .then((response) => {
                // The order of posts is reversed to display the posts in reverse chronological order
                this.setState({ posts: response.data.reverse() });
            })
            .catch((err) => console.error(err));
    }

    render() {
        return (
            <div className="posts-list">
                <h1 id="title">
                    Latest Posts<span className="full-stop">.</span>
                </h1>
                {/* Display the posts in reverse chronological order */}
                {this.state.posts
                    .slice(0, this.state.noOfPosts)
                    .map((currentPost) => (
                        <Post post={currentPost} key={currentPost._id} />
                    ))}

                {/* To load more posts */}
                {this.state.posts[this.state.noOfPosts] ? (
                    <button
                        className="btn btn-link"
                        onClick={() =>
                            // When the button is clicked change the state to reflect the change in the no of posts beoing rendered, which triggers a compnent
                            this.setState({
                                noOfPosts: this.state.noOfPosts + 3,
                            })
                        }
                    >
                        Load More Posts...
                    </button>
                ) : (
                    <p> </p>
                )}
            </div>
        );
    }
}

export default PostsList;

import React, { Component } from "react";
import axios from "axios";
import Post from "./Post.component";

class PostsList extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            n: 5
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
                {this.state.posts
                    .reverse()
                    .slice(0, this.state.n)
                    .map(currentPost => (
                        <Post post={currentPost} key={currentPost._id} />
                    ))}

                {/* To load more posts */}
                {this.state.posts[this.state.n] ? (
                    <button
                        className="btn btn-link btn-sm"
                        onClick={() =>
                            this.setState({
                                n: this.state.n + 3,
                                posts: this.state.posts.reverse()
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

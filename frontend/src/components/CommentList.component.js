import React, { Component } from "react";
import Comment from "./Comment.component";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: "",
            imgs: [],
            comments: [],
            noOfComments: 5,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    //The post prop can take a while to arrive therefore cannot use componentDidMount
    componentDidUpdate(prevProps) {
        if (this.props.post !== prevProps.post)
            this.setState({ comments: this.props.post.comments });
    }

    handleChange(event) {
        // Store comment body in  the state
        const { value } = event.target;
        this.setState({
            body: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        // Submit comment only if it doesn't have only whitespaces
        if (this.state.body.trim()) {
            const { body } = this.state;
            // Store new comments at the beginning of the array, to display in reverse chronological order
            this.setState({ comments: this.state.comments.unshift(body) });

            let updatedPost = this.props.post;
            updatedPost.comments = this.state.comments;

            axios
                .post(
                    `${baseURL}/server/posts/edit/${this.props.post._id}`,
                    updatedPost
                )
                .then((res) => window.location.reload())
                .catch((err) => console.log(err));
        } else {
            alert("Cannot submit empty comment.");
        }
    }

    render() {
        let n = 0; //For sending a unique key
        return (
            <div className="comment-list">
                <hr />
                <h5 className="comment-heading">
                    Latest Comments<span className="full-stop">.</span>
                </h5>
                <br />
                <div>
                    {/* Render comments in reverse chronological order */}
                    {this.state.comments.length ? (
                        <div>
                            {this.state.comments
                                .slice(0, this.state.noOfComments)
                                .map((currentcomment) => (
                                    <Comment
                                        comment={currentcomment}
                                        key={n++}
                                        img={n + "dkjaslc"} // img prop is used in generating jdenticon
                                    />
                                ))}
                        </div>
                    ) : (
                        <h4 id="first-comment">
                            Be the first person to comment on this post
                            <span className="full-stop">.</span>
                        </h4>
                    )}

                    {/* The 'Load more comments' button's implementation */}
                    {/* This sets state, which in turn re-renders the list of comments */}
                    {this.state.comments[this.state.noOfComments] ? (
                        <button
                            className="btn btn-link"
                            onClick={() =>
                                this.setState((prevState) => ({
                                    noOfComments: prevState.noOfComments + 5,
                                }))
                            }
                        >
                            Load More Comments...
                        </button>
                    ) : (
                        " "
                    )}
                </div>

                <div className="comment-form">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input
                                className="form-control"
                                type="text"
                                onChange={this.handleChange}
                                placeholder="Start typing your comment..."
                                value={this.state.body}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btn btn-outline-success"
                                value="comment"
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CommentList;

import React, { Component } from "react";
import Comment from "./Comment.component";
import axios from "axios";

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

    componentDidMount() {
        console.log(this.props.post.comment);
        this.setState({ comments: this.props.post.comments });
    }

    // Get post prop
    componentDidUpdate(prevProps) {
        console.log("update:" + this.props);
        if (this.props.post !== prevProps.post)
            this.setState({ comments: this.props.post.comments });
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState({
            body: value,
        });
    }

    handleSubmit(event) {
        const { body } = this.state;
        this.setState({ comments: this.state.comments.unshift(body) });

        let updatedPost = this.props.post;
        updatedPost.comments = this.state.comments;

        axios
            .post(
                "https://mern-blog-it.herokuapp.com/posts/edit/" +
                    this.props.post._id,
                updatedPost
            )

            .then((res) => console.log(res.data))
            .catch((err) => console.log(err));
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

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
            noOfComments: 5
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (this.props.post !== prevProps.post)
            this.setState({ comments: this.props.post.comments });
    }

    handleChange(event) {
        const { value } = event.target;
        this.setState({
            body: value
        });
    }

    handleSubmit(event) {
        const { body } = this.state;
        this.setState({ comments: this.state.comments.unshift(body) });

        let updatedPost = this.props.post;
        updatedPost.comments = this.state.comments;

        axios
            .post(
                "http://localhost:5000/posts/edit/" + this.props.post._id,
                updatedPost
            )
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        let n = 0;
        return (
            <div>
                <hr />
                <br />
                <hr />
                <h6>Latest Comments</h6>
                <br />
                <div>
                    {this.state.comments.length ? (
                        <div>
                            {this.state.comments
                                .slice(0, this.state.noOfComments)
                                .map(currentcomment => (
                                    <Comment
                                        comment={currentcomment}
                                        key={n++}
                                        img={n + "Rajatdidthis"}
                                    />
                                ))}
                        </div>
                    ) : (
                        <h4>Be the first person to comment on this post</h4>
                    )}
                    {/* The 'Load more comments' button's implementation */}
                    {this.state.comments[this.state.noOfComments] ? (
                        <button
                            className="btn btn-link btn-sm"
                            onClick={() =>
                                this.setState(prevState => ({
                                    noOfComments: prevState.noOfComments + 5
                                }))
                            }
                        >
                            Load More Comments...
                        </button>
                    ) : (
                        " "
                    )}
                </div>

                <div>
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
                                className="btn btn-success btn-sm"
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

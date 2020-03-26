import React, { Component } from "react";
import Comment from "./Comment.component";
import axios from "axios";

class CommentList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            body: "",
            comments: []
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
        console.log("Change");
    }

    handleSubmit(event) {
        // event.preventDefault();

        const { body } = this.state;
        this.setState({ comments: this.state.comments.push(body) });
        console.log(this.state.comments);

        let updatedPost = this.props.post;
        updatedPost.comments = this.state.comments;

        axios
            .post(
                "http://localhost:5000/posts/edit/" + this.props.post._id,
                updatedPost
            )
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        // window.location = "/posts/show/" + this.props.post._id;
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
                {this.state.comments.length ? (
                    <div>
                        {this.state.comments
                            .reverse()
                            .slice(0, 3)
                            .map(currentcomment => (
                                <Comment comment={currentcomment} key={n++} />
                            ))}
                    </div>
                ) : (
                    <h4>Be the first person to comment on this post</h4>
                )}
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
                                className="btn btn-primary btn-sm"
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

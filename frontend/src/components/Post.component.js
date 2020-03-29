import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import CommentList from "./CommentList.component";

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = { post: {} };

        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount() {
        if (!this.props.post) {
            axios
                .get(
                    "http://localhost:5000/posts/" + this.props.match.params.id
                )
                .then(response => {
                    this.setState({ post: response.data });
                })
                .catch(err => console.error(err));
        }
    }

    deletePost(id) {
        axios
            .delete("http://localhost:5000/posts/" + id)
            .then(res => console.log(res.data))
            .catch(err => console.error(err));

        window.location = "/posts";
    }

    render() {
        if (this.props.post) {
            return (
                <div className="card">
                    <div className="card-body">
                        <Link
                            to={"/posts/show/" + this.props.post._id}
                            style={{
                                color: "black"
                            }}
                        >
                            <h1>{this.props.post.title}</h1>
                            <h4>{this.props.post.author}</h4>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        this.props.post.body.substring(0, 150) +
                                        "..."
                                }}
                            ></div>
                            <small>
                                <time>
                                    <span>Published on </span>
                                    {this.props.post.date.substring(8, 10) +
                                        "/" +
                                        this.props.post.date.substring(5, 7) +
                                        "/" +
                                        this.props.post.date.substring(0, 4) +
                                        " at " +
                                        this.props.post.date.substring(11, 16) +
                                        " IST"}
                                </time>
                            </small>

                            <br />
                        </Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <div className="card">
                        <div className="card-body">
                            <h1>{this.state.post.title}</h1>
                            <h3>{this.state.post.author}</h3>
                            <time>{this.state.post.date}</time>
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: this.state.post.body
                                }}
                            ></div>
                            <Link
                                to={"/posts/edit/" + this.state.post._id}
                                className="btn btn-primary"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() =>
                                    this.deletePost(this.state.post._id)
                                }
                                className="btn btn-danger"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                    <CommentList post={this.state.post} />
                </div>
            );
        }
    }
}

export default Post;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import alert css
import CommentList from "./CommentList.component";

// The same post component is used in the Postslist component and to SHOW the individual post component

class Post extends Component {
    constructor(props) {
        // When all the Posts has to to be showed, the "post" prop is recieved from the Postslist compnent
        super(props);
        this.state = { post: {}, isLoggedIn: false, readingTime: 0 };

        this.deletePost = this.deletePost.bind(this);
        this.confirmDelete = this.confirmDelete.bind(this);
    }

    componentDidMount() {
        // If this component is rendered to SHOW individual Post component, make an API call to get that individual post
        if (!this.props.post) {
            axios
                .get(
                    "https://mern-blog-it.herokuapp.com/server/posts/" +
                        this.props.match.params.id
                )
                .then((response) => {
                    this.setState({ post: response.data });

                    // Set the reading time for the post
                    if (this.state.post) {
                        const wordsPerMinute = 200; //average rate;
                        const noOfWords = this.state.post.body.split(" ")
                            .length;
                        if (noOfWords) {
                            const readingTime = Math.ceil(
                                noOfWords / wordsPerMinute
                            );
                            this.setState({ readingTime: readingTime });
                        }
                    }
                })
                .catch((err) => console.error(err));
        }
    }

    // Check if the correct user is logged in to display the edit and delete buttons
    componentDidUpdate() {
        if (
            sessionStorage.getItem("isLoggedIn") === "true" &&
            this.state.post.author === sessionStorage.getItem("username")
        ) {
            this.setState((prevState) => {
                if (!prevState.isLoggedIn) {
                    return { isLoggedIn: true };
                }
            });
        }
    }

    // React-conform-alert to delete a post
    confirmDelete(id) {
        confirmAlert({
            title: "Confirm to delete this post.",
            message: "Are you sure you want to do this?",
            buttons: [
                {
                    label: "YES",
                    onClick: () => this.deletePost(id),
                },
                {
                    label: "NO  ",
                    onClick: () =>
                        console.log(
                            "NO! I don't want to delete this magnificant piece of art!"
                        ),
                },
            ],
        });
    }

    deletePost(id) {
        axios
            .delete("https://mern-blog-it.herokuapp.com/server/posts/" + id)
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));

        window.location = "/posts";
    }

    render() {
        // When the posts are being rendered as a part of the PostsList component
        if (this.props.post) {
            return (
                <div className="card">
                    <div className="card-body">
                        <Link to={"/posts/show/" + this.props.post._id}>
                            <h1 className="post-title">
                                {this.props.post.title}
                            </h1>
                            <h5>
                                <span className="author">
                                    {this.props.post.author}
                                </span>
                            </h5>

                            <div
                                dangerouslySetInnerHTML={{
                                    __html:
                                        this.props.post.body
                                            .substring(0, 400)
                                            .trim() + "...",
                                }}
                            ></div>

                            <small>
                                <time>
                                    <span>Published on </span>
                                    {this.props.post.date.substring(8, 10) +
                                        "/" +
                                        this.props.post.date.substring(5, 7) +
                                        "/" +
                                        this.props.post.date.substring(0, 4)}
                                </time>
                            </small>
                            <br />
                        </Link>
                    </div>
                </div>
            );
        }
        // To render the SHOW page for all the individual posts
        else {
            return (
                <div className="post">
                    <div className="card">
                        <div className="card-body">
                            <h1 className="post-title">
                                {this.state.post.title}
                            </h1>
                            <h3 className="author">{this.state.post.author}</h3>
                            <time>
                                <span>Published on </span>
                                {this.state.post.date
                                    ? this.state.post.date.substring(8, 10) +
                                      "/" +
                                      this.state.post.date.substring(5, 7) +
                                      "/" +
                                      this.state.post.date.substring(0, 4)
                                    : " "}
                            </time>
                            <div className="read-time">
                                {this.state.readingTime} min read
                            </div>
                            <div
                                className="post-body"
                                dangerouslySetInnerHTML={{
                                    __html: this.state.post.body,
                                }}
                            ></div>
                            {/* Display the 'Edit' and 'Delete' buttons only if the correct user is logged in */}
                            {this.state.isLoggedIn ? (
                                <span>
                                    <Link
                                        to={
                                            "/posts/edit/" + this.state.post._id
                                        }
                                        className="btn btn-outline-primary"
                                    >
                                        Edit
                                    </Link>{" "}
                                    <button
                                        onClick={() =>
                                            this.confirmDelete(
                                                this.state.post._id
                                            )
                                        }
                                        className="btn btn-outline-danger"
                                    >
                                        Delete
                                    </button>
                                </span>
                            ) : (
                                " "
                            )}
                        </div>
                    </div>
                    {/* Render the comments below the post */}
                    <CommentList post={this.state.post} />
                </div>
            );
        }
    }
}

export default Post;

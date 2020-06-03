import React, { Component } from "react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import sanitizeHtml from "sanitize-html";

const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000";

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            author: "",
            date: "",
            isLoggedIn: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    componentDidMount() {
        axios
            .get(`${baseURL}/server/posts/${this.props.match.params.id}`)
            .then((post) => {
                this.setState({
                    title: post.data.title,
                    body: post.data.body,
                    author: post.data.author,
                    date: post.data.date,
                    comments: post.data.comments,
                });
            })
            .catch((err) => console.error(err));

        if (sessionStorage.getItem("isLoggedIn") === "true") {
            this.setState({ isLoggedIn: true });
        }
    }

    handleEditorChange(event, editor) {
        this.setState({ body: editor.getData() });
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const sanitizedData = sanitizeHtml(this.state.body);
        this.setState({ body: sanitizedData });

        const editedPost = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body,
            date: this.state.date,
            comments: this.state.comments,
        };

        axios
            .post(
                `${baseURL}/server/posts/edit/${this.props.match.params.id}`,
                editedPost
            )
            .then(
                // redirect to SHOW page
                (res) =>
                    (window.location = `/posts/show/${this.props.match.params.id}`)
            )
            .catch((err) => console.error(err));
    }

    render() {
        if (this.state.isLoggedIn) {
            return (
                <div className="edit-post">
                    <h1>
                        Edit Blog Post<span className="full-stop">.</span>
                    </h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label className="edit-title">Title: </label>
                            <input
                                className="form-control edit-title"
                                type="text"
                                name="title"
                                value={this.state.title}
                                onChange={this.handleChange}
                                required
                            />
                        </div>

                        <div>
                            <CKEditor
                                editor={ClassicEditor}
                                data={this.state.body}
                                onChange={this.handleEditorChange}
                                config={{
                                    toolbar: [
                                        "heading",
                                        "|",
                                        "bold",
                                        "italic",
                                        "link",
                                        "bulletedList",
                                        "numberedList",
                                        "blockquote",
                                        "undo",
                                        "redo",
                                    ],
                                }}
                            />
                        </div>
                        <br />
                        <div className="form-group">
                            <input
                                type="submit"
                                value="Submit Post"
                                className="btn btn-outline-primary btn-lg"
                            />
                        </div>
                    </form>
                </div>
            );
        } else {
            return (
                <div
                    className="alert alert-warning"
                    role="alert"
                    onClick={() => (window.location = "/login")}
                >
                    You need to login to edit your post!
                    <button
                        type="button"
                        className="close"
                        data-dismiss="alert"
                        aria-label="Close"
                    >
                        <span aria-hidden="true" className="alert-close">
                            &times;{" "}
                        </span>
                    </button>
                </div>
            );
        }
    }
}

export default EditPost;

import React, { Component } from "react";
import axios from "axios";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import sanitizeHtml from "sanitize-html";

class CreatePosts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            author: "",
            date: Date
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);
    }

    handleEditorChange(event, editor) {
        const data = editor.getData();
        const sanitizedData = sanitizeHtml(data);
        this.setState({ body: sanitizedData });
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ date: new Date() });

        const Blog = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body,
            date: this.state.date
        };

        axios
            .post("http://localhost:5000/posts/create/", Blog)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        window.location = "/posts";
    }

    render() {
        return (
            <div>
                <h1>Create New Blog Post</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            className="form-control"
                            type="text"
                            name="title"
                            value={this.state.title}
                            onChange={this.handleChange}
                            required
                            placeholder="The Best Title"
                        />
                    </div>
                    <div className="form-group">
                        <label>Author: </label>
                        <input
                            className="form-control"
                            type="text"
                            name="author"
                            value={this.state.author}
                            onChange={this.handleChange}
                            required
                            placeholder="John Oliver"
                        />
                    </div>
                    <div>
                        <CKEditor
                            editor={ClassicEditor}
                            data="Start your Blog Post here..."
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <br />
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Post"
                            className="btn btn-success btn-lg"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default CreatePosts;

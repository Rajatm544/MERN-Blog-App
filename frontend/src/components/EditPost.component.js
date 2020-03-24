import React, { Component } from "react";
import axios from "axios";

class EditPost extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: "",
            body: "",
            author: "",
            date: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        axios
            .get("http://localhost:5000/posts/" + this.props.match.params.id)
            .then(post => {
                this.setState({
                    title: post.data.title,
                    body: post.data.body,
                    author: post.data.author,
                    date: post.data.date
                });
            })
            .catch(err => console.error(err));
    }

    handleChange(event) {
        const { name, value } = event.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        const Blog = {
            title: this.state.title,
            author: this.state.author,
            body: this.state.body,
            date: this.state.date
        };

        console.log(Blog);
        axios
            .post(
                "http://localhost:5000/posts/edit/" +
                    this.props.match.params.id,
                Blog
            )
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        window.location = "/posts/show/" + this.props.match.params.id;
    }

    render() {
        return (
            <div>
                <h1>Edit Blog Post</h1>
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
                        />
                    </div>
                    <div className="form-group">
                        <label>Edit Blog Post: </label>
                        <textarea
                            className="form-control"
                            value={this.state.body}
                            name="body"
                            onChange={this.handleChange}
                            rows="30"
                            outline="none"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Submit Post"
                            className="btn btn-primary btn-lg"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default EditPost;

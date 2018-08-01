import React, { Component } from 'react';
import axios from 'axios';
import Post from './components/Post';
// import PostForm from './components/PostForm';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: [],
      title: '',
      contents: ''
    }
  }
  componentDidMount() {
    axios
        .get("http://localhost:8000/posts")
        .then(response => {
          this.setState({ posts: response.data });
        })
        .catch(err => {
          console.log(err);
        });
    };

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value})
  }

  handleSubmit = () => {
    axios
      .post("http://localhost:8000/posts", {
        title: this.state.title,
        contents: this.state.contents
      })
      .then(res => {
        const posts = this.state.posts.slice()
        posts.push(res)
        this.setState({title: '', contents: ''})
      })
      .catch(err => {
        console.log(err)
      })
    }

  render() {
    return (
      <div className="App">
        <h1>Who Said It?</h1>
        <input 
        type="text"
        name="title"
        placeholder="title here"
        value={this.state.title}
        onChange={this.handleInputChange}
        />
        <input 
        type="text"
        name="contents"
        placeholder="contents here"
        value={this.state.contents}
        onChange={this.handleInputChange}
        />
        <button onClick={() => this.handleSubmit()}>Submit!</button>
        {this.state.posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import axios from 'axios';
import Post from './components/Post';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    axios
        .get("http://localhost:8000/api/posts")
        .then(response => {
          this.setState({ posts: response.data });
        })
        .catch(err => {
          console.log(err);
        });
    };

  render() {
    return (
      <div className="App">
        <h1>These Be the Posts</h1>
        {this.state.posts.map(post => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

export default App;

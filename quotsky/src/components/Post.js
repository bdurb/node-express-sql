import React from 'react';
import './post.css';

const Post = props => {
  return (
    <div className="post-container">
      <h2>{props.post.title}</h2>
      <p>{props.post.contents}</p>
    </div>
  );
}
 
export default Post;
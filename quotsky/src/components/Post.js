import React from 'react';

const Post = props => {
  return (
    <div className="postContainer">
      {props.post.title}
      {props.post.contents}
    </div>
  );
}
 
export default Post;
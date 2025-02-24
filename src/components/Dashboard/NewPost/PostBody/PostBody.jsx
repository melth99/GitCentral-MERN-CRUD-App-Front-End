import React from 'react';
import './PostBody.css';

const PostBody = (props) => {
  return (
    <div className="post-body">
      <textarea
        value={props.bodyValue}
        onChange={props.handleBodyChange}
        className="new-post-body"
        placeholder="Write your post here..."
      />
    </div>
  );
};

export default PostBody;

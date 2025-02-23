import React from 'react';
import './PostBody.css';

const PostBody = ({ bodyValue, handleBodyChange }) => {
  return (
    <div className="post-body">
      <textarea
        value={bodyValue}
        onChange={handleBodyChange}
        className="new-post-body"
        placeholder="Write your post here..."
      />
    </div>
  );
};

export default PostBody;

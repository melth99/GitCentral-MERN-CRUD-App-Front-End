import React from 'react';
import './PostBody.css';

const PostBody = ({ handleBodyChange, bodyValue}) => {
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

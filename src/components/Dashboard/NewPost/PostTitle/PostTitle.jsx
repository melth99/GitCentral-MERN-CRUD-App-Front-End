import React from 'react';
import './PostTitle.css';

const PostTitle = ({ inputValue, handleInputChange }) => {
  return (
    <div className="post-title">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="new-post-title"
        placeholder="Title*"
      />
    </div>
  );
};

export default PostTitle;

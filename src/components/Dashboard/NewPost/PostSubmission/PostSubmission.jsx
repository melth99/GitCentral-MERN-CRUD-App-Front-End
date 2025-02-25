import React from 'react';
import './PostSubmission.css';

const PostSubmission = ({ handleSubmit }) => {
  return (
    <button id="submit-post-button" onClick={handleSubmit}>
      Submit
    </button>
  );
};

export default PostSubmission;
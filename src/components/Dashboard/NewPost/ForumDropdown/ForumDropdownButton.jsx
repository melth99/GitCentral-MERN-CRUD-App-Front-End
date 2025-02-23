import React from 'react';
import './ForumDropdownButton.css';

const ForumDropdownButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="select-forum-button">
      Current Forum &#8595;
    </button>
  );
};

export default ForumDropdownButton;

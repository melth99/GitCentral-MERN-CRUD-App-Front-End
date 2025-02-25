import React from 'react';
import './ForumDropdownButton.css';

const ForumDropdownButton = ({ onClick, selectedForum }) => {
  return (
    <button onClick={onClick} className="select-forum-button">
      {selectedForum} ↓
    </button>
  );
};

export default ForumDropdownButton;
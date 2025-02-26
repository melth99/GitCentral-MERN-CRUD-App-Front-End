// ForumDropdownButton.jsx
import React from 'react';
import './ForumDropdownButton.css';

const ForumDropdownButton = ({ onClick, selectedForum, isDropdownVisible }) => {
  return (
    <button
      onClick={onClick}
      className="select-forum-button"
      aria-expanded={isDropdownVisible}
    >
      {selectedForum || 'Select a Topic'}
    </button>
  );
};

export default ForumDropdownButton;
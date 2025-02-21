import React from 'react';

const ForumDropdownButton = ({ onClick }) => {
  return (
    <button onClick={onClick} className="select-forum-button">
      forum name &#8595;
    </button>
  );
};

export default ForumDropdownButton;

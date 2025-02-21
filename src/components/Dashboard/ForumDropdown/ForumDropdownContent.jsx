import React from 'react';

const ForumDropdownContent = ({ availableForums, isVisible }) => {
  return (
    <div className={`forum-dropdown-content ${isVisible ? 'visible' : 'hidden'}`}>
      {availableForums.map((forum, index) => (
        <a href="#" key={index} className="dropdown-item">
          {forum}
        </a>
      ))}
    </div>
  );
};

export default ForumDropdownContent;

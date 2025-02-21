import React, { useState } from 'react';
import ForumDropdownButton from './ForumDropdownButton';
import ForumDropdownContent from './ForumDropdownContent';
import './ForumDropdown.css';


const ForumDropdown = ({ availableForums }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownButtonClick = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="forum-dropdown-container">
      <ForumDropdownButton onClick={handleDropdownButtonClick} />
      <ForumDropdownContent 
        availableForums={availableForums} 
        isVisible={isDropdownVisible} 
      />
    </div>
  );
};

export default ForumDropdown;

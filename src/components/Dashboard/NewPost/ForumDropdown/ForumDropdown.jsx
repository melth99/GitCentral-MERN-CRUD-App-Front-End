import React, { useState } from 'react';
import ForumDropdownButton from './ForumDropdownButton';
import ForumDropdownContent from './ForumDropdownContent';
import './ForumDropdown.css';

const ForumDropdown = ({ availableTopics, selectedTopic, setSelectedTopic }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleDropdownButtonClick = () => {
    setIsDropdownVisible((prev) => !prev);
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setIsDropdownVisible(false);
  };

  return (
    <div className="forum-dropdown-container">
      <ForumDropdownButton
        onClick={handleDropdownButtonClick}
        selectedForum={selectedTopic?.title || 'Select a Topic'} // Changed name to title
        isDropdownVisible={isDropdownVisible}
      />
      {isDropdownVisible && (
        <ForumDropdownContent
          availableTopics={availableTopics}
          onTopicSelect={handleTopicSelect}
        />
      )}
    </div>
  );
};

export default ForumDropdown;
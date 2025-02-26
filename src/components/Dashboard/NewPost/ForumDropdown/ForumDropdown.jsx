// ForumDropdown.jsx
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
        selectedForum={selectedTopic?.name || 'Select a Topic'}
        isDropdownVisible={isDropdownVisible} // Pass visibility for ARIA
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
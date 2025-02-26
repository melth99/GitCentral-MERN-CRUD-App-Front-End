// ForumDropdownContent.jsx
import React from 'react';
import './ForumDropdownContent.css';

const ForumDropdownContent = ({ availableTopics, onTopicSelect }) => {
  console.log('ForumDropdownContent - availableTopics:', availableTopics);

  return (
    <div className="forum-dropdown-content">
      {availableTopics && availableTopics.length > 0 ? (
        availableTopics.map((topic) => (
          <button
            key={topic._id} // Adjusted to _id to match TopicBoard's forumList
            className="dropdown-item"
            onClick={() => onTopicSelect(topic)}
          >
            {topic.name}
          </button>
        ))
      ) : (
        <p>No topics available</p>
      )}
    </div>
  );
};

export default ForumDropdownContent;
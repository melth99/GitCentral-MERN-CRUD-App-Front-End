import React from 'react';
import './ForumDropdownContent.css';

const ForumDropdownContent = ({ availableTopics, onTopicSelect }) => {
  console.log('ForumDropdownContent - availableTopics:', availableTopics); // Debug log

  return (
    <div className="forum-dropdown-content">
      {availableTopics && availableTopics.length > 0 ? (
        availableTopics.map((topic) => (
          <a
            href="#"
            key={topic.id} // Use topic.id for unique key
            className="dropdown-item"
            onClick={(e) => {
              e.preventDefault();
              onTopicSelect(topic); // Pass full topic object
            }}
          >
            {topic.name} {/* Display topic name */}
          </a>
        ))
      ) : (
        <p>No topics available</p>
      )}
    </div>
  );
};

export default ForumDropdownContent;
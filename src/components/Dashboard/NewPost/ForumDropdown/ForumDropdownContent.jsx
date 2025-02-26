import React from 'react';
import './ForumDropdownContent.css';

const ForumDropdownContent = ({ availableTopics, onTopicSelect }) => {
  console.log('ForumDropdownContent - availableTopics:', availableTopics);

  return (
    <div className="forum-dropdown-content">
      {availableTopics && availableTopics.length > 0 ? (
        availableTopics.map((topic) => (
          <button
            key={topic._id} // Correctly using _id
            className="dropdown-item"
            onClick={() => onTopicSelect(topic)}
          >
            {topic.title} {/* Changed name to title */}
          </button>
        ))
      ) : (
        <p>No topics available</p>
      )}
    </div>
  );
};

export default ForumDropdownContent;
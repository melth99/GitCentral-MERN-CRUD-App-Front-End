import React from 'react';
// import './ForumsList.css'; // Optional: Add styling if needed

const ForumsList = ({ onTopicSelect }) => {
  const forums = [

  ];

  const handleTopicClick = (topicId, topicName) => {
    onTopicSelect(topicId, topicName);
  };

  return (
    <div id="forums-container">
      <div id="forums-title">Forums</div>
      <ul id="forums-menu">
        {forums.map((topic) => (
          <li key={topic.id} className="forums-menu-tab">
            <a
              onClick={() => handleTopicClick(topic.id, topic.name)}
              className="forums-menu-item"
            >
              {topic.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForumsList;
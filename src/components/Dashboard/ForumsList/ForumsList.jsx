import React from 'react';
// import './ForumsList.css'; // Optional: Add styling if needed
import { useState } from 'react';

const ForumsList = ({ onTopicSelect }) => {
//fetch call needed 
  const initialState = [/*
    { id: 'ai', name: 'AI and Machine Learning' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile App Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'security', name: 'Cybersecurity' },
    { id: 'iot', name: 'Internet of Things' },
    { id: 'blockchain', name: 'Blockchain' },
    */
   {}
  ];
  const [forums,setForums] = useState({initialState})

  const handleTopicClick = (topicId, topicName) => {
    onTopicSelect(topicId, topicName);
  };

  return (
    <div id="forums-container">
      <div id="forums-title">Forums</div>
      <ul id="forums-menu">
        {hotTopics.map((topic) => (
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
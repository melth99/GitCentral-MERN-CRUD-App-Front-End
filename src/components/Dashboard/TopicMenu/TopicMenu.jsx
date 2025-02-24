import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicMenu.css';

const TopicMenu = ({ onTopicSelect }) => {
  const { user } = useContext(UserContext);

  const handleTopicClick = (topicId, topicName) => {
    onTopicSelect(topicId, topicName);
  };

  // Array of hot topics
  const forums = [
    { id: 'ai', name: 'AI and Machine Learning' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile App Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'security', name: 'Cybersecurity' },
    { id: 'iot', name: 'Internet of Things' },
    { id: 'blockchain', name: 'Blockchain' }
  ];

  return (
    <div id="bottom-section">
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
      <div id="topic-menu-container">
        <div id="topic-menu-title">Select a topic to view discussions</div>
        <div id="topic-menu-menu">
{/* Replace href="#" with onClick handlers */}
        <div className="topic-menu-tab">
        <a onClick={() => handleTopicClick('post1')} className="topic-menu-item">Post 1</a>
        <a onClick={() => handleTopicClick('user1')} className="topic-menu-user">User 1</a>
        </div>
{/* ... other topics ... */}        </div>
      </div>
    </div>
  );
};

export default TopicMenu;

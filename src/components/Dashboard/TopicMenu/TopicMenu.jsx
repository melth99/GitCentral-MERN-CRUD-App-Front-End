import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicMenu.css';

const TopicMenu = ({ onTopicSelect }) => {
  const { user } = useContext(UserContext);

  const handleTopicClick = (topicId) => {
    onTopicSelect(topicId);
  };

  return (
    <div id="bottom-section">
      <div id="hot-topics-container">
        <div id="hot-topic-title">Hot Topics</div>
        <div id="hot-topic-menu">
          {/* Replace href="#" with onClick handlers */}
          <div className="hot-topic-menu-tab">
            <a onClick={() => handleTopicClick('ai')} className="hot-topic-menu-item">AI and Machine Learning</a>
          </div>
          {/* ... other hot topics ... */}
        </div>
      </div>
      <div id="topic-menu-container">
        <div id="topic-menu-title">'topic title' repo discussion</div>
        <div id="topic-menu-menu">
          {/* Replace href="#" with onClick handlers */}
          <div className="topic-menu-tab">
            <a onClick={() => handleTopicClick('topic1')} className="topic-menu-item">Topic 1</a>
            <a onClick={() => handleTopicClick('user1')} className="topic-menu-user">User 1</a>
          </div>
          {/* ... other topics ... */}
        </div>
      </div>
    </div>
  );
};

export default TopicMenu;

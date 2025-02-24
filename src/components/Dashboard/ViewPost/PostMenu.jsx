import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './PostMenu.css';

const PostMenu = ({ topicId, topicName, submitButton, onTopicSelect }) => {
  const { user } = useContext(UserContext);

  const handleTopicClick = (topicId, topicName) => {
    onTopicSelect(topicId, topicName);
  };

  // Array of hot topics (same as in TopicMenu)
  const hotTopics = [
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
      <div id="post-menu-container">
        <div id="post-menu-title">{topicName}</div>
        <div id="post-menu-menu">
          <div id="post-menu-left-section">
            <div id="post-content-backdrop">
              <div id="post-content-main">
                <p>Post content here</p>
              </div>
            </div>
            <div id="post-comments-backdrop">
              <div id="post-comments-main">
                <p>Post comments here w/ enlarge feature</p>
              </div>
            </div> 
          </div>
          <div id="post-menu-right-section">
            <div id="post-image-backdrop">   
             <div id="post-image-main">
             <p>Dynamic image here w/ enlarge feature</p>
              <img alt="Post" /> 
              </div>
            </div>
            <div id="post-extras-backdrop">
            <div id="post-extras-main">
              <p>Post comments right here</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMenu;

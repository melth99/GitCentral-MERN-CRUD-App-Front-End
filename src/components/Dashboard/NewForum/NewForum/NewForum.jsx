import React, { useState, useRef, useEffect } from 'react';
import './NewForum.css';

const NewForum = ({ onTopicSelect, onClose }) => {
  const [forumList, setForumList] = useState([]);
  const [newTopicName, setNewTopicName] = useState('');
  const containerRef = useRef(null);

  const handleTopicClick = (topicId, topicName) => {
    onTopicSelect(topicId, topicName);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTopicName) {
      const newTopic = {
        id: forumList.length + 1,
        name: newTopicName,
      };
      setForumList([...forumList, newTopic]);
      setNewTopicName('');
    }
  };

  return (
    <div id="new-forum-container" ref={containerRef}>
      <div id="new-forum-title">Create a New Forum</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          placeholder="Create a new forum"
        />
        <button type="submit">Create</button>
      </form>
      <ul id="new-forum-menu">
        {forumList.map((topic) => (
          <li key={topic.id} className="new-forum-menu-tab">
            <a
              onClick={() => handleTopicClick(topic.id, topic.name)}
              className="new-forum-menu-item"
            >
              {topic.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewForum;

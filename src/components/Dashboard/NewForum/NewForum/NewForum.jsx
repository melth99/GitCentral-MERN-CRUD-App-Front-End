import React, { useState, useRef, useEffect, } from 'react';
import './NewForum.css';

const NewForum = ({ onTopicSelect, onClose, onSubmit }) => {
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
      onSubmit({ name: newTopicName });
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
    </div>
  );
};

export default NewForum;

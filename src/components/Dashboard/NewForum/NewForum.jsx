import React, { useState, useRef, useEffect } from 'react';
import './NewForum.css';

const NewForum = ({ onTopicSelect, onClose, onSubmit }) => {
  const [newTopicName, setNewTopicName] = useState('');
  const containerRef = useRef(null);

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
      const newForum = {
        id: Date.now().toString(), // Generate a unique ID
        name: newTopicName
      };
      onSubmit(newForum); // Pass the new forum object up to TopicBoard
      setNewTopicName(''); // Clear the input
      onClose(); // Close the form after submission
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
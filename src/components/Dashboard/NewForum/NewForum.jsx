import React, { useState, useRef, useEffect } from 'react';
import './NewForum.css';

// NewForum.jsx
const NewForum = ({ onClose, onCreateForum }) => {
  const [newTopicName, setNewTopicName] = useState('');
  const containerRef = useRef(null);

  useEffect(() => {
      const handleClickOutside = (event) => {
          if (containerRef.current && !containerRef.current.contains(event.target)) {
              onClose();
          }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      if (!newTopicName.trim()) return;

      try {
          const forumData = {
              name: newTopicName.trim(),
              // Add any additional required fields
              description: '', // Add if needed
          };
          await onCreateForum(forumData);
          setNewTopicName('');
          onClose();
      } catch (error) {
          console.error('Failed to create forum:', error);
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
                  placeholder="Enter forum name"
                  required
              />
              <button type="submit">Create</button>
          </form>
      </div>
  );
};

export default NewForum
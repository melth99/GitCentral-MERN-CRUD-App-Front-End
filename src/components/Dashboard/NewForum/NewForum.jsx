import React, { useState, useRef, useEffect } from 'react';
import './NewForum.css';

const NewForum = ({ onTopicSelect, onClose, onSubmit }) => {
  const [newTopicTitle, setNewTopicTitle] = useState('');
  const [error, setError] = useState('');
  const containerRef = useRef(null);

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateTitle = (title) => {
    if (title.length < 5) return 'Title must be at least 5 characters long.';
    if (title.length > 100) return 'Title must be 100 characters or less.';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateTitle(newTopicTitle);
    if (validationError) {
      setError(validationError);
      return;
    }

    const token = localStorage.getItem('token');
    const forumData = { title: newTopicTitle };

    try {
      const response = await fetch('http://localhost:3000/forums', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(forumData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create forum: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Forum created:', result);

      onSubmit(result);
      setNewTopicTitle('');
      setError('');
      onClose();
    } catch (error) {
      console.error('Error creating forum:', error);
      if (error.message.includes('401')) {
        setError('Please log in to create a forum.');
      } else if (error.message.includes('400')) {
        setError('Invalid title. Must be 5–100 characters.');
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div id="new-forum-container" ref={containerRef}>
      <div id="new-forum-title">Create a New Forum</div>
      <form onSubmit={handleSubmit} className="new-forum-form">
        <input
          type="text"
          value={newTopicTitle}
          onChange={(e) => {
            setNewTopicTitle(e.target.value);
            setError(validateTitle(e.target.value));
          }}
          placeholder="Enter forum title (5–100 characters)"
          className="new-forum-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" disabled={!!error} className="publish-forum-button">
          Publish
        </button>
      </form>
    </div>
  );
};

export default NewForum;
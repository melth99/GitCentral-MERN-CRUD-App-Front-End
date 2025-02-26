import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import ForumDropdown from '../ForumDropdown/ForumDropdown';
import PostTitle from '../PostTitle/PostTitle';
import PostBody from '../PostBody/PostBody';
import './NewPost.css';
import PostNav from '../PostNav/PostNav';
import PostSubmission from '../PostSubmission/PostSubmission';

const NewPost = ({ topicId, onSubmit, selectedTopicName, availableTopics, editingPost }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(true);
  const [inputValue, setInputValue] = useState(editingPost?.title || '');
  const [bodyValue, setBodyValue] = useState(editingPost?.contents || '');
  const [selectedTopic, setSelectedTopic] = useState(
    availableTopics.find((topic) => topic.title === selectedTopicName) || null
  );
  const dropdownRef = useRef(null);

  useEffect(() => {
    const newSelectedTopic = availableTopics.find((topic) => topic.title === selectedTopicName) || null;
    if (newSelectedTopic?._id !== selectedTopic?._id) {
      setSelectedTopic(newSelectedTopic);
    }
  }, [selectedTopicName, availableTopics]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Optional: Add logic if needed
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleBodyChange = (e) => setBodyValue(e.target.value);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !bodyValue.trim() || !selectedTopic) {
      console.warn('Title, body, and forum are required');
      return;
    }

    const newPost = {
      forum: selectedTopic._id,
      creator: user?.username || 'Anonymous',
      title: inputValue.trim(),
      contents: bodyValue.trim(),
    };

    try {
      let createdPost;
      if (editingPost) {
        const response = await fetch(`http://localhost:3000/posts/${editingPost._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost),
        });
        createdPost = await response.json();
      } else {
        const response = await fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPost),
        });
        createdPost = await response.json();
      }
      onSubmit(createdPost);
      setInputValue('');
      setBodyValue('');
      setSelectedTopic(null);
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div id="new-post-container" ref={dropdownRef}>
      <h1 id="post-heading">{editingPost ? 'Edit Post' : 'Create a New Post'}</h1>
      <ForumDropdown
        availableTopics={availableTopics}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
      />
      <PostNav />
      {isEditing && (
        <PostTitle inputValue={inputValue} handleInputChange={handleInputChange} />
      )}
      <PostBody bodyValue={bodyValue} handleBodyChange={handleBodyChange} />
      <PostSubmission handleSubmit={handlePostSubmit} />
    </div>
  );
};

export default NewPost;
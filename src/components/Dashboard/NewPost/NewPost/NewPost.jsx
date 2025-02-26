// NewPost.jsx
import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import ForumDropdown from '../ForumDropdown/ForumDropdown';
import PostTitle from '../PostTitle/PostTitle';
import PostBody from '../PostBody/PostBody';
import './NewPost.css';
import PostNav from '../PostNav/PostNav';
import PostSubmission from '../PostSubmission/PostSubmission';
import * as postService from '../../../../services/postService';

const NewPost = ({ topicId, onSubmit, selectedTopicName, availableTopics, editingPost }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(true);
  const [inputValue, setInputValue] = useState(editingPost?.title || '');
  const [bodyValue, setBodyValue] = useState(editingPost?.body || '');
  const [selectedTopic, setSelectedTopic] = useState(
    availableTopics.find((topic) => topic.name === selectedTopicName) || null
  );
  const dropdownRef = useRef(null);

  // Sync selectedTopic with props changes
  useEffect(() => {
    const newSelectedTopic = availableTopics.find((topic) => topic.name === selectedTopicName) || null;
    if (newSelectedTopic?._id !== selectedTopic?._id) {
      setSelectedTopic(newSelectedTopic);
    }
  }, [selectedTopicName, availableTopics]);

  // Handle click outside to potentially close dropdown or reset state
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Optional: Add logic to close or reset if needed
        // For now, it does nothing but can be extended
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => setInputValue(e.target.value);
  const handleBodyChange = (e) => setBodyValue(e.target.value);

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || !bodyValue.trim()) {
      console.warn('Title and body are required');
      return;
    }

    const newPost = {
      title: inputValue.trim(),
      body: bodyValue.trim(),
      topicId: selectedTopic?._id || topicId, // Use _id to match TopicBoard
      userId: user?.id,
    };

    try {
      let createdPost;
      if (editingPost) {
        createdPost = await postService.updatePost(editingPost.id, newPost);
      } else {
        createdPost = await postService.createPost(newPost);
      }
      onSubmit(createdPost);
      setInputValue('');
      setBodyValue('');
      setSelectedTopic(null); // Reset topic selection after submission
    } catch (error) {
      console.error('Error submitting post:', error);
      // Optional: Add user-facing error feedback here
    }
  };

  return (
    <div id="new-post-container" ref={dropdownRef}>
      <h1 id="post-heading">{editingPost ? 'Edit Post' : 'Create a New Post'}</h1>
      <ForumDropdown
        availableTopics={availableTopics}
        selectedTopic={selectedTopic} // Pass full object instead of just name
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
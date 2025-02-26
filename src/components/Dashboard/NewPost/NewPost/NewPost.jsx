// frontend/components/NewPost/NewPost.jsx
import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import ForumDropdown from '../ForumDropdown/ForumDropdown';
import PostTitle from '../PostTitle/PostTitle';
import PostBody from '../PostBody/PostBody';
import './NewPost.css';
import PostNav from '../PostNav/PostNav';
import PostSubmission from '../PostSubmission/PostSubmission';
import { createPost, updatePost } from '../../../../services/postService'; // Correct import path

const NewPost = ({ topicId, onSubmit, selectedTopicName, availableTopics, editingPost }) => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(true);
  const [inputValue, setInputValue] = useState(editingPost?.title || '');
  const [bodyValue, setBodyValue] = useState(editingPost?.contents || '');
  const [selectedTopic, setSelectedTopic] = useState(
    availableTopics.find((topic) => topic.title === selectedTopicName) || null
  );
  const [error, setError] = useState(null); // Added for user feedback
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
        // Optional: Add logic here if needed (e.g., close dropdown)
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
      setError('Title, body, and forum are required');
      return;
    }

    const postData = {
      forum: selectedTopic._id,
      creator: user?.username || 'Anonymous',
      title: inputValue.trim(),
      contents: bodyValue.trim(),
    };

    try {
      setError(null); // Clear previous errors
      let createdPost;
      if (editingPost) {
        createdPost = await updatePost(editingPost._id, postData);
      } else {
        createdPost = await createPost(postData);
      }
      onSubmit(createdPost);
      setInputValue('');
      setBodyValue('');
      setSelectedTopic(null);
    } catch (error) {
      console.error('Error submitting post:', error.message);
      setError(error.message); // Display error to user
    }
  };

  return (
    <div id="new-post-container" ref={dropdownRef}>
      <h1 id="post-heading">{editingPost ? 'Edit Post' : 'Create a New Post'}</h1>
      {error && <p className="error-message">{error}</p>} {/* Display errors */}
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
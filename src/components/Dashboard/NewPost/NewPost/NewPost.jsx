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
  const [inputValue, setInputValue] = useState(editingPost ? editingPost.title : '');
  const [bodyValue, setBodyValue] = useState(editingPost ? editingPost.body : '');
  const [selectedTopic, setSelectedTopic] = useState(
    availableTopics.find((topic) => topic.name === selectedTopicName) || null
  );
  const dropdownRef = useRef(null);

  console.log('NewPost - selectedTopic:', selectedTopic);
  console.log('NewPost - availableTopics:', availableTopics);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleBodyChange = (e) => {
    setBodyValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue && bodyValue) {
      const newPost = {
        title: inputValue,
        body: bodyValue,
        topicId: selectedTopic ? selectedTopic.id : topicId,
      };
      onSubmit(newPost);
      setInputValue('');
      setBodyValue('');
      setSelectedTopic(null);
    }
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.id !== 'new-post-container'
    ) {
      // No action needed since ForumDropdown handles visibility
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div id="new-post-container" ref={dropdownRef}>
      <h1 id="post-heading">{editingPost ? 'Edit Post' : 'Create a New Post'}</h1>
      <ForumDropdown
        availableTopics={availableTopics}
        selectedTopicName={selectedTopic ? selectedTopic.name : selectedTopicName}
        setSelectedTopic={setSelectedTopic}
      />
      <PostNav />
      {isEditing && (
        <PostTitle inputValue={inputValue} handleInputChange={handleInputChange} />
      )}
      <PostBody bodyValue={bodyValue} handleBodyChange={handleBodyChange} />
      <PostSubmission handleSubmit={handleSubmit} />
    </div>
  );
};

export default NewPost;
import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../../contexts/UserContext';
import ForumDropdown from '../ForumDropdown/ForumDropdown';
import PostTitle from '../PostTitle/PostTitle';
import PostBody from '../PostBody/PostBody';
import './NewPost.css';
import PostNav from '../PostNav/PostNav';
import PostSubmission from '../PostSubmission/PostSubmission';


const NewPost = () => {
  const { user } = useContext(UserContext);
  const [isEditing, setIsEditing] = useState(true); // Start with editing enabled
  const [inputValue, setInputValue] = useState('');
  const dropdownRef = useRef(null);

  const availableForums = [
    'Forum 1',
    'Forum 2',
    'Forum 3',
    'Forum 4',
  ];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.id !== 'new-post-container'
    ) {
      setShowDropdown(false);
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
      <h1 id="post-heading">Create a New Post</h1>
      <ForumDropdown availableForums={availableForums} />
      <PostNav />
      {isEditing && (
        <PostTitle inputValue={inputValue} handleInputChange={handleInputChange} />
      )}
      <PostBody />
      <PostSubmission />
    </div>
  );
};

export default NewPost;

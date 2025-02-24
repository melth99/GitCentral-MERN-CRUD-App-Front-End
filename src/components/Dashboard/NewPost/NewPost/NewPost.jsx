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
  const [bodyValue, setBodyValue] = useState('');
  const [allPosts, setAllPosts] = useState([]);
  const [allForums, setAllForums] = useState([]);
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

  const handleBodyChange = (e) => {
    setBodyValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted');
    setAllPosts ([...allPosts, { title: inputValue, body: bodyValue }]);
  }

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
        // <form className='new-post-form' onSubmit={handleSubmit}>
        <PostTitle inputValue={inputValue} handleInputChange={handleInputChange} />
      )}
      <PostBody bodyValue={bodyValue} handleBodyChange={handleBodyChange}/>
      <PostSubmission 
      bodyValue={bodyValue} handleBodyChange={handleBodyChange}
      inputValue={inputValue} handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default NewPost;

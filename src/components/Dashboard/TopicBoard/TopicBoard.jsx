import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicBoard.css';
import TopicMenu from '../TopicMenu/TopicMenu';
import PostMenu from '../PostMenu/PostMenu';
import NewPost from '../NewPost/NewPost';
import ForumDropdown from '../ForumDropdown/ForumDropdown';



const TopicBoard = () => {
  const { user } = useContext(UserContext);
  const [showNewPost, setShowNewPost] = useState(false);
  const newPostRef = useRef(null);

  // Sample data for available forums
  const availableForums = ['Forum 1', 'Forum 2', 'Forum 3', 'Forum 4'];

  const handleClickOutside = (event) => {
    if (newPostRef.current && !newPostRef.current.contains(event.target)) {
      setShowNewPost(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setShowNewPost(true);
  };

  return (
    <div id="dash-container">
      <main id="dash-body">
        <div id="topic-board">
          <div className="image-container">
            <img alt="" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div id="topic-info">
            <h1 id="topic-board-title">Topic-title</h1>
            <div className="buttons-container">
              <button className="follow-button">followers: ___</button>
              {!showNewPost && (
                <button onClick={handleButtonClick} className="new-post-button">
                  create a post
                </button>
              )}
            </div>
            {showNewPost && (
              <div ref={newPostRef}>
                <NewPost />
              </div>
            )}
          </div>
        </div>
        <TopicMenu />
        {/* <PostMenu /> */}
      </main>
    </div>
  );
};

export default TopicBoard;

import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicBoard.css';
import TopicMenu from '../TopicMenu/TopicMenu';
import PostMenu from '../ViewPost/PostMenu';
import NewPost from '../NewPost/NewPost/NewPost';
import { useParams } from 'react-router-dom';

const TopicBoard = () => {
  const { topicId } = useParams();
  const { user } = useContext(UserContext);
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicData, setTopicData] = useState({
    title: "Mock Topic Title",
    imageUrl: "https://via.placeholder.com/150",
    followers: 123,
  });
  const newPostRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newPostRef.current && !newPostRef.current.contains(event.target)) {
        setShowNewPost(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setShowNewPost(true);
  };

  const handleTopicSelect = (topicId) => {
    setSelectedTopic(topicId);
  };

  return (
    <div id="dash-container">
      <main id="dash-body">
        <div id="topic-board">
          <div className="image-container">
            <img src={topicData.imageUrl} alt="" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div id="topic-info">
            <h1 id="topic-board-title">{topicData.title}</h1>
            <div className="buttons-container">
              <button className="follow-button">followers: {topicData.followers}</button>
              {!showNewPost && (
                <button onClick={handleButtonClick} className="new-post-button">
                  create a post
                </button>
              )}
            </div>
            {showNewPost && (
              <div ref={newPostRef}>
                <NewPost topicId={topicId} />
              </div>
            )}
          </div>
        </div>
        {selectedTopic ? <PostMenu topicId={selectedTopic} /> : <TopicMenu onTopicSelect={handleTopicSelect} />}
      </main>
    </div>
  );
};

export default TopicBoard;

import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicBoard.css';
import TopicMenu from '../TopicMenu/TopicMenu';
import PostMenu from '../ViewPost/PostMenu';
import NewPost from '../NewPost/NewPost/NewPost';
import ForumDropdown from '../NewPost/ForumDropdown/ForumDropdown';
import { useParams } from 'react-router-dom';

const TopicBoard = () => {
  const { topicId } = useParams();
  const { user } = useContext(UserContext);
  const [showNewPost, setShowNewPost] = useState(false);
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const newPostRef = useRef(null);

  useEffect(() => {
    const fetchTopicData = async () => {
      try {
        setLoading(true);
        // Replace this with your actual API call
        const response = await fetch(`/api/topics/${topicId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch topic data');
        }
        const data = await response.json();
        setTopicData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [topicId]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (newPostRef.current && !newPostRef.current.contains(event.target)) {
      setShowNewPost(false);
    }
  };

  const handleButtonClick = () => {
    setShowNewPost(true);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
        <TopicMenu topicId={topicId} />
        <PostMenu topicId={topicId} />
      </main>
    </div>
  );
};

export default TopicBoard;

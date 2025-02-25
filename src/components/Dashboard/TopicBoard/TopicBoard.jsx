import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicBoard.css';
import TopicMenu from '../PostMenu/PostMenu';
import ViewPost from '../ViewPost/ViewPost';
import NewPost from '../NewPost/NewPost/NewPost';
import PostSubmission from '../NewPost/PostSubmission/PostSubmission';
import { useParams } from 'react-router-dom';

const TopicBoard = () => {
  const { topicId } = useParams();
  const { user } = useContext(UserContext);
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTopicName, setSelectedTopicName] = useState(null);
  const [topicData, setTopicData] = useState({
    title: 'Mock Topic Title',
    imageUrl: 'https://via.placeholder.com/150',
    followers: 123,
  });
  const [posts, setPosts] = useState([]);
  const newPostRef = useRef(null);

  // Define hotTopics here to share with NewPost
  const hotTopics = [
    { id: 'ai', name: 'AI and Machine Learning' },
    { id: 'web', name: 'Web Development' },
    { id: 'mobile', name: 'Mobile App Development' },
    { id: 'data', name: 'Data Science' },
    { id: 'cloud', name: 'Cloud Computing' },
    { id: 'security', name: 'Cybersecurity' },
    { id: 'iot', name: 'Internet of Things' },
    { id: 'blockchain', name: 'Blockchain' },
  ];

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

  const handleTopicSelect = (id, name, isPost = false) => {
    if (isPost) {
      setSelectedPost(id);
    } else {
      setSelectedTopic(id);
      setSelectedPost(null);
      setSelectedTopicName(name);
      setTopicData((prevData) => ({
        ...prevData,
        title: name || 'Mock Topic Title',
      }));
    }
  };

  const handleNewPostSubmit = (postData) => {
    const newPost = {
      ...postData,
      id: Date.now().toString(),
      username: user?.username || 'Anonymous',
    };
    setPosts((prevPosts) => [...prevPosts, newPost]);
    setShowNewPost(false);
  };

  return (
    <div id="dash-container">
      <main id="dash-body">
        <div id="topic-board">
          <div className="image-container">
            <img
              src={topicData.imageUrl}
              alt=""
              onError={(e) => (e.target.style.display = 'none')}
            />
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
                <NewPost
                  topicId={selectedTopic || topicId}
                  selectedTopicName={selectedTopicName}
                  availableTopics={hotTopics} // Pass the topics list
                  onSubmit={handleNewPostSubmit}
                />
              </div>
            )}
          </div>
        </div>
        {selectedPost ? (
          <ViewPost
            topicId={selectedTopic}
            topicName={selectedTopicName}
            postId={selectedPost}
            post={posts.find((p) => p.id === selectedPost)}
            submitButton={PostSubmission}
            onTopicSelect={handleTopicSelect}
          />
        ) : (
          <TopicMenu
            onTopicSelect={handleTopicSelect}
            submitButton={PostSubmission}
            posts={posts}
            topicName={selectedTopicName}
            selectedTopic={selectedTopic}
          />
        )}
      </main>
    </div>
  );
};

export default TopicBoard;
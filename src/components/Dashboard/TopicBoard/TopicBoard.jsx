import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicBoard.css';
import PostMenu from '../PostMenu/PostMenu';
import ViewPost from '../ViewPost/ViewPost';
import NewPost from '../NewPost/NewPost/NewPost';
import NewForum from '../NewForum/NewForum';
import PostSubmission from '../NewPost/PostSubmission/PostSubmission';
import { useParams } from 'react-router-dom';

const TopicBoard = ({ onCreateForum }) => {
  console.log('onCreateForum type:', typeof onCreateForum); // Should log "function"
  const { topicId } = useParams();
  const { user } = useContext(UserContext);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewForum, setShowNewForum] = useState(false);
  const [forumList, setForumList] = useState([]);
  const [editingForum, setEditingForum] = useState(null);
  const newForumRef = useRef(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedTopicName, setSelectedTopicName] = useState(null);
  const [topicData, setTopicData] = useState({
    title: 'Home Dashboard',
    imageUrl: 'https://via.placeholder.com/150',
    followers: 'unknown',
  });
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const newPostRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newPostRef.current && !newPostRef.current.contains(event.target)) {
        setShowNewPost(false);
        setEditingPost(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = () => {
    setShowNewPost(true);
    setEditingPost(null);
  };

  const handleForumButtonClick = () => {
    setShowNewForum(true);
    setEditingForum(null);
  };

  const handleTopicSelect = (id, name, action = false) => {
    if (action === true) {
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
    if (editingPost) {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === editingPost.id ? { ...post, ...postData } : post
        )
      );
    } else {
      const newPost = {
        ...postData,
        id: Date.now().toString(),
        username: user?.username || 'Anonymous',
      };
      setPosts((prevPosts) => [...prevPosts, newPost]);
    }
    setShowNewPost(false);
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    setSelectedPost(null);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowNewPost(true);
  };

  const handleNewForumSubmit = async (forumData) => {
    try {
      if (editingForum) {
        setForumList((prevForums) =>
          prevForums.map((forum) =>
            forum.id === editingForum.id ? { ...forum, ...forumData } : forum
          )
        );
        setEditingForum(null);
      } else {
        const createdForum = await onCreateForum(forumData); // This should now work
        setForumList((prevForums) => [...prevForums, createdForum]);
      }
      setShowNewForum(false);
    } catch (error) {
      console.error('Error in forum submission:', error);
    }
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
              {!showNewForum && (
                <button onClick={handleForumButtonClick} className="new-forum-button">
                  create a forum
                </button>
              )}
            </div>
            {showNewForum && (
              <div ref={newForumRef}>
                <NewForum
                  onClose={() => setShowNewForum(false)}
                  onCreateForum={handleNewForumSubmit} // Pass the local handler
                />
              </div>
            )}
          </div>
          {showNewPost && (
            <div ref={newPostRef}>
              <NewPost
                topicId={selectedTopic || topicId}
                selectedTopicName={selectedTopicName}
                availableTopics={forumList}
                onSubmit={handleNewPostSubmit}
                editingPost={editingPost}
              />
            </div>
          )}
        </div>
        {selectedPost ? (
          <ViewPost
            topicId={selectedTopic}
            topicName={selectedTopicName}
            postId={selectedPost}
            post={posts.find((p) => p.id === selectedPost)}
            submitButton={PostSubmission}
            onTopicSelect={handleTopicSelect}
            forums={forumList}
          />
        ) : (
          <PostMenu
            onTopicSelect={handleTopicSelect}
            posts={posts}
            topicName={selectedTopicName}
            selectedTopic={selectedTopic}
            onDeletePost={handleDeletePost}
            onEditPost={handleEditPost}
            forums={forumList}
          />
        )}
      </main>
    </div>
  );
};

export default TopicBoard;
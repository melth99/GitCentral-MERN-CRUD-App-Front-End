// TopicBoard.jsx
import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicBoard.css';
import PostMenu from '../PostMenu/PostMenu';
import ViewPost from '../ViewPost/ViewPost';
import NewPost from '../NewPost/NewPost/NewPost';
import NewForum from '../NewForum/NewForum';
import PostSubmission from '../NewPost/PostSubmission/PostSubmission';
import { useParams } from 'react-router-dom';

const TopicBoard = () => {
  const { topicId } = useParams();
  const { user } = useContext(UserContext);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewForum, setShowNewForum] = useState(false);
  const [forumList, setForumList] = useState([]);
  const [editingForum, setEditingForum] = useState(null);
  const newForumRef = useRef(null);
  const [selectedTopic, setSelectedTopic] = useState(null); // Single source of truth for selected topic
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const newPostRef = useRef(null);

  // Fetch initial forums on mount
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch('http://localhost:3000/forums');
        if (!response.ok) throw new Error('Failed to fetch forums');
        const forums = await response.json();
        setForumList(forums);
        // If topicId is provided via URL, set initial selectedTopic
        if (topicId) {
          const initialTopic = forums.find((t) => t._id === topicId);
          if (initialTopic) setSelectedTopic(initialTopic);
        }
      } catch (error) {
        console.error('Error fetching forums:', error);
      }
    };
    fetchForums();
  }, [topicId]);

  // Handle clicks outside to close modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (newPostRef.current && !newPostRef.current.contains(event.target)) {
        setShowNewPost(false);
        setEditingPost(null);
      }
      if (newForumRef.current && !newForumRef.current.contains(event.target)) {
        setShowNewForum(false);
        setEditingForum(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
    if (action) {
      setSelectedPost(id);
    } else {
      const topic = forumList.find((t) => t._id === id) || { _id: id, name };
      setSelectedTopic(topic);
      setSelectedPost(null);
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
      setPosts((prevPosts) => [...prevPosts, { ...postData, id: Date.now() }]);
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

  const handleNewForumSubmit = (forumData) => {
    if (editingForum) {
      setForumList((prevForums) =>
        prevForums.map((forum) =>
          forum._id === editingForum._id ? { ...forum, ...forumData } : forum
        )
      );
    } else {
      setForumList((prevForums) => [...prevForums, forumData]);
    }
    setShowNewForum(false);
    setEditingForum(null);
  };

  return (
    <div id="dash-container">
      <main id="dash-body">
        <div id="topic-board">
          <div className="image-container">
            <img
              src={selectedTopic?.imageUrl || 'https://via.placeholder.com/150'}
              alt={selectedTopic?.name || 'Home Dashboard'}
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
          <div id="topic-info">
            <h1 id="topic-board-title">{selectedTopic?.name || 'Home Dashboard'}</h1>
            <div className="buttons-container">
              <button className="follow-button">
                followers: {selectedTopic?.followers || 'unknown'}
              </button>
              {!showNewPost && (
                <button onClick={handleButtonClick} className="new-post-button">
                  Create a Post
                </button>
              )}
              {!showNewForum && (
                <button onClick={handleForumButtonClick} className="new-forum-button">
                  Create a Forum
                </button>
              )}
            </div>
            {showNewForum && (
              <div ref={newForumRef}>
                <NewForum
                  onTopicSelect={handleTopicSelect}
                  onClose={() => setShowNewForum(false)}
                  onSubmit={handleNewForumSubmit}
                  editingForum={editingForum}
                />
              </div>
            )}
          </div>
          {showNewPost && (
            <div ref={newPostRef}>
              <NewPost
                topicId={selectedTopic?._id || topicId}
                selectedTopicName={selectedTopic?.name}
                availableTopics={forumList}
                onSubmit={handleNewPostSubmit}
                editingPost={editingPost}
              />
            </div>
          )}
        </div>
        {selectedPost ? (
          <ViewPost
            topicId={selectedTopic?._id}
            topicName={selectedTopic?.name}
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
            topicName={selectedTopic?.name}
            selectedTopic={selectedTopic?._id}
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
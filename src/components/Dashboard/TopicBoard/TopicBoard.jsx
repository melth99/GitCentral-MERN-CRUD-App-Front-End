import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './TopicBoard.css';
import PostMenu from '../PostMenu/PostMenu';
import ViewPost from '../ViewPost/ViewPost';
import NewPost from '../NewPost/NewPost/NewPost';
import NewForum from '../NewForum/NewForum';
import PostSubmission from '../NewPost/PostSubmission/PostSubmission';
import { useParams } from 'react-router-dom';
import * as postService from '../../../services/postService'; // Correct import path

const TopicBoard = () => {
  const { topicId } = useParams();
  const { user } = useContext(UserContext);
  const [showNewPost, setShowNewPost] = useState(false);
  const [showNewForum, setShowNewForum] = useState(false);
  const [forumList, setForumList] = useState([]);
  const [editingForum, setEditingForum] = useState(null);
  const newForumRef = useRef(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const newPostRef = useRef(null);

  // Fetch forums and posts on mount or when selectedTopic changes

  //forumService.create
  //forumService.update
  //set the state
  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch('http://localhost:3000/forums');
        if (!response.ok) throw new Error('Failed to fetch forums');
        const forums = await response.json();
        setForumList(forums);
        if (topicId) {
          const initialTopic = forums.find((t) => t._id === topicId);
          if (initialTopic) setSelectedTopic(initialTopic);
        }
      } catch (error) {
        console.error('Error fetching forums:', error);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/posts');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const allPosts = await response.json();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchForums();
    fetchPosts();
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

  const handleTopicSelect = (id, title, action = false) => {
    if (action) {
      setSelectedPost(id);
      setSelectedTopic(null);
    } else {
      const topic = forumList.find((t) => t._id === id) || { _id: id, title };
      setSelectedTopic(topic);
      setSelectedPost(null);
    }
  };

  const handleNewPostSubmit = (postData) => {
    setPosts((prevPosts) => {
      if (editingPost) {
        return prevPosts.map((post) =>
          post._id === editingPost._id ? { ...post, ...postData } : post
        );
      }
      return [...prevPosts, postData];
    });
    setShowNewPost(false);
    setEditingPost(null);
    setSelectedPost(postData._id); // Auto-select the new post
  };

  const handleDeletePost = async (postId) => {
    try{
    await postService.deletePost(postId); // Add deletePost function
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    setSelectedPost(null);
    }
    catch(error){
      console.error('Error deleting post:', error);
    }
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
              alt={selectedTopic?.title || 'Home Dashboard'}
              onError={(e) => (e.target.style.display = 'none')}
            />
          </div>
          <div id="topic-info">
            <h1 id="topic-board-title">{selectedTopic?.title || 'Home Dashboard'}</h1>
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
                selectedTopicName={selectedTopic?.title}
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
            topicName={selectedTopic?.title}
            postId={selectedPost}
            post={posts.find((p) => p._id === selectedPost)}
            submitButton={PostSubmission}
            onTopicSelect={handleTopicSelect}
            forums={forumList}
          />
        ) : (
          <PostMenu
            onTopicSelect={handleTopicSelect}
            posts={posts}
            topicName={selectedTopic?.title}
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
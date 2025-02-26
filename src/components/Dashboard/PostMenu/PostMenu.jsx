import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './PostMenu.css';
import ForumsList from '../ForumsList/ForumsList';

const PostMenu = ({ onTopicSelect, posts, topicName, selectedTopic, onDeletePost, onEditPost, forums }) => {
  const { user } = useContext(UserContext);

  const topicPosts = posts.filter((post) => post.topicId === selectedTopic);

  return (
    <div id="bottom-section">
      <ForumsList 
        onTopicSelect={onTopicSelect}
        forums={forums} // Pass forums to ForumsList
        forumName={topicName}
      />
      <div id="post-menu-container">
        <div id="post-menu-title">
          {topicName ? `Latest posts for "${topicName}"` : 'Select a topic to view discussions'}
        </div>
        <div id="post-menu-menu">
          {topicPosts.length > 0 ? (
            topicPosts.map((post) => (
              <div key={post.id} className="post-menu-tab">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onTopicSelect(post.id, post.title, true);
                  }}
                  className="post-menu-item"
                >
                  {post.title || 'Untitled Post'}
                </a>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onTopicSelect(post.id, post.username, true);
                  }}
                  className="post-menu-user"
                >
                  {post.username || 'Anonymous'}
                </a>
                <button
                  id="edit-button"
                  onClick={() => onEditPost(post)}
                >
                  Edit
                </button>
                <button
                  id="delete-button"
                  onClick={() => onDeletePost(post.id)}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <div className="post-menu-tab">
              <p>No posts available for this topic yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostMenu;
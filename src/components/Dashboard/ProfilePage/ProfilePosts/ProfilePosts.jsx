import React, { useState } from 'react';
import './ProfilePosts.css';
import { Link } from 'react-router-dom';

const ProfilePosts = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: 'Post 1' },
    { id: 2, title: 'Post 2' },
    { id: 3, title: 'Post 3' },
    { id: 4, title: 'Post 4' },
    { id: 5, title: 'Post 5' },
    { id: 6, title: 'Post 6' },
  ]);

  async function handleDeletePost(postId) {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${yourAuthToken}`
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete the post');
      }

      const data = await response.json();
      console.log(data);
      
      // Update state to remove the deleted post
      setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));

      alert('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post. Please try again.');
    }
  }

  return (
    <div id="my-posts-container">
      <div id="my-posts-title">My Posts</div>
      <div id="my-posts-menu">
        {posts.map(post => (
          <div key={post.id} className="my-posts-menu-tab">
            <a href="#" className="my-posts-menu-item">{post.title}</a>
            <div>
              <Link to={`/profile/posts/edit/${post.id}`} className="my-posts-menu-edit-button">
                Edit
              </Link>
              <button 
                onClick={() => handleDeletePost(post.id)} 
                className="my-posts-menu-delete-button"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;

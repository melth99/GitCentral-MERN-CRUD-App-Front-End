import React from 'react';
import './ProfilePosts.css';

const ProfilePosts = () => {
  return (
    <div id="my-posts-container">
      <div id="my-posts-title">My Posts</div>
      <div id="my-posts-menu">
        <div className="my-posts-menu-tab">
          <a href="#" className="my-posts-menu-item">Post 1</a>
          <div>
          <button className="my-posts-menu-edit-button">Edit</button>
          <button className="my-posts-menu-delete-button">Delete</button>
          </div>
        </div>
        <div className="my-posts-menu-tab">
          <a href="#" className="my-posts-menu-item">Post 1</a>
          <div>
          <button className="my-posts-menu-edit-button">Edit</button>
          <button className="my-posts-menu-delete-button">Delete</button>
          </div>
        </div>
        <div className="my-posts-menu-tab">
          <a href="#" className="my-posts-menu-item">Post 1</a>
          <div>
          <button className="my-posts-menu-edit-button">Edit</button>
          <button className="my-posts-menu-delete-button">Delete</button>
          </div>
        </div><div className="my-posts-menu-tab">
          <a href="#" className="my-posts-menu-item">Post 1</a>
          <div>
          <button className="my-posts-menu-edit-button">Edit</button>
          <button className="my-posts-menu-delete-button">Delete</button>
          </div>
        </div><div className="my-posts-menu-tab">
          <a href="#" className="my-posts-menu-item">Post 1</a>
          <div>
          <button className="my-posts-menu-edit-button">Edit</button>
          <button className="my-posts-menu-delete-button">Delete</button>
          </div>
        </div><div className="my-posts-menu-tab">
          <a href="#" className="my-posts-menu-item">Post 1</a>
          <div>
          <button className="my-posts-menu-edit-button">Edit</button>
          <button className="my-posts-menu-delete-button">Delete</button>
          </div>
        </div>
      </div>
    </div>
  ) }

  export default ProfilePosts;
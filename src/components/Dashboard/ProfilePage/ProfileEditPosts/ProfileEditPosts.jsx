import React from 'react';
import './ProfileEditPosts.css';

const ProfileEditPosts = ({ bodyValue, handleBodyChange }) => {
  return (
    <div id="my-posts-container">
      <div className="profile-post-body">
        <textarea
          value={bodyValue}
          onChange={handleBodyChange}
          className="profile-new-post-body"
          placeholder="Edit your post here..."
        />
      </div>
      <div className="my-posts-buttons-container">
        <button className="my-posts-menu-edit">Save Changes</button>
        <button className="my-posts-menu-cancel">Cancel Changes</button>
      </div>
    </div>
  );
};

export default ProfileEditPosts;

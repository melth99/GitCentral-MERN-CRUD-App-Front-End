import React from 'react';
import './ProfileHeader.css';
import ProfileNav from '../ProfileNav/ProfileNav';

const ProfileMain = () => {
  return (

<div id="profile-page-header">
      <div id="profile-page-image-container">
        <img src="https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg" alt="Somebody Lives Here" onError={(e) => (e.target.style.display = 'none')} />
      </div>
      <div id="profile-page-user-info">
        <div id="profile-page-username">Username: specific user</div>
      </div>
    </div>
  );
}

export default ProfileMain;
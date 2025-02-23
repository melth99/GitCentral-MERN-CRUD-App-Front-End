import React from 'react';
import './ProfileMain.css';
import ProfileNav from '../ProfileNav/ProfileNav';
import ProfileHeader from '../ProfileHeader/ProfileHeader';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
import ProfileEditPosts from '../ProfileEditPosts/ProfileEditPosts';

const ProfileMain = () => {
  return (

<div id="profile-page-container">
      <main id="profile-page-body">
      <ProfileHeader />
    <div id="profile-page-body">
      <ProfileNav />
      <ProfilePosts />
      {/* <ProfileEditPosts /> */}
    </div>
      </main>
    </div>
  );
}

export default ProfileMain;
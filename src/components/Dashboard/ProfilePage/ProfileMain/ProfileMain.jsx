import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
          <Routes>
            <Route path="posts" element={<ProfilePosts />} />
            <Route path="edit" element={<ProfileEditPosts />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default ProfileMain;

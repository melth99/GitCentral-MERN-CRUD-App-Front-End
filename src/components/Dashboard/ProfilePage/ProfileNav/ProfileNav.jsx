import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import './ProfileNav.css';
// import ProfileOverview from '../ProfileOverview/ProfileOverview';
import ProfilePosts from '../ProfilePosts/ProfilePosts';
// import ProfileSettings from '../ProfileSettings/ProfileSettings';

const ProfileNav = () => {
  return (
    <div className="profile-container">
      <div className="profile-nav">
        <Link to="/profile/overview" className="profile-nav-item">Overview</Link>
        <Link to="/profile/posts" className="profile-nav-item">Posts</Link>
        <Link to="/profile/settings" className="profile-nav-item">Settings</Link>
      </div>
      
      <div className="profile-content">
        <Routes>
          {/* <Route path="/overview" element={<ProfileOverview />} /> */}     
          {/* <Route path="/settings" element={<ProfileSettings />} /> */}
        </Routes>
      </div>
    </div>
  )
}

export default ProfileNav;

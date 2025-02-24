import React from 'react';
import { Link } from 'react-router-dom';
import './ProfileNav.css';

const ProfileNav = () => {
  return (
    <div className="profile-nav">
      <Link to="/profile/overview" className="profile-nav-item">Overview</Link>
      <Link to="/profile/posts" className="profile-nav-item">Posts</Link>
      <Link to="/profile/settings" className="profile-nav-item">Settings</Link>
    </div>
  )
}

export default ProfileNav;

import react from 'react';
import './ProfileNav.css';

const ProfileNav = () => { 
  return (
    <div className="profile-nav">
      <a href="#" className="profile-nav-item">Overview</a>
      <a href="#" className="profile-nav-item">Posts</a>
      <a href="#" className="profile-nav-item">Settings</a>
    </div>
  )
}

export default ProfileNav;
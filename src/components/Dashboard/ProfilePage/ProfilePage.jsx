import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './ProfilePage.css';
import ProfileMain from './ProfileMain/ProfileMain';

const ProfilePage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <div>Please sign in to view your profile.</div>;
  }

  return (
    <div className="profile-page">
      <ProfileMain />
    </div>
  );
};

export default ProfilePage;

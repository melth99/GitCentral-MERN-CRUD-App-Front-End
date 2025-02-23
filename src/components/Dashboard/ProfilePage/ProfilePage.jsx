import React, { useContext, useState, useRef, useEffect } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './ProfilePage.css'
import ProfileMain from './ProfileMain/ProfileMain';

const ProfilePage = () => {
  return ( 
    <>
    <ProfileMain />
    </>
  )
  }

  export default ProfilePage;

// src/App.jsx
import { useContext } from 'react';
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import ProfilePage from './components/Dashboard/ProfilePage/ProfilePage';
import TopicBoard from './components/Dashboard/TopicBoard/TopicBoard'; // Add this line

import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext)

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/topics/:topicId' element={<TopicBoard />} />
      </Routes> 
    </>
  );
};

export default App;

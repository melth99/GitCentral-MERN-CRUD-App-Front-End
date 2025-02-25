import { useContext, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router'
import NavBar from './components/NavBar/NavBar';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SignInForm from './components/SignInForm/SignInForm';
import Dashboard from './components/Dashboard/Dashboard/Dashboard';
import Landing from './components/Landing/Landing';
import ProfilePage from './components/Dashboard/ProfilePage/ProfilePage';
import TopicBoard from './components/Dashboard/TopicBoard/TopicBoard';
import { UserContext } from './contexts/UserContext';
import * as forumsService from '../services/forumsService'

const App = () => {
  const { user } = useContext(UserContext)
  const [forums, setForums] = useState([])

  useEffect(() => {
    async function fetchForums() {
      try {
        const data = await forumsService.index()
        console.log('fetch forum index!', data)
        setForums(data)
      } catch (err) {
        console.log(err)
      }
    }
    fetchForums()
  }, [])

  async function handleCreateForum(forumData) {
    try {
      const data = await forumsService.create(forumData)
      console.log('fetched forum CREATE/POST', data)
      setForums([...forums, data])
    } catch (err) {
      console.log(err)
    }
  }

  async function handleDeleteForum(forumIdToDelete) {
    try {
      const response = await forumsService.deleteForum(forumIdToDelete)
      if (response.err) {
        throw new Error(response.err)
      }
      const filteredForumsArray = forums.filter((forum) => forum._id !== forumIdToDelete)
      setForums(filteredForumsArray)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={user ? <Dashboard forums={forums} onCreateForum={handleCreateForum} onDeleteForum={handleDeleteForum} /> : <Landing />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path='/sign-in' element={<SignInForm />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/topics/:topicId' element={<TopicBoard />} />
        <Route path="/profile/*" element={<ProfilePage />} />
      </Routes>
    </>
  );
};

export default App;

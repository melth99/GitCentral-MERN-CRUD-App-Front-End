import { useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import * as userService from '../../../services/userService';
import './Dashboard.css';
import TopicBoard from '../TopicBoard/TopicBoard';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log('Fetched users:', fetchedUsers);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    
    if (user) fetchUsers();
  }, [user]); // Changed to depend on entire user object

  return (
    <div className="dashboard-container">
      {user && <h2>Welcome, {user.username}</h2>}
      <TopicBoard />
    </div>
  );
};

export default Dashboard;
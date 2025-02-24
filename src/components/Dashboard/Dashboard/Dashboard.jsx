// src/components/Dashboard/Dashboard.jsx

import { useEffect, useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import * as userService from '../../../services/userService';
import './Dashboard.css';
import TopicBoard from '../TopicBoard/TopicBoard';
import ProfilePage from '../ProfilePage/ProfilePage';

const Dashboard = () => {
  const { user } = useContext(UserContext);

  useEffect(() => {

    // THIS IS AN EXAMPLE OF AN API CALL 
    // AFTER YOU ARE LOGGED IN, PLEASE LOOK AT THE USERSERVICE
    // HEADERS FOR SENDING THE JWT TOKEN OVER


    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user.username]); // this useEffect is running when component loads, or when the value
  // of user changes

  return (
    <div>
    <TopicBoard />
    </div>
  );
};

export default Dashboard;


// If you want to implement endless scroll, see code below
// import { useEffect, useContext, useState } from 'react';
// import { UserContext } from '../../contexts/UserContext';
// import * as userService from '../../services/userService';
// import './Dashboard.css';

// const Dashboard = () => {
//   const { user } = useContext(UserContext);
//   const [items, setItems] = useState([]);
//   const [page, setPage] = useState(1);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const fetchedUsers = await userService.index(page);
//         setItems(prevItems => [...prevItems, ...fetchedUsers]);
//       } catch (err) {
//         console.log(err)
//       }
//     };
//     if (user) fetchUsers();
//   }, [user, page]);

//   useEffect(() => {
//     const handleScroll = (event) => {
//       const { scrollTop, scrollHeight, clientHeight } = event.target;
//       if (scrollTop + clientHeight >= scrollHeight - 5) {
//         setPage(prevPage => prevPage + 1);
//       }
//     };

//     const dashBody = document.getElementById('dash-body');
//     dashBody.addEventListener('scroll', handleScroll);
//     return () => dashBody.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <main id="dash-body">
//       <div id="topic-board">
//         <img src="https://via.placeholder.com/150" alt="" />
//         <h1>Games</h1>
//         <p>Your home for dev-dialogue</p>
//         <p>Topic Board</p>
//       </div>
//       <h1>Welcome, {user.username}</h1>
//       <p>
//         This is the dashboard page where you can see a list of all the users.
//       </p>
//       <div id="item-list">
//         {items.map((item, index) => (
//           <div key={index}>{item.name}</div>
//         ))}
//       </div>
//     </main>
//   );
// };

// export default Dashboard;


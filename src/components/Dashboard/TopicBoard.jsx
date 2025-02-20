import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './TopicBoard.css';

const TopicBoard = () => {
  const { user } = useContext(UserContext);

  return (
    <div id="dash-container">
      <main id="dash-body">
        <div id="topic-board">
          <div className="image-container">
            <img alt="" onError={(e) => e.target.style.display = 'none'} />
          </div>
          <div id="topic-info">
          <h1 id="topic-board-title">Games</h1>
          {/* //TODO: Follow button updates HOME page feed with suggested posts<br></br>
          //TODO: Also, if following, button will display "following, and change to the color green. <br></br>
          //TODO: If not following, button will display "follow" and change to the color blue. */}
          <div><button class="follow-button">followers: ___<img></img></button> # of followers</div>
          </div>
        </div>
        <h1>Welcome, {user.username}</h1>
        <p>
          This is the dashboard page where you can see a list of all the users.
        </p>
      </main>
    </div>
  );
};

export default TopicBoard;

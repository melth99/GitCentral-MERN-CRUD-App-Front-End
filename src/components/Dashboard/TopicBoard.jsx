import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './TopicBoard.css';
import TopicMenu from './TopicMenu';

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
          <h1 id="topic-board-title">Topic-title</h1>
          {/* //TODO: Follow button updates HOME page feed with suggested posts<br></br>
          //TODO: Also, if following, button will display "following, and change to the color green. <br></br>
          //TODO: If not following, button will display "follow" and change to the color blue. */}
          <div><button class="follow-button">followers: ___</button></div>
          </div>
        </div>
        <TopicMenu /> 
      </main>
    </div>
  );
};

export default TopicBoard;

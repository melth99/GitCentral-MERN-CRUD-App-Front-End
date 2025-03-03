import React from 'react';
import './ForumsList.css';

const ForumsList = ({ onTopicSelect, forums, forumName }) => {
  return (
    <div id="forums-list-container">
      <div id="forums-list-title-bar">
      <h2>Forums</h2>
        <div id="forums-search-bar">
          <input type="text" placeholder="Search Here" />
          <button>Click</button>
        </div>
      </div>
      {forums.length > 0 ? (
        <ul>
          {forums.map((forum) => (
            <li key={forum._id} className="forum-item">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onTopicSelect(forum._id, forum.title);
                }}
              >
                {forum.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No forums available yet.</p>
      )}
    </div>
  );
};

export default ForumsList;

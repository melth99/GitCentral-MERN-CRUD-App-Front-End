// ForumsList.jsx
import React from 'react';
import './ForumsList.css'; // Import the new CSS file

const ForumsList = ({ onTopicSelect, forums, forumName }) => {
  return (
    <div id="forums-list-container">
      <h2>Forums</h2>
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
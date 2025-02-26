import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext'; // Optional: Add styling if needed
import { useState } from 'react';

const ForumsList = ({ onTopicSelect, forums = [], forumName }) => {
  const { user } = useContext(UserContext);
  const [selectedForum, setSelectedForum] = useState(null);

  const handleTopicClick = (forumId, forumName) => {
    setSelectedForum(forumId);
    onTopicSelect(forumId, forumName);
  };

  return (
    <div id="forums-container">
      <div id="forums-title">
        {forumName ? `Forums for "${forumName}"` : 'Forums'}
      </div>
      <div id="forums-menu">
        {forums.length > 0 ? (
          forums.map((forum) => (
            <div key={forum.id} className="forums-menu-tab">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleTopicClick(forum.id, forum.name);
                }}
                className={`forums-menu-item ${
                  selectedForum === forum.id ? 'selected' : ''
                }`}
              >
                {forum.name || 'Untitled Forum'}
              </a>
              {user && (
                <div className="forum-actions">
                  {/* <button
                    className="edit-button"
                    onClick={() => onTopicSelect(forum.id, forum.name, 'edit')}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => onTopicSelect(forum.id, forum.name, 'delete')}
                  >
                    Delete
                  </button> */}
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="forums-menu-tab">
            <p>No forums available.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumsList;
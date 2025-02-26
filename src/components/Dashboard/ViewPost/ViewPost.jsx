import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './ViewPost.css';
import ForumsList from '../ForumsList/ForumsList';

const ViewPost = ({ topicId, topicName, postId, post, submitButton, onTopicSelect, forums }) => {
  const { user } = useContext(UserContext);

  return (
    <div id="bottom-section">
      <ForumsList 
        onTopicSelect={onTopicSelect}
        forums={forums} // Pass forums to ForumsList
        forumName={topicName}
      />
      <div id="viewpost-container">
        <div id="viewpost-title">{topicName}</div>
        <div id="viewpost-menu">
          <div id="viewpost-left-section">
            <div id="viewpost-content-backdrop">
              <div id="viewpost-content-main">
                <p>{post?.body || 'Post content for post ID: ' + postId}</p>
              </div>
            </div>
            <div id="viewpost-comments-backdrop">
              <div id="viewpost-comments-main">
                <p>Post comments here w/ enlarge feature</p>
              </div>
            </div>
          </div>
          <div id="viewpost-right-section">
            <div id="viewpost-image-backdrop">
              <div id="viewpost-image-main">
                <p>Dynamic image here w/ enlarge feature</p>
                <img alt="Post" />
              </div>
            </div>
            <div id="viewpost-extras-backdrop">
              <div id="viewpost-extras-main">
                <p>Post comments right here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewPost;
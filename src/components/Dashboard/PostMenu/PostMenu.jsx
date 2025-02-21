import React, { useContext } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import './PostMenu.css';

const PostMenu = () => {
  const { user } = useContext(UserContext);

  return (
    <div id="bottom-section">
      <div id="hot-topics-container">
        <div id="hot-topic-title">Hot Topics</div>
        <div id="hot-topic-menu">
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 1</a>
          </div>
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 2</a>
          </div>
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 3</a>
          </div>
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 4</a>
          </div>
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 5</a>
          </div>
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 6</a>
          </div>
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 7</a>
          </div>
          <div className="hot-topic-menu-tab">
            <a href="#" className="hot-topic-menu-item">Topic 8</a>
          </div>
        </div>
      </div>
      <div id="post-menu-container">
        <div id="post-menu-title">SPECIFIC Post title (Limit to 10 words?) | Author: _____</div>
        <div id="post-menu-menu">
          <div id="post-menu-left-section">
            <div id="post-content-backdrop">
              <div id="post-content-main">
                <p>Post content here</p>
              </div>
            </div>
            <div id="post-comments-backdrop">
              <div id="post-comments-main">
                <p>Post comments here w/ enlarge feature</p>
                </div>
            </div> 
          </div>
          <div id="post-menu-right-section">
            <div id="post-image-backdrop">   
             <div id="post-image-main">
             <p>Dynamic image here w/ enlarge feature</p>
              <img></img> 
              </div>
            </div>
            <div id="post-extras-backdrop">
            <div id="post-extras-main">
              <p>Post comments right here</p>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostMenu;

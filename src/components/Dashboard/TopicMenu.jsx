import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './TopicMenu.css';

const TopicMenu = () => {
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
      <div id="topic-menu-container">
        <div id="topic-menu-title">Topic Title</div>
        <div id="topic-menu-menu">
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 1</a>
            <a href="#" className="topic-menu-user">User 1</a>
          </div>
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 2</a>
            <a href="#" className="topic-menu-user">User 2</a>
          </div>
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 3</a>
            <a href="#" className="topic-menu-user">User 3</a>
          </div>
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 4</a>
            <a href="#" className="topic-menu-user">User 4</a>
          </div>
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 5</a>
            <a href="#" className="topic-menu-user">User 5</a>
          </div>
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 6</a>
            <a href="#" className="topic-menu-user">User 6</a>
          </div>
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 7</a>
            <a href="#" className="topic-menu-user">User 7</a>
          </div>
          <div className="topic-menu-tab">
            <a href="#" className="topic-menu-item">Topic 8</a>
            <a href="#" className="topic-menu-user">User 8</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicMenu;

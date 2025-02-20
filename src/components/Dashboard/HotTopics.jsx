import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './HotTopics.css';

const HotTopics = () => {
  const { user } = useContext(UserContext);

  return (
    <div id="hot-topics-container">
      <div id="hot-topic-title">Hot Topics</div>
      <div id="hot-topic-menu">Topic Board</div>
    </div>
  );
};

export default HotTopics

import React, { useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import './HotTopics.css';

const HotTopics = () => {
  const { user } = useContext(UserContext);

  return (
    <div id="HotTopics-container">
      <div>Hot Topics</div>
      <div>Topic Board</div>
    </div>
  );
};

export default HotTopics

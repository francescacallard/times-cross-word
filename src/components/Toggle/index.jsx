import React from 'react';
import { useApp } from '../../context/AppContext';
import './styles.css';

export const Toggle = () => {
  const { crosswordDataLoaded } = useApp();

  return (
    <div className='toggle-background'>
      <button 
        className={`answers-button ${crosswordDataLoaded ? 'enabled' : ''}`}
        disabled={!crosswordDataLoaded}
      >
        Answer
      </button>
      <button className='puzzle-button'>
        Puzzle
      </button>
    </div>
  );
};
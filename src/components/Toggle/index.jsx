import React from 'react';
import { useApp } from '../../context/AppContext';
import './styles.css';

export const Toggle = () => {
  const { crosswordDataLoaded, showPuzzle, togglePuzzleView } = useApp();

  const handleClick = (button) => {
    if (crosswordDataLoaded) {
      togglePuzzleView(button);
    }
  };

  return (
    <div className='toggle-background'>
      <button 
        className={`toggle-button answers-button ${crosswordDataLoaded ? 'enabled' : ''} ${!showPuzzle ? 'active' : ''}`}
        disabled={!crosswordDataLoaded}
        onClick={() => handleClick('answers')}
      >
        Answers
      </button>
      <button 
        className={`toggle-button puzzle-button ${crosswordDataLoaded ? 'enabled' : ''} ${showPuzzle ? 'active' : ''}`}
        disabled={!crosswordDataLoaded}
        onClick={() => handleClick('puzzle')}
      >
        Puzzle
      </button>
    </div>
  );
};
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import './styles.css';


export const Toggle = ({ onToggle }) => {
  const { crosswordDataLoaded } = useApp();
  const [activeButton, setActiveButton] = useState('answers');

  const handleClick = (button) => {
    if (crosswordDataLoaded) {
      setActiveButton(button);
      onToggle(button);

    }
  };

  return (
    <div className='toggle-background'>
      <button 
        className={`toggle-button answers-button ${crosswordDataLoaded ? 'enabled' : ''} ${activeButton === 'answers' ? 'active' : ''}`}
        disabled={!crosswordDataLoaded}
        onClick={() => handleClick('answers')}
      >
        Answers
      </button>
      <button 
        className={`toggle-button puzzle-button ${crosswordDataLoaded ? 'enabled' : ''} ${activeButton === 'puzzle' ? 'active' : ''}`}
        disabled={!crosswordDataLoaded}
        onClick={() => handleClick('puzzle')}
      >
        Puzzle
      </button>
    </div>
  );
};
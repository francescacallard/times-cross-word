import React, { useState } from 'react';
import ArrowDisabled from '../../assets/arrowDisabled.svg';
import Arrow from '../../assets/arrow.svg';
import './styles.css';

export const CluesAi = ({ clues }) => {
  const [acrossExpanded, setAcrossExpanded] = useState(false);
  const [downExpanded, setDownExpanded] = useState(false);

  if (!clues) {
    return <div>No clues available</div>;
  }

  const cluesList = clues.trim().split('\n');
  const acrossClues = cluesList.filter(clue => clue.includes('across:'));
  const downClues = cluesList.filter(clue => clue.includes('down:'));

  const toggleSection = (section) => {
    if (section === 'across') {
      setAcrossExpanded(!acrossExpanded);
    } else {
      setDownExpanded(!downExpanded);
    }
  };

  const renderClues = (clueList) => {
    return clueList.map((clue, index) => {
      const match = clue.match(/(\d+)\. \((\d+),(\d+)\) (across|down): (.+)/);
      if (match) {
        const [, number, , , , clueText] = match;
        return (
          <li key={index}>
            <strong>{number}.</strong> {clueText}
          </li>
        );
      }
      return null;
    });
  };

  return (
    <div className='clues-list-container'>
      <h3 className='clues-list-title'>Clues</h3>
      
      <div className='clues-list-scrollable'>
        <div className='clues-list-section'>
          <div 
            onClick={() => toggleSection('across')} 
            className={`clues-list-header ${acrossExpanded ? 'expanded' : ''}`}
          >
            <span>Across</span>
            <img 
              src={acrossExpanded ? ArrowDisabled : Arrow} 
              alt={acrossExpanded ? 'arrow disabled' : 'arrow'} 
              className="arrow-icon"
            />
          </div>
          <div className={`clues-list-content ${acrossExpanded ? 'expanded' : ''}`}>
            <ul>
              {renderClues(acrossClues)}
            </ul>
          </div>
        </div>

        <div className='clues-list-section'>
          <div 
            onClick={() => toggleSection('down')} 
            className={`clues-list-header ${downExpanded ? 'expanded' : ''}`}
          >
            <span>Down</span>
            <img 
              src={downExpanded ? ArrowDisabled : Arrow} 
              alt={downExpanded ? 'arrow disabled' : 'arrow'} 
              className="arrow-icon"
            />
          </div>
          <div className={`clues-list-content ${downExpanded ? 'expanded' : ''}`}>
            <ul>
              {renderClues(downClues)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
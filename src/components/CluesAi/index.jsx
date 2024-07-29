import React, { useState, useEffect } from 'react';
import ArrowDisabled from '../../assets/arrowDisabled.svg';
import Arrow from '../../assets/arrow.svg';
import './styles.css';

export const CluesAi = ({ clues }) => {
  const [acrossExpanded, setAcrossExpanded] = useState(true);
  const [downExpanded, setDownExpanded] = useState(true);
  const [acrossClues, setAcrossClues] = useState([]);
  const [downClues, setDownClues] = useState([]);

  useEffect(() => {
    if (clues && clues.length > 0) {
      const cluesList = clues.trim().split('\n');
      setAcrossClues(cluesList.filter(clue => clue.includes('across:')));
      setDownClues(cluesList.filter(clue => clue.includes('down:')));
    } else {
      setAcrossClues([]);
      setDownClues([]);
    }
  }, [clues]);

  const toggleSection = (section) => {
    if (section === 'across') {
      setAcrossExpanded(!acrossExpanded);
    } else {
      setDownExpanded(!downExpanded);
    }
  };

  const renderClue = (clue) => {
    const match = clue.match(/(\d+)\. \((\d+),(\d+)\) (across|down): (.+)/);
    if (match) {
      const [, number, , , , clueText] = match;
      return (
        <div className="clue-item">
          <span className="clue-number">{number}</span>
          <span className="clue-text">{clueText}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='clues-list-container'>
      <h3 className='clues-list-title'>Clues</h3>
      
      <div className='clues-list-section'>
        <div onClick={() => toggleSection('across')} className={`clues-list-header ${acrossExpanded ? 'expanded' : ''}`}>
          <span>Across</span>
          <img 
            src={acrossExpanded ? Arrow : ArrowDisabled}
            alt={acrossExpanded ? 'Expanded arrow' : 'Collapsed arrow'}
            className={`arrow-icon ${acrossExpanded ? 'expanded' : ''}`}
          />
        </div>
        {acrossExpanded && (
          <div>
            {acrossClues.map((clue, index) => (
              <React.Fragment key={index}>
                {renderClue(clue)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>

      <div className='clues-list-section'>
        <div onClick={() => toggleSection('down')} className={`clues-list-header ${downExpanded ? 'expanded' : ''}`}>
          <span>Down</span>
          <img 
            src={downExpanded ? Arrow : ArrowDisabled}
            alt={downExpanded ? 'Expanded arrow' : 'Collapsed arrow'}
            className={`arrow-icon ${downExpanded ? 'expanded' : ''}`}
          />
        </div>
        {downExpanded && (
          <div>
            {downClues.map((clue, index) => (
              <React.Fragment key={index}>
                {renderClue(clue)}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
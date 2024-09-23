import React, { useState, useEffect } from 'react';
import { useApp } from 'context/AppContext';
import ArrowDisabled from '../../assets/arrowDisabled.svg';
import Arrow from '../../assets/arrow.svg';
import './styles.css';

export const CluesAi = () => {
  const { selectedWordId, setSelectedWordId, puzzleData } = useApp();
  const [acrossExpanded, setAcrossExpanded] = useState(true);
  const [downExpanded, setDownExpanded] = useState(true);
  const [acrossClues, setAcrossClues] = useState([]);
  const [downClues, setDownClues] = useState([]);

  useEffect(() => {
    if (puzzleData && puzzleData.entriesInfo && Array.isArray(puzzleData.entriesInfo)) {
      const across = [];
      const down = [];

      puzzleData.entriesInfo.forEach(([, entry]) => {
        if (entry.wordUsedAcross && entry.hintAcross) {
          across.push({
            number: entry.entryNum,
            direction: 'across',
            clueText: entry.hintAcross,
            word: entry.wordUsedAcross
          });
        }
        if (entry.wordUsedDown && entry.hintDown) {
          down.push({
            number: entry.entryNum,
            direction: 'down',
            clueText: entry.hintDown,
            word: entry.wordUsedDown
          });
        }
      });

      setAcrossClues(across.sort((a, b) => a.number - b.number));
      setDownClues(down.sort((a, b) => a.number - b.number));
    } else {
      setAcrossClues([]);
      setDownClues([]);
    }
  }, [puzzleData]);

  const toggleSection = (section) => {
    if (section === 'across') {
      setAcrossExpanded(!acrossExpanded);
    } else {
      setDownExpanded(!downExpanded);
    }
  };

  const handleClueClick = (clueId) => {
    setSelectedWordId(clueId === selectedWordId ? null : clueId);
  };

  const renderClue = (clue) => {
    const clueId = `${clue.direction}-${clue.number}`;
    return (
      <div 
        key={clueId}
        className={`clue-item ${selectedWordId === clueId ? 'highlighted' : ''}`}
        onClick={() => handleClueClick(clueId)}
      >
        <span className="clue-number">{clue.number}</span>
        <span className="clue-text">{clue.clueText}</span>
      </div>
    );
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
            {acrossClues.map(renderClue)}
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
            {downClues.map(renderClue)}
          </div>
        )}
      </div>
    </div>
  );
};
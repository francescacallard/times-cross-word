import React, { useState, useEffect } from 'react';
import { useApp } from 'context/AppContext';
import ArrowDisabled from '../../assets/arrowDisabled.svg';
import Arrow from '../../assets/arrow.svg';
import './styles.css';

export const WordList = ({ list }) => {
  const { showPuzzle } = useApp();
  const [acrossExpanded, setAcrossExpanded] = useState(false);
  const [downExpanded, setDownExpanded] = useState(false);
  const [acrossWords, setAcrossWords] = useState([]);
  const [downWords, setDownWords] = useState([]);

  useEffect(() => {
    if (list && list.length > 0) {
      const words = Array.isArray(list) ? list : list.trim().split('\n');
      const midpoint = Math.ceil(words.length / 2);
      setAcrossWords(words.slice(0, midpoint));
      setDownWords(words.slice(midpoint));
    } else {
      setAcrossWords([]);
      setDownWords([]);
    }
  }, [list]);

  useEffect(() => {
    if (showPuzzle) {
      // Collapse sections when switching to puzzle mode
      setAcrossExpanded(false);
      setDownExpanded(false);
    } else {
      // Expand sections when switching to answer mode
      setAcrossExpanded(true);
      setDownExpanded(true);
    }
  }, [showPuzzle]);

  const toggleSection = (section) => {
    if (!showPuzzle) {
      if (section === 'across') {
        setAcrossExpanded(!acrossExpanded);
      } else {
        setDownExpanded(!downExpanded);
      }
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='word-list-container'>
      <h3 className='word-list-title'>Word list</h3>
      
      <div className='word-list-section'>
        <div onClick={() => toggleSection('across')} className='word-list-header'>
          <span>Across</span>
          <img 
            src={acrossExpanded ? Arrow : ArrowDisabled}
            alt={acrossExpanded ? 'Expanded arrow' : 'Collapsed arrow'}
            className={`arrow-icon ${acrossExpanded ? 'expanded' : ''}`}
          />
        </div>
        {acrossExpanded && !showPuzzle && (
          <div>
            {acrossWords.map((word, index) => (
              <div key={index} className="word-item">
                <span className="word-number">{index + 1}</span>
                <span className="word-text">{capitalizeFirstLetter(word.trim())}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className='word-list-section'>
        <div onClick={() => toggleSection('down')} className='word-list-header'>
          <span>Down</span>
          <img 
            src={downExpanded ? Arrow : ArrowDisabled}
            alt={downExpanded ? 'Expanded arrow' : 'Collapsed arrow'}
            className={`arrow-icon ${downExpanded ? 'expanded' : ''}`}
          />
        </div>
        {downExpanded && !showPuzzle && (
          <div>
            {downWords.map((word, index) => (
              <div key={index} className="word-item">
                <span className="word-number">{index + acrossWords.length + 1}</span>
                <span className="word-text">{capitalizeFirstLetter(word.trim())}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
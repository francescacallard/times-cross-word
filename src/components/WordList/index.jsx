import React, { useState } from 'react';
import ArrowDisabled from '../../assets/arrowDisabled.svg';
import Arrow from '../../assets/arrow.svg';
import './styles.css';

export const WordList = ({ list }) => {
  const [acrossExpanded, setAcrossExpanded] = useState(false);
  const [downExpanded, setDownExpanded] = useState(false);

  if (!list) {
    return <div>No crossword words available</div>;
  }

  const words = Array.isArray(list) ? list : list.trim().split('\n');
  const midpoint = Math.ceil(words.length / 2);
  const acrossWords = words.slice(0, midpoint);
  const downWords = words.slice(midpoint);

  const toggleSection = (section) => {
    if (section === 'across') {
      setAcrossExpanded(!acrossExpanded);
    } else {
      setDownExpanded(!downExpanded);
    }
  };

  return (
    <div className='word-list-container'>
      <h3 className='word-list-title'>Word list</h3>
      
      <div className='word-list-scrollable'>
        <div className='word-list-section'>
          <div 
            onClick={() => toggleSection('across')} 
            className={`word-list-header ${acrossExpanded ? 'expanded' : ''}`}
          >
            <span>Across</span>
            <img 
              src={acrossExpanded ? ArrowDisabled : Arrow} 
              alt={acrossExpanded ? 'arrow disabled' : 'arrow'} 
              className="arrow-icon"
            />
          </div>
          <div className={`word-list-content ${acrossExpanded ? 'expanded' : ''}`}>
            <ul>
              {acrossWords.map((word, index) => (
                <li key={index}>
                  <strong>{index + 1}.</strong> {word.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='word-list-section'>
          <div 
            onClick={() => toggleSection('down')} 
            className={`word-list-header ${downExpanded ? 'expanded' : ''}`}
          >
            <span>Down</span>
            <img 
              src={downExpanded ? ArrowDisabled : Arrow} 
              alt={downExpanded ? 'arrow disabled' : 'arrow'} 
              className="arrow-icon"
            />
          </div>
          <div className={`word-list-content ${downExpanded ? 'expanded' : ''}`}>
            <ul>
              {downWords.map((word, index) => (
                <li key={index}>
                  <strong>{index + midpoint + 1}.</strong> {word.trim()}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
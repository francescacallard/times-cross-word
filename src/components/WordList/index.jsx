import React, { useState, useEffect } from 'react';
import Arrow from '../../assets/arrow.svg';
import './styles.css';

export const WordList = ({ list }) => {
  const [acrossExpanded, setAcrossExpanded] = useState(true);
  const [downExpanded, setDownExpanded] = useState(true);
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

  const toggleSection = (section) => {
    if (section === 'across') {
      setAcrossExpanded(!acrossExpanded);
    } else {
      setDownExpanded(!downExpanded);
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div className='word-list-container'>
      <h3 className='word-list-title'>Word list</h3>
      
      <div className='word-list-section'>
        <div onClick={() => toggleSection('across')} className={`word-list-header ${acrossExpanded ? 'expanded' : ''}`}>
          <span>Across</span>
          <img src={Arrow} alt='Arrow' className="arrow-icon" />
        </div>
        {acrossExpanded && (
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
        <div onClick={() => toggleSection('down')} className={`word-list-header ${downExpanded ? 'expanded' : ''}`}>
          <span>Down</span>
          <img src={Arrow} alt='Arrow' className="arrow-icon" />
        </div>
        {downExpanded && (
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
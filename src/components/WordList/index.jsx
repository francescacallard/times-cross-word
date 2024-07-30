import React, { useState, useEffect } from 'react';
import { useApp } from 'context/AppContext';
import ArrowDisabled from '../../assets/arrowDisabled.svg';
import Arrow from '../../assets/arrow.svg';
import './styles.css';

export const WordList = () => {
  const { showPuzzle, crosswordData, selectedWordId, setSelectedWordId } = useApp();
  const [acrossExpanded, setAcrossExpanded] = useState(false);
  const [downExpanded, setDownExpanded] = useState(false);
  const [acrossWords, setAcrossWords] = useState([]);
  const [downWords, setDownWords] = useState([]);

  useEffect(() => {
    if (crosswordData && crosswordData.words && crosswordData.words.length > 0) {
      const acrossWords = crosswordData.words
        .filter(item => item.orientation === 'across')
        .sort((a, b) => a.number - b.number);
      const downWords = crosswordData.words
        .filter(item => item.orientation === 'down')
        .sort((a, b) => a.number - b.number);
      setAcrossWords(acrossWords);
      setDownWords(downWords);
    } else {
      setAcrossWords([]);
      setDownWords([]);
    }
  }, [crosswordData]);

  useEffect(() => {
    if (showPuzzle) {
      setAcrossExpanded(false);
      setDownExpanded(false);
    } else {
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

  const handleWordClick = (word) => {
    const wordId = `${word.orientation}-${word.number}`;
    setSelectedWordId(wordId === selectedWordId ? null : wordId);
  };

  const renderWordItem = (word) => {
    const wordId = `${word.orientation}-${word.number}`;
    return (
      <div 
        key={word.id} 
        className={`word-item ${selectedWordId === wordId ? 'highlighted' : ''}`}
        onClick={() => handleWordClick(word)}
      >
        <span className="word-number">{word.number}</span>
        <span className="word-text">{capitalizeFirstLetter(word.word.trim())}</span>
      </div>
    );
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
            {acrossWords.map(renderWordItem)}
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
            {downWords.map(renderWordItem)}
          </div>
        )}
      </div>
    </div>
  );
};
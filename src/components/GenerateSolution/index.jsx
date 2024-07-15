import React, { useState, useEffect } from 'react';
import './styles.css';
import { useApp } from '../../context/AppContext';
import crosswordDataCorrect from './constants';
import { Crossword } from '../Crossword';

export const GenerateSolution = () => {
  const { setRandomList, setCrosswordData, setError, clues, setClues, showCrossword, setShowCrossword } = useApp();

  const generateCrossword = () => {
    // Process the crossword data
    const acrossClues = [];
    const downClues = [];
    let acrossNumber = 1;
    let downNumber = 1;

    crosswordDataCorrect.entries.forEach((entry) => {
      const clueObject = {
        number: entry.direction === 'across' ? acrossNumber++ : downNumber++,
        clue: entry.clue,
        length: entry.length,
      };

      if (entry.direction === 'across') {
        acrossClues.push(clueObject);
      } else {
        downClues.push(clueObject);
      }
    });

    setClues({ across: acrossClues, down: downClues });
    setCrosswordData(crosswordDataCorrect);
    setRandomList(crosswordDataCorrect.entries);
    setShowCrossword(true);
  };

  return (
    <div className='generate-solution-container'>
      <button className='generate-solution-button' onClick={generateCrossword}>
        Generate Crossword
      </button>
      
      {showCrossword && (
        <>
          <div className={`crossword-container ${showCrossword ? 'show' : ''}`}>
            <Crossword />
          </div>
          
          <div className={`solution-container ${showCrossword ? 'show' : ''}`}>
            <div className='solution-column'>
              <h3>Across</h3>
              {clues.across.map((item) => (
                <div key={`across-${item.number}`} className='solution-item'>
                  {item.number}. {item.clue} ({item.length})
                </div>
              ))}
            </div>
            <div className='solution-column'>
              <h3>Down</h3>
              {clues.down.map((item) => (
                <div key={`down-${item.number}`} className='solution-item'>
                  {item.number}. {item.clue} ({item.length})
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
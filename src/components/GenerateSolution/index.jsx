import React, { useState, useEffect } from 'react';
import './styles.css';
import { useApp } from '../../context/AppContext';
import crosswordDataCorrect from './constants';
import { Crossword } from '../Crossword';
import { GenerateCrossword } from 'components/GenerateCrossword';

export const GenerateSolution = () => {
  const { 
    setRandomList, 
    setCrosswordData,
    cluesSolution, 
    setCluesSolution, 
    showCrosswordSolution, 
    setShowCrosswordSolution 
  } = useApp();

  const [solutionLoaded, setSolutionLoaded] = useState(false);

  const generateCrossword = () => {
    // Process the crossword data
    const acrossClues = [];
    const downClues = [];

    crosswordDataCorrect.entries.forEach((entry) => {
      const clueObject = {
        number: entry.number, 
        clue: entry.clue,
        length: entry.length,
      };

      if (entry.direction === 'across') {
        acrossClues.push(clueObject);
      } else {
        downClues.push(clueObject);
      }
    });

    acrossClues.sort((a, b) => a.number - b.number);
    downClues.sort((a, b) => a.number - b.number);

    setCluesSolution({ across: acrossClues, down: downClues });
    setCrosswordData(crosswordDataCorrect);
    setRandomList(crosswordDataCorrect.entries);
    setShowCrosswordSolution(true);
    setSolutionLoaded(true);
  };

  useEffect(() => {
    setShowCrosswordSolution(false);
    setSolutionLoaded(false);
  
    return () => {
      setShowCrosswordSolution(false);
      setSolutionLoaded(false);
    };
  }, []);

  return (
    <div className='generate-solution-container'>
      <button className='generate-solution-button' onClick={generateCrossword}>
        Generate Solution
      </button>
      
      {showCrosswordSolution && (
        <>
          <div className={`crossword-container ${showCrosswordSolution ? 'show' : ''}`}>
            <Crossword />
          </div>
          
          <div className={`solution-container ${showCrosswordSolution ? 'show' : ''}`}>
            <div className='solution-column'>
              <h3>Across</h3>
              {cluesSolution.across.map((item) => (
                <div key={`across-${item.number}`} className='solution-item'>
                  {item.number}. {item.clue} ({item.length})
                </div>
              ))}
            </div>
            <div className='solution-column'>
              <h3>Down</h3>
              {cluesSolution.down.map((item) => (
                <div key={`down-${item.number}`} className='solution-item'>
                  {item.number}. {item.clue} ({item.length})
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {solutionLoaded && <GenerateCrossword />}
    </div>
  );
};
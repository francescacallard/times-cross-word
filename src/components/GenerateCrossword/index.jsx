import React, { useState } from 'react';
import crosswordDataCorrect from '../GenerateSolution/constants';
import './styles.css';
import { useApp } from '../../context/AppContext';

export const GenerateCrossword = () => {
  const { crosswordGrid, setCrosswordGrid, clues, setClues, showCrossword, setShowCrossword, correctLetters, setCorrectLetters, correctWords, setCorrectWords, checkMode, setCheckMode } = useApp(); 

  const handleGenerateCrossword = () => {
    const gridSize = 13;
    const newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill({ letter: '', number: null, isActive: false }));
    const acrossClues = [];
    const downClues = [];

    crosswordDataCorrect.entries.forEach(entry => {
      const { word, direction, position, clue, number } = entry;
      const { x, y } = position;

      if (direction === 'across') {
        acrossClues.push({ number, clue });
        for (let i = 0; i < word.length; i++) {
          newGrid[y][x + i] = { letter: '', number: i === 0 ? number : null, isActive: true };
        }
      } else if (direction === 'down') {
        downClues.push({ number, clue });
        for (let i = 0; i < word.length; i++) {
          newGrid[y + i][x] = { letter: '', number: i === 0 ? number : null, isActive: true };
        }
      }
    });

    acrossClues.sort((a, b) => a.number - b.number);
    downClues.sort((a, b) => a.number - b.number);

    setCrosswordGrid(newGrid);
    setClues({ across: acrossClues, down: downClues });
    setShowCrossword(true);
  };

  const handleCellChange = (rowIndex, colIndex, value) => {
    const newGrid = [...crosswordGrid];
    if (newGrid[rowIndex][colIndex].isActive) {
    newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], letter: value.toUpperCase() };
    setCrosswordGrid(newGrid);
    

    const correctWord = crosswordDataCorrect.entries.find(entry => {
      const { word, direction, position } = entry
      const { x, y } = position
      if (direction === 'across' && y === rowIndex && x <= colIndex && x + word.length > colIndex) {
        return word[colIndex - x] === value.toUpperCase()
      } if ( direction === 'down' && x === colIndex && y <= rowIndex && y + word.length > rowIndex) {
        return word[rowIndex - y] === value.toUpperCase()
      } 
      return false
    })

    if (correctWord) {
      setCorrectLetters(prev => new Set(prev).add(`${rowIndex}-${colIndex}`))
      checkWord(correctWord)
    } else {
      setCorrectLetters(prev => {
        const newSet = new Set(prev)
        newSet.delete(`${rowIndex}-${colIndex}`)
        return newSet
      })
    }
  }
  };

  const checkWord = (entry) => {
    const {word, direction, position} = entry
    const { x, y } = position
    const isCorrect = word.split('').every((letter, index) => {
      if (direction === 'across') {
        return crosswordGrid[y][x + index].letter === letter
      } else {
        return crosswordGrid[y + index][x].letter === letter
      }
    })

    if (isCorrect) {
      setCorrectWords(prev => new Set(prev).add(word))
    } else {
      setCorrectWords(prev => {
        const newSet = new Set(prev)
        newSet.delete(word)
        return newSet
      })
    }
  }

  
  return (
    <div className='generate-crossword-container'>
      <button className='generate-crossword-button' onClick={handleGenerateCrossword}>
        Generate Crossword
      </button>
      {showCrossword && (
        <div className='crossword-puzzle'>
          <div className='crossword-grid'>
            {crosswordGrid.map((row, rowIndex) => (
              <div key={rowIndex} className='grid-row'>
                {row.map((cell, colIndex) => (
                <div 
                  key={`${rowIndex}-${colIndex}`} 
                  className={`grid-cell ${!cell.isActive ? 'inactive-cell' : ''} ${(checkMode && correctLetters.has(`${rowIndex}-${colIndex}`)) ? 'correct-letter' : ''}`}
                >
                  {cell.isActive ? (
                    <>
                      {cell.number && <span className='cell-number'>{cell.number}</span>}
                      <input
                        type='text'
                        maxLength='1'
                        value={cell.letter}
                        onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                        className={`cell-input ${(checkMode && correctLetters.has(`${rowIndex}-${colIndex}`)) ? 'correct-letter' : ''}`}
                      />
                    </>
                  ) : null}
                </div>
              ))}
              </div>
            ))}
          </div>
          <div className='clues-container'>
            <div className='clues-column'>
              <h3>Across</h3>
              {clues.across.map(clue => (
                <div 
                key={`across-${clue.number}`} 
                className={`clue ${correctWords.has(crosswordDataCorrect.entries.find(e => e.number === clue.number && e.direction === 'across').word) ? 'completed-word' : ''}`}
              >
                {clue.number}. {clue.clue}
              </div>
              ))}
            </div>
            <div className='clues-column'>
              <h3>Down</h3>
              {clues.down.map(clue => (
                <div 
                key={`down-${clue.number}`} 
                className={`clue ${correctWords.has(crosswordDataCorrect.entries.find(e => e.number === clue.number && e.direction === 'down').word) ? 'completed-word' : ''}`}
              >
                {clue.number}. {clue.clue}
              </div>
              ))}
            </div>
            
          </div>
          <button className='check-letter-button' onClick={() => setCheckMode(!checkMode)}>{checkMode ? 'Hide Correct Letters' : 'Check Letters'}</button>
        </div>
      )}
    </div>
  );
};
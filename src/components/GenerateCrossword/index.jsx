import React, { useState } from 'react';
import crosswordDataCorrect from '../GenerateSolution/constants';
import './styles.css';
import { useApp } from '../../context/AppContext';
import { GenerateSolution } from 'components/GenerateSolution';

export const GenerateCrossword = () => {
  const { crosswordGrid, setCrosswordGrid, clues, setClues, showCrossword, setShowCrossword } = useApp(); 

  const handleGenerateCrossword = () => {
    const gridSize = 13;
    const newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill({ letter: '', number: null }));
    const acrossClues = [];
    const downClues = [];

    crosswordDataCorrect.entries.forEach(entry => {
      const { word, direction, position, clue, number } = entry;
      const { x, y } = position;

      if (direction === 'across') {
        acrossClues.push({ number, clue });
        for (let i = 0; i < word.length; i++) {
          newGrid[y][x + i] = { letter: '', number: i === 0 ? number : null };
        }
      } else if (direction === 'down') {
        downClues.push({ number, clue });
        for (let i = 0; i < word.length; i++) {
          newGrid[y + i][x] = { letter: '', number: i === 0 ? number : null };
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
    newGrid[rowIndex][colIndex] = { ...newGrid[rowIndex][colIndex], letter: value.toUpperCase() };
    setCrosswordGrid(newGrid);
  };

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
                  <div key={`${rowIndex}-${colIndex}`} className='grid-cell'>
                    {cell.number && <span className='cell-number'>{cell.number}</span>}
                    <input
                      type='text'
                      maxLength='1'
                      value={cell.letter}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      className='cell-input'
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className='clues-container'>
            <div className='clues-column'>
              <h3>Across</h3>
              {clues.across.map(clue => (
                <div key={`across-${clue.number}`} className='clue'>
                  {clue.number}. {clue.clue}
                </div>
              ))}
            </div>
            <div className='clues-column'>
              <h3>Down</h3>
              {clues.down.map(clue => (
                <div key={`down-${clue.number}`} className='clue'>
                  {clue.number}. {clue.clue}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
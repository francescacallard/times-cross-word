import React, { useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import './styles.css'

export const GenerateSolution = () => {
  const { randomList, grid, setGrid } = useApp()
  console.log("from solution", randomList)
  const gridSize = 15


  const handleGenerateCrossword = () => {
    generateCrossword();
  }

  const generateCrossword = () => {
    let newGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(' '));
    let placedWords = [];

    // Place the first word in the center
    const firstWord = randomList[0];
    const startCol = Math.floor((gridSize - firstWord.length) / 2);
    const startRow = Math.floor(gridSize / 2);
    for (let i = 0; i < firstWord.length; i++) {
      newGrid[startRow][startCol + i] = firstWord[i];
    }
    placedWords.push({ word: firstWord, row: startRow, col: startCol, horizontal: true });

    // Place remaining words
    for (let i = 1; i < randomList.length; i++) {
      const word = randomList[i];
      let placed = false;

      // Try to intersect with existing words
      for (let j = 0; j < placedWords.length && !placed; j++) {
        const existingWord = placedWords[j];
        placed = tryIntersect(word, existingWord, newGrid, placedWords);
      }

      // If not placed, try adjacent placement
      if (!placed) {
        for (let j = 0; j < placedWords.length && !placed; j++) {
          const existingWord = placedWords[j];
          placed = tryAdjacentPlacement(word, existingWord, newGrid, placedWords);
        }
      }

      if (!placed) {
        console.log(`Could not place word: ${word}`);
      }
    }

    setGrid(newGrid);
  };

  const tryIntersect = (word, existingWord, grid, placedWords) => {
    for (let i = 0; i < word.length; i++) {
      for (let j = 0; j < existingWord.word.length; j++) {
        if (word[i] === existingWord.word[j]) {
          if (existingWord.horizontal) {
            if (canPlaceWordVertically(word, existingWord.row - i, existingWord.col + j, grid)) {
              placeWordVertically(word, existingWord.row - i, existingWord.col + j, grid);
              placedWords.push({ word, row: existingWord.row - i, col: existingWord.col + j, horizontal: false });
              return true;
            }
          } else {
            if (canPlaceWordHorizontally(word, existingWord.row + j, existingWord.col - i, grid)) {
              placeWordHorizontally(word, existingWord.row + j, existingWord.col - i, grid);
              placedWords.push({ word, row: existingWord.row + j, col: existingWord.col - i, horizontal: true });
              return true;
            }
          }
        }
      }
    }
    return false;
  };

  const tryAdjacentPlacement = (word, existingWord, grid, placedWords) => {
    const directions = [
      { dr: -1, dc: 0, horizontal: false },
      { dr: 1, dc: 0, horizontal: false },
      { dr: 0, dc: -1, horizontal: true },
      { dr: 0, dc: 1, horizontal: true }
    ];

    for (let dir of directions) {
      let row = existingWord.row + dir.dr * (existingWord.horizontal ? 0 : existingWord.word.length);
      let col = existingWord.col + dir.dc * (existingWord.horizontal ? existingWord.word.length : 0);

      if (dir.horizontal) {
        if (canPlaceWordHorizontally(word, row, col, grid)) {
          placeWordHorizontally(word, row, col, grid);
          placedWords.push({ word, row, col, horizontal: true });
          return true;
        }
      } else {
        if (canPlaceWordVertically(word, row, col, grid)) {
          placeWordVertically(word, row, col, grid);
          placedWords.push({ word, row, col, horizontal: false });
          return true;
        }
      }
    }
    return false;
  };

  const canPlaceWordHorizontally = (word, row, col, grid) => {
    if (col < 0 || col + word.length > gridSize || row < 0 || row >= gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== ' ' && grid[row][col + i] !== word[i]) return false;
    }
    return true;
  };

  const canPlaceWordVertically = (word, row, col, grid) => {
    if (row < 0 || row + word.length > gridSize || col < 0 || col >= gridSize) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== ' ' && grid[row + i][col] !== word[i]) return false;
    }
    return true;
  };

  const placeWordHorizontally = (word, row, col, grid) => {
    for (let i = 0; i < word.length; i++) {
      grid[row][col + i] = word[i];
    }
  };

  const placeWordVertically = (word, row, col, grid) => {
    for (let i = 0; i < word.length; i++) {
      grid[row + i][col] = word[i];
    }
  };

  return (
    <div className="crossword-solution">
      <h2>Crossword Solution</h2>
      <button className='generate-crossword-button' onClick={handleGenerateCrossword}>Generate Crossword</button>
      <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, cellIndex) => (
            <div 
              key={cellIndex} 
              className={`cell ${cell === ' ' ? 'empty' : 'filled'}`}
            >
              {cell !== ' ' ? cell : null}
            </div>
          ))}
          </div>
        ))}
      </div>
    </div>
  );
};
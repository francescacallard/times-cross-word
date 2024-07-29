import React from 'react'
import './styles.css'

export const CrosswordGridAi = ({ solution, legend, selectedWord }) => {
  if (!solution) {
    return <div>No crossword data available</div>;
  }
  const rows = solution.trim().split('\n')

  const getWordCoordinates = (word) => {
    if (!legend || typeof legend !== 'string') return null;
    
    const clues = legend.split('\n');
    const clue = clues.find(c => c.toLowerCase().includes(word.toLowerCase()));
    if (clue) {
      const match = clue.match(/(\d+)\. \((\d+),(\d+)\) (across|down):/);
      if (match) {
        return {
          row: parseInt(match[3]) - 1,
          col: parseInt(match[2]) - 1,
          direction: match[4]
        };
      }
    }
    return null;
  };

  const isHighlighted = (rowIndex, cellIndex) => {
    if (!selectedWord) return false;
    const coords = getWordCoordinates(selectedWord);
    if (!coords) return false;

    if (coords.direction === 'across') {
      return rowIndex === coords.row && cellIndex >= coords.col && cellIndex < coords.col + selectedWord.length;
    } else {
      return cellIndex === coords.col && rowIndex >= coords.row && rowIndex < coords.row + selectedWord.length;
    }
  };

  return (
    <div className="crossword-grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="crossword-row">
          {row.trim().split(' ').filter(cell => cell !== '').map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`crossword-cell ${cell === '-' ? 'black' : 'white'} ${isHighlighted(rowIndex, cellIndex) ? 'highlighted' : ''}`}
            >
              {cell !== '-' ? cell.toUpperCase() : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
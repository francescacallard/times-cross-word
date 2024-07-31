import React from 'react'
import { useApp } from '../../context/AppContext';
import './styles.css'

export const CrosswordGridAi = () => {
  const { selectedWordId, crosswordData } = useApp();

  const solution = crosswordData?.solution;

  if (!solution) {
    return <div>No crossword data available</div>;
  }

  const rows = solution.trim().split('\n')
  const words = crosswordData?.words || [];

  const isHighlighted = (rowIndex, cellIndex) => {
    if (!selectedWordId) return false;

    const [orientation, number] = selectedWordId.split('-');
    const selectedWord = words.find(word => word.orientation === orientation && word.number === parseInt(number));

    if (!selectedWord) return false;

    const { x_coordinate, y_coordinate, letters } = selectedWord;

    if (orientation === 'across') {
      return rowIndex === y_coordinate - 1 && 
             cellIndex >= x_coordinate - 1 && 
             cellIndex < x_coordinate - 1 + letters;
    } else if (orientation === 'down') {
      return cellIndex === x_coordinate - 1 && 
             rowIndex >= y_coordinate - 1 && 
             rowIndex < y_coordinate - 1 + letters;
    }

    return false;
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
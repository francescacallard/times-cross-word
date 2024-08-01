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
    if (!selectedWordId) return { highlighted: false, isFirst: false };

    const [orientation, number] = selectedWordId.split('-');
    const selectedWord = words.find(word => word.orientation === orientation && word.number === parseInt(number));

    if (!selectedWord) return { highlighted: false, isFirst: false };

    const { x_coordinate, y_coordinate, letters } = selectedWord;

    if (orientation === 'across') {
      const highlighted = rowIndex === y_coordinate - 1 && 
             cellIndex >= x_coordinate - 1 && 
             cellIndex < x_coordinate - 1 + letters;
      const isFirst = highlighted && cellIndex === x_coordinate - 1;
      return { highlighted, isFirst };
    } else if (orientation === 'down') {
      const highlighted = cellIndex === x_coordinate - 1 && 
             rowIndex >= y_coordinate - 1 && 
             rowIndex < y_coordinate - 1 + letters;
      const isFirst = highlighted && rowIndex === y_coordinate - 1;
      return { highlighted, isFirst };
    }

    return { highlighted: false, isFirst: false };
  };

  return (
    <div className="crossword-grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="crossword-row">
          {row.trim().split(' ').filter(cell => cell !== '').map((cell, cellIndex) => {
            const { highlighted, isFirst } = isHighlighted(rowIndex, cellIndex);
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`crossword-cell ${cell === '-' ? 'black' : 'white'} ${highlighted ? 'highlighted' : ''} ${isFirst ? 'first-cell' : ''}`}
              >
                {cell !== '-' ? cell.toUpperCase() : ''}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
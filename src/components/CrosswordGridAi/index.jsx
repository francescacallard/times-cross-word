import React, { useEffect, useState } from 'react';
import { useClue } from 'context/ClueContext';
import './styles.css';

export const CrosswordGridAi = ({ solution }) => {
  const { selectedWord } = useClue();
  const [, setUpdate] = useState({});

  useEffect(() => {
    console.log('Selected word changed:', selectedWord);
    setUpdate({});
  }, [selectedWord]);

  if (!solution) {
    return <div>No crossword data available</div>;
  }

  const rows = solution.trim().split('\n');
  const flatSolution = solution.replace(/\s/g, '').toLowerCase();

  console.log('Flat solution:', flatSolution);

  const shouldHighlight = (rowIndex, cellIndex) => {
    if (!selectedWord) return false;
    
    const flatIndex = rowIndex * rows[0].trim().split(' ').length + cellIndex;
    const wordIndex = flatSolution.indexOf(selectedWord.toLowerCase());
    
    console.log(`Checking highlight for: ${rowIndex},${cellIndex}. Selected word: ${selectedWord}. Word index: ${wordIndex}, Flat index: ${flatIndex}`);
    
    if (wordIndex === -1) return false;

    const isHighlighted = flatIndex >= wordIndex && flatIndex < wordIndex + selectedWord.length;
    console.log('Is highlighted:', isHighlighted);
    
    return isHighlighted;
  };

  return (
    <div className="crossword-grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="crossword-row">
          {row.trim().split(' ').filter(cell => cell !== '').map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`crossword-cell ${cell === '-' ? 'black' : 'white'} ${shouldHighlight(rowIndex, cellIndex) ? 'highlighted' : ''}`}
            >
              {cell !== '-' ? cell.toUpperCase() : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
import React, { useState } from 'react'
import { useApp } from '../../context/AppContext'
import './styles.css'

export const GeneratePuzzle = () => {
  const { selectedWordId, crosswordData } = useApp();
  const [userInput, setUserInput] = useState('');

  if (!crosswordData.solution) {
    return <div>No crossword data available</div>;
  }

  const rows = crosswordData.solution.trim().split('\n')
  const words = crosswordData?.words || [];

  const wordStarts = crosswordData.legend.split('\n').reduce((acc, line) => {
    const match = line.match(/^(\d+)\. \((\d+),(\d+)\)/)
    if (match) {
      const [_, number, col, row] = match
      acc.push({ number: parseInt(number), row: parseInt(row) - 1, col: parseInt(col) - 1 })
    }
    return acc
  }, [])

  const numberGrid = Array(13).fill().map(() => Array(13).fill(null))
  wordStarts.forEach(({ number, row, col }) => {
    numberGrid[row][col] = number
  })

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

  const handleCellChange = (rowIndex, cellIndex, value) => {
    setUserInput(prev => ({
      ...prev,
      [`${rowIndex}-${cellIndex}`]: value.toUpperCase()
    }))
  }

  return (
    <div className="crossword-grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="crossword-row">
          {row.trim().split(' ').filter(cell => cell !== '').map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`crossword-cell-puzzle ${cell === '-' ? 'black' : 'white'} ${isHighlighted(rowIndex, cellIndex) ? 'highlighted' : ''}`}
            >
              {numberGrid[rowIndex][cellIndex] && (
                <span className="cell-number">{numberGrid[rowIndex][cellIndex]}</span>
              )}
              {cell !== '-' ? (
      <input
        type="text"
        maxLength="1"
        value={userInput[`${rowIndex}-${cellIndex}`] || ''}
        onChange={(e) => handleCellChange(rowIndex, cellIndex, e.target.value)}
        className="cell-input"
      />
    ) : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
import React from 'react'
import './styles.css'

export const CrosswordGridAi = ({ solution }) => {
  const rows = solution.trim().split('\n')

  return (
    <div className="crossword-grid">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="crossword-row">
          {row.trim().split(' ').filter(cell => cell !== '').map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`crossword-cell ${cell === '-' ? 'black' : 'white'}`}
            >
              {cell !== '-' ? cell.toUpperCase() : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
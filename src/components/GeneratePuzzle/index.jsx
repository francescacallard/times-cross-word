import React from 'react'
import './styles.css'

export const GeneratePuzzle = ({ solution, display }) => {
  const solutionRows = solution.trim().split('\n')
  const displayRows = display.trim().split('\n')

  return (
    <div className="crossword-grid">
      {solutionRows.map((row, rowIndex) => (
        <div key={rowIndex} className="crossword-row">
          {row.trim().split(' ').map((cell, cellIndex) => {
            const displayCell = displayRows[rowIndex].trim().split(' ')[cellIndex]
            return (
              <div
                key={`${rowIndex}-${cellIndex}`}
                className={`crossword-cell ${cell === '-' ? 'black' : 'white'}`}
              >
                {cell !== '-' && (
                  <>
                    {!isNaN(displayCell) && <span className="cell-number">{displayCell}</span>}
                    <input type="text" maxLength="1" />
                  </>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  );
};
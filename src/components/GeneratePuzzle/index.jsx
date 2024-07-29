import React from 'react'
import { useClue } from '../../context/ClueContext'
import './styles.css'

export const GeneratePuzzle = ({ solution, legend }) => {
  const { selectedClue, setSelectedClue } = useClue()
  if (!solution || !legend) {
    return null; // or return some loading indicator
  }

  const solutionRows = solution.trim().split('\n')
  
  // Parse the legend to get word start positions
  const wordStarts = legend.split('\n').reduce((acc, line) => {
    const match = line.match(/^(\d+)\. \((\d+),(\d+)\)/)
    if (match) {
      const [_, number, col, row] = match
      acc.push({ number: parseInt(number), row: parseInt(row) - 1, col: parseInt(col) - 1 })
    }
    return acc
  }, [])

  // Create a 13x13 grid for numbers
  const numberGrid = Array(13).fill().map(() => Array(13).fill(null))
  wordStarts.forEach(({ number, row, col }) => {
    numberGrid[row][col] = number
  })

  const shouldHighlight = (rowIndex, cellIndex) => {
    if (!selectedClue) return false;
    const match = selectedClue.match(/(\d+)\. \((\d+),(\d+)\) (across|down): (.+)/);  
    if (match) {
      const [, number, startCol, startRow, direction] = match;
      const startRowIndex = parseInt(startRow) - 1;
      const startCellIndex = parseInt(startCol) - 1;

      if (direction === 'across') {
        return rowIndex === startRowIndex && cellIndex >= startCellIndex;
      } else if (direction === 'down') {
        return cellIndex === startCellIndex && rowIndex >= startRowIndex;
      }
    }
    return false;
  };

  return (
    <div className="crossword-grid">
      {solutionRows.map((row, rowIndex) => (
        <div key={rowIndex} className="crossword-row">
          {row.trim().split(' ').map((cell, cellIndex) => (
            <div
              key={`${rowIndex}-${cellIndex}`}
              className={`crossword-cell ${cell === '-' ? 'black' : 'white'} ${shouldHighlight(rowIndex, cellIndex) ? 'highlighted' : ''}`}
            >
              {cell !== '-' && (
                <>
                  {numberGrid[rowIndex][cellIndex] && (
                    <span className="cell-number">{numberGrid[rowIndex][cellIndex]}</span>
                  )}
                  <input type="text" maxLength="1" />
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
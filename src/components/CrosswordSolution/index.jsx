import React, { useEffect } from 'react'
import crosswordDataCorrect from '../GenerateSolution/constants'
import { useApp } from '../../context/AppContext'
import './styles.css'

export const CrosswordSolution = () => {
  const { grid, setGrid, numbers, setNumbers } = useApp()
  const gridSize = 13

  useEffect(() => {
    // Initialize an empty grid
    const emptyGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(''))
    const numberGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(null))

    // Place words on the grid
    crosswordDataCorrect.entries.forEach(entry => {
      const { word, direction, position, number } = entry
      const { x, y } = position

      if (numberGrid[y][x] === null) {
        numberGrid[y][x] = number
      }

      for (let i = 0; i < word.length; i++) {
        if (direction === 'across') {
          emptyGrid[y][x + i] = word[i]
        } else if (direction === 'down') {
          emptyGrid[y + i][x] = word[i]
        }
      }
    })

    setGrid(emptyGrid)
    setNumbers(numberGrid)
  }, [])

  return (
    <div className="crossword-grid-solution">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="grid-row-solution">
          {row.map((cell, cellIndex) => (
            <div key={`${rowIndex}-${cellIndex}`} className="grid-cell-solution">
              {numbers[rowIndex][cellIndex] && (
                <span className='cell-number-solution'>{numbers[rowIndex][cellIndex]}</span>
              )}
              {cell}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}


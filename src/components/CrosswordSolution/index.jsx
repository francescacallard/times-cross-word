import React, { useEffect } from 'react'
import crosswordDataCorrect from '../GenerateSolution/constants'
import { useApp } from '../../context/AppContext'
import './styles.css'

export const CrosswordSolution = () => {
  const { grid, setGrid, numbers, setNumbers, editedWords } = useApp()
  const gridSize = 13

  useEffect(() => {
    if (!editedWords || editedWords.length === 0) {
      console.warn('No edited words provided to CrosswordSolution');
      return;
    }

    // Initialize an empty grid
    const emptyGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(''))
    const numberGrid = Array(gridSize).fill().map(() => Array(gridSize).fill(null))

    // Create a map of edited words for easy lookup
    const editedWordsMap = new Map(editedWords.map(word => [word.id, word]));

    // Place words on the grid
    crosswordDataCorrect.entries.forEach(entry => {
      const { direction, position, number } = entry
      const { x, y } = position

      // Get the edited word if it exists, otherwise use the original word
      const editedEntry = editedWordsMap.get(`${direction}-${number}-${crosswordDataCorrect.entries.indexOf(entry)}`) || entry;
      const word = editedEntry.word;

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
  }, [editedWords])

  if (!grid || grid.length === 0) {
    return <div>Loading crossword...</div>;
  }

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
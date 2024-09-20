import React, { useState, useEffect } from 'react'
import { useApp } from 'context/AppContext'
import styles from './styles.module.css'

export const EmptyCrossword = () => {
  const { puzzleData } = useApp()
  const [grid, setGrid] = useState([])
  const gridSize = 13

  useEffect(() => {
    console.log('`Checking the data`', puzzleData)
    const newGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill().map(() => ({ isLetter: false, number: null }))
    )

    puzzleData.forEach((entry) => {
      const { entryNum, startX, startY, across, down, wordUsedAcross, wordUsedDown } = entry

      if (typeof startX !== 'number' || typeof startY !== 'number' || 
          startX < 0 || startX >= gridSize || startY < 0 || startY >= gridSize) {
        return;
      }

      newGrid[startY][startX].number = entryNum;

      if (across && wordUsedAcross) {
        for (let i = 0; i < wordUsedAcross.length && (startX + i) < gridSize; i++) {
          newGrid[startY][startX + i].isLetter = true
        }
      }

      if (down && wordUsedDown) {
        for (let i = 0; i < wordUsedDown.length && (startY + i) < gridSize; i++) {
          newGrid[startY + i][startX].isLetter = true;
        }
      }
    })

    console.log('Final Grid', newGrid)
    setGrid(newGrid)
  }, [puzzleData])


  return (
    <div className={styles.crosswordContainer}>
      <table className={styles.crosswordTable}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`${styles.crosswordCell} ${cell.isLetter ? styles.crosswordCellWhite : styles.crosswordCellBlack}`}
                >
                  {cell.number && (
                    <span className={styles.cellNumber}>
                      {cell.number}
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
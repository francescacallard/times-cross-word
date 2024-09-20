import React, { useState, useEffect } from 'react'
import { useApp } from 'context/AppContext'
import styles from './styles.module.css'

const CrosswordFilled = () => {
  const { puzzleData } = useApp()
  const [grid, setGrid] = useState([])
  const gridSize = 13

  useEffect(() => {
    if (!puzzleData || !Array.isArray(puzzleData) || puzzleData.length === 0) {
      console.error('Invalid or empty puzzle data provided')
      return
    }

    const newGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill().map(() => ({ value: null, number: null }))
    )

    puzzleData.forEach((entry) => {
      const { entryNum, startX, startY, across, down, wordUsedAcross, wordUsedDown } = entry


      if (typeof startX !== 'number' || typeof startY !== 'number' || 
          startX < 0 || startX >= gridSize || startY < 0 || startY >= gridSize) {
        return
      }

      newGrid[startY][startX].number = entryNum;

      if (across && wordUsedAcross) {
        for (let i = 0; i < wordUsedAcross.length && (startX + i) < gridSize; i++) {
          newGrid[startY][startX + i].value = wordUsedAcross[i]
        }
      }

      if (down && wordUsedDown) {
        for (let i = 0; i < wordUsedDown.length && (startY + i) < gridSize; i++) {
          newGrid[startY + i][startX].value = wordUsedDown[i]
        }
      }
    })

    console.log('Final Grid', newGrid);
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
                  className={`${styles.crosswordCell} ${cell.value ? styles.crosswordCellWhite : styles.crosswordCellBlack}`}
                >
                  {cell.number && (
                    <span className={`${styles.cellNumber} ${!cell.value ? styles.cellNumberBlack : ''}`}>
                      {cell.number}
                    </span>
                  )}
                  {cell.value && (
                    <span className={styles.cellValue}>
                      {cell.value}
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

export default CrosswordFilled;
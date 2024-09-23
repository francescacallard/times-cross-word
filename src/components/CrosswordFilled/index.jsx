import React, { useState, useEffect } from 'react'
import { useApp } from 'context/AppContext'
import styles from './styles.module.css'

const CrosswordFilled = () => {
  const { puzzleData } = useApp()
  const [grid, setGrid] = useState([])
  const gridSize = 13

  useEffect(() => {
    if (!puzzleData || !puzzleData.grid || !Array.isArray(puzzleData.grid)) {
      console.error('Invalid or empty puzzle data provided')
      return
    }

    const newGrid = puzzleData.grid.map(row =>
      row.map(cell => ({
        value: cell.value === '*' ? null : cell.value,
        number: cell.entry_num,
        isHighlighted: cell.isHighlighted
      }))
    )

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
                  className={`${styles.crosswordCell} ${
                    cell.value ? styles.crosswordCellWhite : styles.crosswordCellBlack
                  } ${cell.isHighlighted ? styles.crosswordCellHighlighted : ''}`}
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
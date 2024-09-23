import React, { useState, useEffect } from 'react'
import { useApp } from 'context/AppContext'
import styles from './styles.module.css'

const CrosswordFilled = () => {
  const { puzzleData, selectedWordId } = useApp()
  const [grid, setGrid] = useState([])
  const gridSize = 13

  useEffect(() => {
    console.log('Selected Word ID from filled:', selectedWordId);
  }, [selectedWordId]);

  useEffect(() => {
    if (!puzzleData || !puzzleData.grid || !Array.isArray(puzzleData.grid)) {
      console.error('Invalid or empty puzzle data provided')
      return
    }

    const newGrid = puzzleData.grid.map((row, rowIndex) =>
      row.map((cell, colIndex) => ({
        value: cell.value === '*' ? null : cell.value,
        number: cell.entry_num,
        isHighlighted: cell.isHighlighted,
        wordIds: getWordIds(puzzleData.entriesInfo, rowIndex, colIndex)
      }))
    )

    console.log('Final Grid', newGrid);
    setGrid(newGrid)
  }, [puzzleData])

  const getWordIds = (entriesInfo, row, col) => {
    const wordIds = []
    entriesInfo.forEach(([, entry]) => {
      if (entry.wordUsedAcross && entry.entryStartRow === row && entry.entryStartCol <= col && col < entry.entryStartCol + entry.wordUsedAcross.length) {
        wordIds.push(`across-${entry.entryNum}`)
      }
      if (entry.wordUsedDown && entry.entryStartCol === col && entry.entryStartRow <= row && row < entry.entryStartRow + entry.wordUsedDown.length) {
        wordIds.push(`down-${entry.entryNum}`)
      }
    })
    return wordIds
  }

  const isCellHighlighted = (cell) => {
    return selectedWordId && cell.wordIds.includes(selectedWordId);
  }

  const isFirstLetterOfSelectedWord = (cell, rowIndex, colIndex) => {
    if (!selectedWordId || !cell.wordIds.includes(selectedWordId)) return false;
    
    const [direction, number] = selectedWordId.split('-');
    const entry = puzzleData.entriesInfo.find(([, e]) => e.entryNum === parseInt(number));
    
    if (entry) {
      const [, { entryStartRow, entryStartCol }] = entry;
      return rowIndex === entryStartRow && colIndex === entryStartCol;
    }
    
    return false;
  }

  return (
    <div className={styles.crosswordContainer}>
      <table className={styles.crosswordTable}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td
                  key={colIndex}
                  className={`
                    ${styles.crosswordCell} 
                    ${cell.value ? styles.crosswordCellWhite : styles.crosswordCellBlack}
                    ${isCellHighlighted(cell) ? styles.crosswordCellHighlighted : ''}
                    ${isFirstLetterOfSelectedWord(cell, rowIndex, colIndex) ? styles.crosswordCellFirstLetter : ''}
                  `}
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
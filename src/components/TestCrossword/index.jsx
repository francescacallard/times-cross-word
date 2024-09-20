import React, { useState, useEffect } from 'react';

const TestCrossword = ({ puzzleData }) => {
  const [grid, setGrid] = useState([]);
  const gridSize = 13;

  useEffect(() => {
    if (!puzzleData || !Array.isArray(puzzleData) || puzzleData.length === 0) {
      console.error('Invalid or empty puzzle data provided');
      return;
    }

    console.log('Puzzle Data:', puzzleData); // Debug log

    // Create an empty 13x13 grid
    const newGrid = Array(gridSize).fill().map(() => 
      Array(gridSize).fill().map(() => ({ value: null, number: null }))
    );

    // Populate the grid with the puzzle data
    puzzleData.forEach((entry) => {
      const { entryNum, startX, startY, across, down, wordUsedAcross, wordUsedDown } = entry;
      
      console.log('Processing entry:', entry); // Debug log

      if (typeof startX !== 'number' || typeof startY !== 'number' || 
          startX < 0 || startX >= gridSize || startY < 0 || startY >= gridSize) {
        console.warn(`Invalid startX or startY for entry ${entryNum}`);
        return;
      }

      // Place entry number
      newGrid[startY][startX].number = entryNum;

      // Place across word
      if (across && wordUsedAcross) {
        for (let i = 0; i < wordUsedAcross.length && (startX + i) < gridSize; i++) {
          newGrid[startY][startX + i].value = wordUsedAcross[i];
        }
      }

      // Place down word
      if (down && wordUsedDown) {
        for (let i = 0; i < wordUsedDown.length && (startY + i) < gridSize; i++) {
          newGrid[startY + i][startX].value = wordUsedDown[i];
        }
      }
    });

    console.log('Final Grid:', newGrid); // Debug log
    setGrid(newGrid);
  }, [puzzleData]);

  if (!grid.length) return <div>Loading...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>Crossword Puzzle</h2>
      <table style={{ borderCollapse: 'collapse' }}>
        <tbody>
          {grid.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, colIndex) => (
                <td 
                  key={colIndex} 
                  style={{
                    border: '1px solid red',
                    width: '30px',
                    height: '30px',
                    textAlign: 'center',
                    position: 'relative',
                    backgroundColor: cell.value ? 'white' : 'black'
                  }}
                >
                  {cell.number && (
                    <span style={{
                      position: 'absolute',
                      top: '1px',
                      left: '1px',
                      fontSize: '8px',
                      color: cell.value ? 'black' : 'red'
                    }}>
                      {cell.number}
                    </span>
                  )}
                  {cell.value && (
                    <span style={{ fontSize: '16px', color: 'black' }}>
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
  );
};

export default TestCrossword;
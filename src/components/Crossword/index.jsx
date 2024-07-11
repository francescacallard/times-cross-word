import React from 'react';
import './styles.css'; // You'll need to create this CSS file

export const Crossword = ({ data }) => {
  const { dimensions, entries } = data;

  // Create an empty grid
  const grid = Array(dimensions.rows).fill().map(() => Array(dimensions.cols).fill(null));

  // Fill the grid with entries
  entries.forEach(entry => {
    const { position, direction, length, solution } = entry;
    for (let i = 0; i < length; i++) {
      if (direction === 'across') {
        grid[position.y][position.x + i] = {
          letter: solution[i],
          number: i === 0 ? entry.humanNumber : null
        };
      } else {
        grid[position.y + i][position.x] = {
          letter: solution[i],
          number: i === 0 ? entry.humanNumber : null
        };
      }
    }
  });

  return (
    <div className="crossword">
      <div className="grid">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className={`cell ${cell ? 'filled' : 'empty'}`}>
                {cell && cell.number && <span className="number">{cell.number}</span>}
                {cell && <span className="letter">{cell.letter}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="clues">
        <div className="across">
          <h3>Across</h3>
          {entries.filter(entry => entry.direction === 'across').map(entry => (
            <p key={entry.id}>{entry.humanNumber}. {entry.clue}</p>
          ))}
        </div>
        <div className="down">
          <h3>Down</h3>
          {entries.filter(entry => entry.direction === 'down').map(entry => (
            <p key={entry.id}>{entry.humanNumber}. {entry.clue}</p>
          ))}
        </div>
      </div>
    </div>
  );
};


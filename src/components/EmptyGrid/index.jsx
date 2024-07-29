import React from 'react';
import './styles.css'; // You'll need to create this CSS file

export const EmptyGrid = () => {
  return (
    <div className='empty-grid-container'>
      {[...Array(13)].map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className='grid-row'>
          {[...Array(13)].map((_, colIndex) => (
            <div key={`cell-${rowIndex}-${colIndex}`} className='grid-cell'></div>
          ))}
        </div>
      ))}
    </div>
  );
};
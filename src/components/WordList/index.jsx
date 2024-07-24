import React from 'react'

export const WordList = ({ list }) => {
  if (!list) {
    return <div>No crossword words available</div>;
  }

  const words = list.trim().split('\n');

  return (
    <div className='word-list-container'>
      <h3>Word List</h3>
      <ul>
        {words.map((word, index) => (
          <li key={index}>{word.trim().toUpperCase()}</li>
        ))}
      </ul>
    </div>
  )
}
import React from 'react'
import './styles.css'

export const WordsPlaced = ({ crosswordData }) => {
  const wordsPlaced = crosswordData?.words_placed;

  return (
    <div className='words-placed-container'>
      <p className='words-placed-text'>
        Words Placed {' '}
        <span className='words-placed-number orange-text'>
          {wordsPlaced !== undefined ? wordsPlaced : '...'}
        </span>
        {' '}out of{' '}
        <span className='orange-text'>20</span>
      </p>
    </div>
  )
}
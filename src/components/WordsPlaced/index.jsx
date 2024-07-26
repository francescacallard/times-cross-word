import React from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'

export const WordsPlaced = () => {
  const { crosswordData } = useApp();

  return (
    <div className='words-placed-container'>
      <p className='words-placed-text'>
        Words Placed {' '}
        <span className='words-placed-number orange-text'>
          {crosswordData && crosswordData.words_placed !== undefined 
            ? crosswordData.words_placed 
            : '...'}
        </span>
        {' '}out of{' '}
        <span className='orange-text'>20</span>
      </p>
    </div>
  )
}
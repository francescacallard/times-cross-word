import React from 'react'
import './styles.css'
import Arrow from '../../assets/arrowDisabled.svg'

export const ExpandableWordList = () => {
  return (
    <div className='expandable-word-list-container'>
      <h2 className='expandable-word-list-title'>Word List</h2>
      <div className='expandable-word-list-across'>
       <h2 className='across-title-word-list'>Across</h2>
       <img src={Arrow} alt='Arrow'></img>
      </div>
      <div className='expandable-word-list-down'>
      <h2 className='down-title-word-list'>Down</h2>
      <img src={Arrow} alt='Arrow'></img>
      </div>
    </div>
  )
}


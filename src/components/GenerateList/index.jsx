import React from 'react'
import './styles.css'
import list from './constants'
import { useApp } from '../../context/AppContext'

export const GenerateList = () => {

  const { randomList, setRandomList } = useApp()

  function shuffleList(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 22);
}

const handleGenerateList = () => {
  const newRandomList = shuffleList(list)
  setRandomList(newRandomList)
  console.log(newRandomList)
}

  return (
    <div className='generate-list-container'>
      <button className='generate-list-button' onClick={handleGenerateList}>Generate List</button>
      <div className='list-container'>
        <div className='list-column'>
          {randomList.slice(0, 11).map((item, index) => (
            <div key={index} className='list-item'>
              {item}
            </div>
          ))}
        </div>
        <div className='list-column'>
        {randomList.slice(11).map((item, index) => (
          <div key={index} className='list-item'>
            {item}
          </div>
        ))}
        </div>
      </div>
    </div>
  )
}
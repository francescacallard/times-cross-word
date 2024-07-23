import React from 'react'
import './styles.css'

export const CluesAi = ( {legend} ) => {
  const acrossClues = []
  const downClues = []

  legend.split('\n').forEach(line => {
    const match = line.match(/^(\d+)\. \((\d+),(\d+)\) (\w+): (.+)$/)
    if (match) {
      const [_, number, col, row, direction, clue] = match
      const clueObject = { number, clue }
      if (direction === 'across') {
        acrossClues.push(clueObject)
      } else {
        downClues.push(clueObject)
      }
    }
  })

  return (
    <div className='clues-container'>
      <div className='clues-section'>
        <h3>Across</h3>
        {acrossClues.map(({ number, clue }) => (
          <p key={`across-${number}`}><strong>{number}.</strong>{clue}</p>
        ))}
      </div>
      <div className='clues-section'>
        <h3>Down</h3>
        {downClues.map(({ number, clue }) => (
          <p key={`down-${number}`}><strong>{number}.</strong>{clue}</p>
        ))} 
      </div>
    </div>
  )
}


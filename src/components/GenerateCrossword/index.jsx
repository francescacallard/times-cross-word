import React from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import { GenerateCrosswordButton } from 'components/GenerateCrosswordButton'
import { CrosswordGridAi } from 'components/CrosswordGridAi'
import { SaveButton } from 'components/SaveButton'
import { WordList } from 'components/WordList'

export const GenerateCrossword = () => {

  return (
    <div className='whole-page-container'>
      <div className='left-side-container'>
        <div className='crossword-title-container'>
          <GenerateCrosswordButton />
        </div>
        <div className='crossword-container'>
          {/* <CrosswordGridAi solution={crosswordData.solution}/> */}
          Crossword will go here
        </div>
        <div className='crossword-save-container'>
          <SaveButton />
        </div>
      </div>
        <div className='right-side-container'>
          <div className='word-list-container'>
            <WordList />
          </div>
          <div className='clues-container'>Clues will go here
            (CluesAI component)
          </div>
        </div>
    </div>
  )
}

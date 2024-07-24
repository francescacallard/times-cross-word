import React from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import { GenerateCrosswordButton } from 'components/GenerateCrosswordButton'
import { CrosswordGridAi } from 'components/CrosswordGridAi'
import { SaveButton } from 'components/SaveButton'
import { WordList } from 'components/WordList'
import { CluesAi } from 'components/CluesAi'

export const GenerateCrossword = () => {
  const { crosswordData } = useApp();
  console.log('crosswordData from crrrrrrooosssward): ', crosswordData);
    
  return (
    <div className='whole-page-container'>
      <div className='left-side-container'>
        <div className='crossword-title-container'>
          <GenerateCrosswordButton />
        </div>
        <div className='crossword-container'>
          {crosswordData && crosswordData.solution ? (
            <CrosswordGridAi solution={crosswordData.solution}/>
          ) : (
           ''
          )}
        </div>
        <div className='crossword-save-container'>
          <SaveButton />
        </div>
      </div>
      
      <div className='right-side-container'>
      <div className='word-list-container'>
          {crosswordData && crosswordData.word_bank ? (
            <WordList list={crosswordData.word_bank}/>
          ) : (
            ''
          )}
        </div>
                <div className='clues-container'>
          {crosswordData && crosswordData.legend ? (
            <CluesAi clues={crosswordData.legend}/>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
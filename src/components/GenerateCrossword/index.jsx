import React from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import { GenerateCrosswordButton } from 'components/GenerateCrosswordButton'
import { CrosswordGridAi } from 'components/CrosswordGridAi'
import { SaveButton } from 'components/SaveButton'
import { WordList } from 'components/WordList'
import { CluesAi } from 'components/CluesAi'
import { MenuTest } from 'components/MenuTest'
import { EmptyGrid } from 'components/EmptyGrid'
import { CrosswordTitle } from 'components/CrosswordTitle'

export const GenerateCrossword = () => {
  const { crosswordData } = useApp();
  console.log('crosswordData from crrrrrrooosssward): ', crosswordData);
    
  return (
    <div className='whole-page-container-title'>
      <CrosswordTitle />
      <div className='whole-page-container'>
      {/* <MenuTest /> */}
      <div className='left-side-container'>
        <div className='crossword-container'>
          {crosswordData && crosswordData.solution ? (
            <CrosswordGridAi solution={crosswordData.solution}/>
          ) : (
           <EmptyGrid />
          )}
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
    </div>
  )
}
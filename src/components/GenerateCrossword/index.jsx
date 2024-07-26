import React from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import { CrosswordGridAi } from 'components/CrosswordGridAi'
import { WordList } from 'components/WordList'
import { CluesAi } from 'components/CluesAi'
import { EmptyGrid } from 'components/EmptyGrid'
import { CrosswordTitle } from 'components/CrosswordTitle'
import { WordsPlaced } from 'components/WordsPlaced'

export const GenerateCrossword = () => {
  const { crosswordData } = useApp();
  console.log('crosswordData from crrrrrrooosssward): ', crosswordData);
    
  return (
    <div className='center-wrapper'>
      <div className='whole-app-container'>
        <div className='whole-page-container-title'>
          <CrosswordTitle />
          <div className='whole-page-container'>
            <div className='left-side-container'>
              <div className='crossword-container'>
                {crosswordData && crosswordData.solution ? (
                  <CrosswordGridAi solution={crosswordData.solution}/>
                ) : (
                  <EmptyGrid />
                )}
                <WordsPlaced /> 
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
      </div>
    </div>
  )
}
import React, { useState } from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import { CrosswordGridAi } from 'components/CrosswordGridAi'
import { WordList } from 'components/WordList'
import { CluesAi } from 'components/CluesAi'
import { EmptyGrid } from 'components/EmptyGrid'
import { CrosswordTitle } from 'components/CrosswordTitle'
import { WordsPlaced } from 'components/WordsPlaced'
import { GeneratePuzzle } from 'components/GeneratePuzzle'

export const GenerateCrossword = () => {
  const { crosswordData, showPuzzle, selectedWordId, setSelectedWordId } = useApp();


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
                  <>
                    {showPuzzle ? (
                      <GeneratePuzzle solution={crosswordData.solution} legend={crosswordData.legend} />
                    ) : (
                      <CrosswordGridAi solution={crosswordData.solution}/>
                    )}
                    <WordsPlaced />
                  </>
                ) : (
                  <EmptyGrid />
                )}
              </div>
            </div>
            <div className='right-side-container'>
              <div className='word-list-container'>
                <WordList word_orientation={crosswordData?.word_orientation || []} />
              </div>
              <div className='clues-container'>
                <CluesAi clues={crosswordData?.legend || []} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
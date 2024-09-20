import React from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import { CrosswordGridAi } from 'components/CrosswordGridAi'
import { WordList } from 'components/WordList'
import { CluesAi } from 'components/CluesAi'
import { EmptyGrid } from 'components/EmptyGrid'
import { CrosswordTitle } from 'components/CrosswordTitle'
import { WordsPlaced } from 'components/WordsPlaced'
import { GeneratePuzzle } from 'components/GeneratePuzzle'
import CrosswordFilled from 'components/CrosswordFilled'
import { EmptyCrossword } from 'components/EmptyCrossword'

export const GenerateCrossword = () => {
  const { crosswordData, showPuzzle } = useApp();

  return (
    <div className='center-wrapper'>
      <div className='whole-app-container'>
        <div className='whole-page-container-title'>
          <CrosswordTitle />
          <div className='whole-page-container'>
            <div className='left-side-container'>
              <div className='crossword-container'>
                {crosswordData && !crosswordData.solution ? (
                  <>
                    {showPuzzle ? (
                       <EmptyCrossword />
                    ) : (
                      <CrosswordFilled />
                    )}
                  </>
                ) : (
                  <EmptyGrid />
                )}
                <WordsPlaced crosswordData={crosswordData} />
              </div>
            </div>
            <div className='right-side-container'>
              <div className='word-list-container'>
                <WordList />
              </div>
              <div className='clues-container'>
                <CluesAi  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
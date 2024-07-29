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
  const { crosswordData, showPuzzle } = useApp();
  const [selectedWord, setSelectedWord] = useState(null)

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
                      <GeneratePuzzle solution={crosswordData.solution} legend={crosswordData.legend} selectedWord={selectedWord} />
                    ) : (
                      <CrosswordGridAi solution={crosswordData.solution} selectedWord={selectedWord} legend={crosswordData.legend}/>
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
                <WordList list={crosswordData?.word_bank || []} selectedWord={selectedWord} setSelectedWord={setSelectedWord} />
              </div>
              <div className='clues-container'>
                <CluesAi clues={crosswordData?.legend || []}  selectedWord={selectedWord} setSelectedWord={setSelectedWord}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
import React, { useState } from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import crosswordDataCorrect from 'components/GenerateSolution/constants'
import { GenerateSolution } from 'components/GenerateSolution'

export const GenerateList = () => {
 const { words, setWords, showList, setShowList } = useApp();
 const [listLoaded, setListLoaded] = useState(false);

  const generateList = () => {
    // Extract words from crosswordDataCorrect
    const extractedWords = crosswordDataCorrect.entries.map(entry => ({
      word: entry.word,
      clue: entry.clue,
      direction: entry.direction
    }));
    
    setWords(extractedWords);
    setShowList(true);
    setListLoaded(true);
  }

  return (
    <div className='generate-list-container'>
      <button className='generate-list-button' onClick={generateList}>
        Generate List
      </button>
      
      {showList && (
        <div className='word-list'>
          <div className='list-column'>
            <h3>Across</h3>
            {words.filter(word => word.direction === 'across').map((word, index) => (
              <div key={`across-${index}`} className='word-item'>
                {word.word}: {word.clue}
              </div>
            ))}
          </div>
          <div className='list-column'>
            <h3>Down</h3>
            {words.filter(word => word.direction === 'down').map((word, index) => (
              <div key={`down-${index}`} className='word-item'>
                {word.word}: {word.clue}
              </div>
            ))}
          </div>
        </div>
      )}
      {listLoaded && <GenerateSolution />}
    </div>
  )
}
import React, { useState } from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import crosswordDataCorrect from 'components/GenerateSolution/constants'
import { GenerateSolution } from 'components/GenerateSolution'

export const GenerateList = () => {
  const { words, setWords, showList, setShowList } = useApp();
  const [listLoaded, setListLoaded] = useState(false);

  const generateList = () => {
    const extractedWords = crosswordDataCorrect.entries.map((entry, index) => ({
      id: `${entry.direction}-${entry.number}-${index}`,
      word: entry.word,
      clue: entry.clue,
      direction: entry.direction,
      number: entry.number
    }));
    
    setWords(extractedWords);
    setShowList(true);
    setListLoaded(true);
  }

  const handleWordChange = (id, field, value) => {
    const updatedWords = words.map(word => 
      word.id === id ? { ...word, [field]: value } : word
    );
    setWords(updatedWords);
  }

  const renderWordList = (direction) => {
    return words
      .filter(word => word.direction === direction)
      .sort((a, b) => a.number - b.number)
      .map((word) => (
        <div key={word.id} className='word-item'>
          <span>{word.number}. </span>
          <input
            value={word.word}
            onChange={(e) => handleWordChange(word.id, 'word', e.target.value)}
          />
          :
          <input
            value={word.clue}
            onChange={(e) => handleWordChange(word.id, 'clue', e.target.value)}
          />
        </div>
      ));
  }

  return (
    <>
    <div className='generate-list-container'>
      <button className='generate-list-button' onClick={generateList}>
        Generate List
      </button>
      
      {showList && (
        <div className='word-list'>
          <div className='list-column'>
            <h3>Across</h3>
            {renderWordList('across')}
          </div>
          <div className='list-column'>
            <h3>Down</h3>
            {renderWordList('down')}
          </div>
        </div>
      )}
    </div>
    {listLoaded && <GenerateSolution />}
    </>
  )
}
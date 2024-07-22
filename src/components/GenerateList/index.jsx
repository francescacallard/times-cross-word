import React, { useEffect, useState } from 'react'
import './styles.css'
import { useApp } from 'context/AppContext'
import crosswordDataCorrect from 'components/GenerateSolution/constants'
import { GenerateSolution } from 'components/GenerateSolution'

export const GenerateList = () => {
  const { words, setWords, showList, setShowList, listLoaded, setListLoaded, editedWords, setEditedWords } = useApp();
  //won't know whats across or down so take it out
  //editable clues and rerunable

async function generateCrossword() {
  try {
    const response = await fetch ('http://localhost:7071/api/generate')
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return data.crossword
  } catch (error) {
    console.error('There was a problem with your fetch operation:', error)
  throw error
  }
}

  const generateList = () => {
    const extractedWords = crosswordDataCorrect.entries.map((entry, index) => ({
      id: `${entry.direction}-${entry.number}-${index}`,
      word: entry.word,
      direction: entry.direction,
      number: entry.number
    }));
    
    setWords(extractedWords);
    setEditedWords(extractedWords);
    setShowList(true);
    setListLoaded(true);
  }

  const handleWordChange = (id, field, value) => {
    const updatedWords = words.map(word => 
      word.id === id ? { ...word, [field]: value } : word
    );
    setWords(updatedWords);
    setEditedWords(updatedWords);
  }

  useEffect(() => {
    console.log('edited words', editedWords)
  }, [editedWords])

  const renderWordList = (direction) => {
    return words
      .filter(word => word.direction === direction)
      .sort((a, b) => a.number - b.number)
      .map((word) => (
        <div key={word.id} className='word-item'>
          <input className='word-input'
            value={word.word}
            onChange={(e) => handleWordChange(word.id, 'word', e.target.value)}
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
            {/* <h3>Across</h3> */}
            {renderWordList('across')}
          </div>
          <div className='list-column'>
            {/* <h3>Down</h3> */}
            {renderWordList('down')}
          </div>
        </div>
      )}
    </div>
    {listLoaded && <GenerateSolution />}
    </>
  )
}
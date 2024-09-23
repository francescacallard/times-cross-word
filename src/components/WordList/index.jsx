import React, { useState, useEffect } from 'react'
import { useApp } from 'context/AppContext'
import ArrowDisabled from '../../assets/arrowDisabled.svg'
import Arrow from '../../assets/arrow.svg'
import './styles.css'

export const WordList = () => {
  const { showPuzzle, puzzleData, selectedWordId, setSelectedWordId } = useApp()
  const [acrossExpanded, setAcrossExpanded] = useState(false)
  const [downExpanded, setDownExpanded] = useState(false)
  const [acrossWords, setAcrossWords] = useState([])
  const [downWords, setDownWords] = useState([])

  useEffect(() => {
    if (puzzleData && puzzleData.entriesInfo && Array.isArray(puzzleData.entriesInfo)) {
      const acrossWords = puzzleData.entriesInfo
        .filter(([, item]) => item.wordUsedAcross)
        .map(([, item]) => ({
          number: item.entryNum,
          word: item.wordUsedAcross,
          orientation: 'across',
        }))
        .sort((a, b) => a.number - b.number)

      const downWords = puzzleData.entriesInfo
        .filter(([, item]) => item.wordUsedDown)
        .map(([, item]) => ({
          number: item.entryNum,
          word: item.wordUsedDown,
          orientation: 'down',
        }))
        .sort((a, b) => a.number - b.number)

      setAcrossWords(acrossWords)
      setDownWords(downWords)
    } else {
      setAcrossWords([])
      setDownWords([])
    }
  }, [puzzleData])

  useEffect(() => {
    if (showPuzzle) {
      setAcrossExpanded(false)
      setDownExpanded(false)
    } else {
      setAcrossExpanded(true)
      setDownExpanded(true)
    }
  }, [showPuzzle])

  const toggleSection = (section) => {
    if (!showPuzzle) {
      if (section === 'across') {
        setAcrossExpanded(!acrossExpanded)
      } else {
        setDownExpanded(!downExpanded)
      }
    }
  }

  const formatWord = (string) => {
    if (string.length === 0) return ''
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  const handleWordClick = (word) => {
    const wordId = `${word.orientation}-${word.number}`
    setSelectedWordId(wordId === selectedWordId ? null : wordId)
  }

  const renderWordItem = (word) => {
    const wordId = `${word.orientation}-${word.number}`
    return (
      <div 
        key={wordId}
        className={`word-item ${selectedWordId === wordId ? 'highlighted' : ''}`}
        onClick={() => handleWordClick(word)}
      >
        <span className="word-number">{word.number}</span>
        <span className="word-text">{formatWord(word.word.trim())}</span>
        {word.hint && <span className="word-hint">{word.hint}</span>}
      </div>
    )
  }

  return (
    <div className='word-list-container'>
      <h3 className='word-list-title'>Word list</h3>
      
      <div className='word-list-section'>
        <div onClick={() => toggleSection('across')} className='word-list-header'>
          <span>Across</span>
          <img 
            src={acrossExpanded ? Arrow : ArrowDisabled}
            alt={acrossExpanded ? 'Expanded arrow' : 'Collapsed arrow'}
            className={`arrow-icon ${acrossExpanded ? 'expanded' : ''}`}
          />
        </div>
        {acrossExpanded && !showPuzzle && (
          <div>
            {acrossWords.map(renderWordItem)}
          </div>
        )}
      </div>

      <div className='word-list-section'>
        <div onClick={() => toggleSection('down')} className='word-list-header'>
          <span>Down</span>
          <img 
            src={downExpanded ? Arrow : ArrowDisabled}
            alt={downExpanded ? 'Expanded arrow' : 'Collapsed arrow'}
            className={`arrow-icon ${downExpanded ? 'expanded' : ''}`}
          />
        </div>
        {downExpanded && !showPuzzle && (
          <div>
            {downWords.map(renderWordItem)}
          </div>
        )}
      </div>
    </div>
  )
}
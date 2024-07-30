import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [randomList, setRandomList] = useState([])
  const [grid, setGrid] = useState([])
  const [crosswordData, setCrosswordData] = useState(null);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [numbers, setNumbers] = useState([])
  const [words, setWords] = useState([]);
  const [showList, setShowList] = useState(false);
  const [clues, setClues] = useState({ across: [], down: [] });
  const [showCrossword, setShowCrossword] = useState(false);
  const [crosswordGrid, setCrosswordGrid] = useState([]);
  const [showCrosswordSolution, setShowCrosswordSolution] = useState(false);
  const [cluesSolution, setCluesSolution] = useState({ across: [], down: [] });
  const [solutionLoaded, setSolutionLoaded] = useState(false);
  const [correctLetters, setCorrectLetters] = useState(new Set())
  const [correctWords, setCorrectWords] = useState(new Set())
  const [checkMode, setCheckMode] = useState(false)
  const [listLoaded, setListLoaded] = useState(false)
  const [editedWords, setEditedWords] = useState([])
  const [showWordBank, setShowWordBank] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [showDisplay, setShowDisplay] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [crosswordDataLoaded, setCrosswordDataLoaded] = useState(false);
  const [showPuzzle, setShowPuzzle] = useState(false);
  const [selectedWordId, setSelectedWordId] = useState(null)

  const togglePuzzleView = (view) => {
    setShowPuzzle(view === 'puzzle')
  }

  return (
    <AppContext.Provider value={{ list, setList, randomList, setRandomList, grid, setGrid, crosswordData, setCrosswordData, error, setError, numbers, setNumbers, words, setWords, showList, setShowList, clues, setClues, showCrossword, setShowCrossword, crosswordGrid, setCrosswordGrid, showCrosswordSolution, setShowCrosswordSolution, cluesSolution, setCluesSolution, solutionLoaded, setSolutionLoaded, correctLetters, setCorrectLetters, correctWords, setCorrectWords, checkMode, setCheckMode, listLoaded, setListLoaded, editedWords, setEditedWords, isLoading, setIsLoading, showWordBank, setShowWordBank, showSolution, setShowSolution, showDisplay, setShowDisplay, showLegend, setShowLegend, crosswordDataLoaded, setCrosswordDataLoaded, showPuzzle, setShowPuzzle, togglePuzzleView, selectedWordId, setSelectedWordId  }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
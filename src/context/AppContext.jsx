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
 

  return (
    <AppContext.Provider value={{ list, setList, randomList, setRandomList, grid, setGrid, crosswordData, setCrosswordData, error, setError, numbers, setNumbers, words, setWords, showList, setShowList, clues, setClues, showCrossword, setShowCrossword, crosswordGrid, setCrosswordGrid, showCrosswordSolution, setShowCrosswordSolution, cluesSolution, setCluesSolution, solutionLoaded, setSolutionLoaded }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [randomList, setRandomList] = useState([])
  const [grid, setGrid] = useState([])
  const [crosswordData, setCrosswordData] = useState(null);
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  return (
    <AppContext.Provider value={{ list, setList, randomList, setRandomList, grid, setGrid, crosswordData, setCrosswordData, error, setError }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
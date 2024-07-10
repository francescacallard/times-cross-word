import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext()

export const AppProvider = ({ children }) => {
  const [list, setList] = useState([])
  const [randomList, setRandomList] = useState([])

  return (
    <AppContext.Provider value={{ list, setList, randomList, setRandomList }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)
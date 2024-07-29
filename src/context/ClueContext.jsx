import React, { createContext, useContext, useState } from 'react';

const ClueContext = createContext();

export const ClueProvider = ({ children }) => { 
  const [selectedClue, setSelectedClue] = useState(null);
  const [selectedWord, setSelectedWord] = useState(null);


  return (
    <ClueContext.Provider value={{ selectedClue, setSelectedClue, selectedWord, setSelectedWord }}>
      {children}
    </ClueContext.Provider>
  )
}

export const useClue = () => useContext(ClueContext)
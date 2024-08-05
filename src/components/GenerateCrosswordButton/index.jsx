import React from 'react'
import { useApp } from 'context/AppContext'
import './styles.css'
import Sparkle from '../../assets/whiteSparkle.svg'
import { Spinner } from 'components/Spinner'
import axios from 'axios'
export const GenerateCrosswordButton = () => {
  const {
    setCrosswordData,
    isLoading,
    setIsLoading,
    error,
    setError,
    crosswordData,
    setCrosswordDataLoaded,
    gridSaved,
    blackCells
  } = useApp(); 



  const updateCrosswordData = (data) => {
    setCrosswordData(data);
    setCrosswordDataLoaded(true);
  };

  const sendBlackCells = async () => {
    const savedData = JSON.parse(localStorage.getItem('gridState'));
    if (savedData && savedData.blackCells) {
      try {
        await axios.post('http://localhost:5000/generate-grid', {
          blackCells: savedData.blackCells
        });
        console.log('Black cells sent to backend successfully');
      } catch (error) {
        console.error('Error sending black cells to backend:', error);
        throw error;
      }
    }
  };

  const generateCrossword = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await sendBlackCells();
      const response = await fetch('http://localhost:5000/generate-crossword');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setCrosswordData(data);
      updateCrosswordData(data);
      console.log('data from generated button:', data);
    } catch (error) {
      console.error('Error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (error) return <div>Error: {error}</div>;
  return (
    <div className='generate-crossword-button-container'>  
      <button className='generate-crossword-button' onClick={generateCrossword} disabled={isLoading}>
        {isLoading ? (
          <Spinner />
        ) : (
          <img src={Sparkle} alt='sparkle' className='sparkle'/>
        )}
        {isLoading ? 'Generating' : 'Generate New'}
      </button>
    </div>
  )
}


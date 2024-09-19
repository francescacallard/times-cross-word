import React from 'react'
import { useApp } from 'context/AppContext'
import './styles.css'
import Sparkle from '../../assets/whiteSparkle.svg'
import { Spinner } from 'components/Spinner'
export const GenerateCrosswordButton = () => {
  const {
    setCrosswordData,
    isLoading,
    setIsLoading,
    error,
    setError,
    crosswordData,
    setCrosswordDataLoaded
  } = useApp(); 



  const updateCrosswordData = (data) => {
    setCrosswordData(data);
    setCrosswordDataLoaded(true);
  };

  const generateCrossword = () => {
    setIsLoading(true);
    setError(null);
    fetch('http://localhost:5000/generate-crossword')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setCrosswordData(data);
        updateCrosswordData(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
        setIsLoading(false);
      });
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


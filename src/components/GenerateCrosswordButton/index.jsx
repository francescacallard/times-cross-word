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
    setCrosswordDataLoaded,
    puzzleData,
    setPuzzleData,
  } = useApp(); 



  const updateCrosswordData = (data) => {
    if (data && typeof data === 'object') {
      setCrosswordData(data);
      setPuzzleData(data);
      setCrosswordDataLoaded(true);
    } else {
      console.error('Invalid data structure received:', data);
      setError('Invalid data structure received');
    }
  };

  const generateCrossword = () => {
    console.log('generate crossword button clicked');
    setIsLoading(true);
    setError(null);
    fetch('http://localhost:3000/generate-crossword')
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Network response was not ok: ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        console.log('Received data:', JSON.stringify(data, null, 2));
        if (data && Object.keys(data).length > 0) {
          setCrosswordData(data);
          setPuzzleData(data);
          updateCrosswordData(data);
          setIsLoading(false);
          console.log('data from generated button:', data);
        } else {
          throw new Error('Invalid or empty puzzle data');
        }
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


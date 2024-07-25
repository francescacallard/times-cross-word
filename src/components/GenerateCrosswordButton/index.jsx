import React from 'react'
import { useApp } from 'context/AppContext'
import './styles.css'
import Sparkle from '../../assets/sparkleSmall.svg'
export const GenerateCrosswordButton = () => {
  const {
    setCrosswordData,
    isLoading,
    setIsLoading,
    error,
    setError,
  } = useApp(); 

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
        setIsLoading(false);
        console.log('data from generated button:', data);
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
      <img src={Sparkle} alt='sparkle' className='sparkle'/>
      {isLoading ? 'Generating...' : 'Generate New'}
      </button>
      {/* <button className='toggle-crossword-button'>Edit Mode</button> */}
    </div>
  )
}

